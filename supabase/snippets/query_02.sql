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