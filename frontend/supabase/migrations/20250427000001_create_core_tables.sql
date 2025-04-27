-- Create hubs table
create table public.hubs (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id) on delete cascade not null,
    updated_at timestamp with time zone,
    is_private boolean default false
);

-- Create notes table
create table public.notes (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    updated_at timestamp with time zone,
    tags text[],
    hub_id uuid references public.hubs(id) on delete set null
);

-- Create projects table
create table public.projects (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    status text check (status in ('planning', 'in-progress', 'completed')) default 'planning',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    updated_at timestamp with time zone,
    tags text[],
    hub_id uuid references public.hubs(id) on delete set null
);

-- Create resources table
create table public.resources (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    url text,
    description text,
    type text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    updated_at timestamp with time zone,
    tags text[],
    hub_id uuid references public.hubs(id) on delete set null
);

-- Create hub_members table for managing hub memberships
create table public.hub_members (
    hub_id uuid references public.hubs(id) on delete cascade,
    user_id uuid references auth.users(id) on delete cascade,
    role text check (role in ('owner', 'admin', 'member')) default 'member',
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (hub_id, user_id)
);

-- Set up Row Level Security (RLS)
alter table public.hubs enable row level security;
alter table public.notes enable row level security;
alter table public.projects enable row level security;
alter table public.resources enable row level security;
alter table public.hub_members enable row level security;

-- Hubs policies
create policy "Hubs are viewable by members or if not private"
    on public.hubs for select using (
        not is_private 
        or exists (
            select 1 from public.hub_members 
            where hub_id = id and user_id = auth.uid()
        )
    );

create policy "Users can create hubs"
    on public.hubs for insert with check (auth.uid() = created_by);

create policy "Only hub owners/admins can update"
    on public.hubs for update using (
        exists (
            select 1 from public.hub_members
            where hub_id = id 
            and user_id = auth.uid() 
            and role in ('owner', 'admin')
        )
    );

-- Notes policies
create policy "Notes are viewable by owner or hub members"
    on public.notes for select using (
        user_id = auth.uid()
        or (
            hub_id is not null 
            and exists (
                select 1 from public.hub_members 
                where hub_id = notes.hub_id 
                and user_id = auth.uid()
            )
        )
    );

create policy "Users can create notes"
    on public.notes for insert with check (auth.uid() = user_id);

create policy "Users can update their own notes"
    on public.notes for update using (auth.uid() = user_id);

create policy "Users can delete their own notes"
    on public.notes for delete using (auth.uid() = user_id);

-- Projects policies
create policy "Projects are viewable by owner or hub members"
    on public.projects for select using (
        user_id = auth.uid()
        or (
            hub_id is not null 
            and exists (
                select 1 from public.hub_members 
                where hub_id = projects.hub_id 
                and user_id = auth.uid()
            )
        )
    );

create policy "Users can create projects"
    on public.projects for insert with check (auth.uid() = user_id);

create policy "Users can update their own projects"
    on public.projects for update using (auth.uid() = user_id);

create policy "Users can delete their own projects"
    on public.projects for delete using (auth.uid() = user_id);

-- Resources policies
create policy "Resources are viewable by owner or hub members"
    on public.resources for select using (
        user_id = auth.uid()
        or (
            hub_id is not null 
            and exists (
                select 1 from public.hub_members 
                where hub_id = resources.hub_id 
                and user_id = auth.uid()
            )
        )
    );

create policy "Users can create resources"
    on public.resources for insert with check (auth.uid() = user_id);

create policy "Users can update their own resources"
    on public.resources for update using (auth.uid() = user_id);

create policy "Users can delete their own resources"
    on public.resources for delete using (auth.uid() = user_id);

-- Hub members policies
create policy "Hub memberships are viewable by hub members"
    on public.hub_members for select using (
        exists (
            select 1 from public.hub_members as hm
            where hm.hub_id = hub_members.hub_id
            and hm.user_id = auth.uid()
        )
    );

create policy "Only hub owners/admins can manage members"
    on public.hub_members for all using (
        exists (
            select 1 from public.hub_members
            where hub_id = hub_members.hub_id
            and user_id = auth.uid()
            and role in ('owner', 'admin')
        )
    );

-- Create updated_at triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger on_hub_updated
    before update on public.hubs
    for each row execute procedure public.handle_updated_at();

create trigger on_note_updated
    before update on public.notes
    for each row execute procedure public.handle_updated_at();

create trigger on_project_updated
    before update on public.projects
    for each row execute procedure public.handle_updated_at();

create trigger on_resource_updated
    before update on public.resources
    for each row execute procedure public.handle_updated_at();