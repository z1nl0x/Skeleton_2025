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
