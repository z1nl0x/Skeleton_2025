-- Tabela auxiliar de palavras-chave
create table if not exists public.keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Extensão pgcrypto (para gen_random_uuid)
create extension if not exists "pgcrypto";

-- Tabela que associa usuário e palavra-chave
create table if not exists public.user_keywords (
  user_id uuid not null references auth.users(id) on delete cascade,
  keyword_id uuid not null references public.keywords(id) on delete restrict,
  created_at timestamptz not null default now(),
  primary key (user_id, keyword_id)
);

-- RLS: habilitar políticas
alter table public.keywords enable row level security;
alter table public.user_keywords enable row level security;

-- Política: todos podem selecionar keywords ativas (para validação no registro)
create policy "read_active_keywords"
on public.keywords
for select
to authenticated, anon
using (is_active = true);

-- Política: usuário só pode inserir sua própria associação
create policy "user_insert_own_assoc"
on public.user_keywords
for insert
to authenticated
with check (user_id = auth.uid());

-- Política: usuário só pode ver suas associações
create policy "user_select_own_assoc"
on public.user_keywords
for select
to authenticated
using (user_id = auth.uid());

-- Admins podem ver todos os perfis
create policy "admin_can_view_all"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);



create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Usuário só pode ver/editar seu perfil
create policy "select_own_profile" on public.profiles for select
to authenticated using (id = auth.uid());

create policy "insert_own_profile" on public.profiles for insert
to authenticated with check (id = auth.uid());

create policy "update_own_profile" on public.profiles for update
to authenticated using (id = auth.uid());







alter table public.profiles
add column role text not null default 'user';

alter table public.profiles
add constraint role_check
check (role in ('admin','manager','user'));

-- Só admins podem ver todos os perfis
create policy "admins can view all profiles"
on public.profiles
for select
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Users só podem ver o próprio perfil
create policy "users can view own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid() and role = 'user');

create policy "select_own_profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());