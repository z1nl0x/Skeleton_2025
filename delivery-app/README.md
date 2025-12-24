# Vitamin 2.0 Clone App

## Features

- [Vite 6](https://vitejs.dev) with [React 19](https://reactjs.org), [TypeScript 5](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [Tailwind CSS v4](https://tailwindcss.com) for easy stylization.
- [Biome V2](https://next.biomejs.dev) for linting, formatting and automatic import sorting.
- Write unit and integration tests with [Vitest 3](https://vitest.dev/) and [Testing Library 16](https://testing-library.com/).
- Write e2e tests with [Playwright 1.52](https://www.cypress.io).

## Iniciando

Instalação de dependencias do projeto:

```
pnpm install
```

## Querys Supabase

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

## Query 02

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