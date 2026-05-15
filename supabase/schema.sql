-- ============================================================
-- Manager Dashboard – Supabase Schema
-- Ejecutar completo en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- PROJECTS
create table if not exists public.projects (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  title         text   not null,
  description   text   not null default '',
  link          text   not null default '',
  status        text   not null default 'active'
                  check (status in ('active', 'paused', 'completed')),
  tags          integer[] not null default '{}',
  color         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  is_favorite   boolean not null default false,
  notes         text
);

-- SERVICES
create table if not exists public.services (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  name          text   not null,
  provider      text   not null,
  link          text   not null default '',
  description   text   not null default '',
  tags          integer[] not null default '{}',
  color         text,
  is_favorite   boolean not null default false
);

-- TAGS
create table if not exists public.tags (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  name          text   not null,
  color         text   not null,
  created_at    timestamptz not null default now()
);

-- RELATIONS (proyecto ↔ servicio)
create table if not exists public.relations (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  project_id    bigint references public.projects(id) on delete cascade not null,
  service_id    bigint references public.services(id) on delete cascade not null,
  created_at    timestamptz not null default now(),
  unique(project_id, service_id)
);

-- ACTIVITY LOGS
create table if not exists public.activity_logs (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  type          text   not null check (type in ('project', 'service', 'tag', 'relation')),
  action        text   not null check (action in ('created', 'updated', 'deleted')),
  entity_id     bigint not null,
  entity_name   text   not null,
  timestamp     timestamptz not null default now()
);

-- NODE POSITIONS (FlowBoard)
create table if not exists public.node_positions (
  id            bigint generated always as identity primary key,
  user_id       uuid   references auth.users(id) on delete cascade not null,
  entity_type   text   not null check (entity_type in ('project', 'service')),
  entity_id     bigint not null,
  x             float  not null,
  y             float  not null,
  unique(user_id, entity_type, entity_id)
);

-- APP SETTINGS
create table if not exists public.app_settings (
  id                bigint generated always as identity primary key,
  user_id           uuid   references auth.users(id) on delete cascade not null unique,
  theme             text   not null default 'dark' check (theme in ('dark', 'light')),
  sidebar_collapsed boolean not null default false
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.projects       enable row level security;
alter table public.services       enable row level security;
alter table public.tags           enable row level security;
alter table public.relations      enable row level security;
alter table public.activity_logs  enable row level security;
alter table public.node_positions enable row level security;
alter table public.app_settings   enable row level security;

-- Cada tabla: solo el dueño puede ver y modificar sus datos
create policy "owner_projects"       on public.projects       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_services"       on public.services       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_tags"           on public.tags           for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_relations"      on public.relations      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_activity_logs"  on public.activity_logs  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_node_positions" on public.node_positions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "owner_app_settings"   on public.app_settings   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
