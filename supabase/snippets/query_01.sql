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
