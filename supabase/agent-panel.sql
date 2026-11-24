-- =====================================================================
-- Kushtrimi NM: private agent panel
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- It is safe to run more than once.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Who may use the panel (only accounts listed here)
-- ---------------------------------------------------------------------
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.site_admins enable row level security;

drop policy if exists "admin reads own row" on public.site_admins;
create policy "admin reads own row" on public.site_admins
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_site_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.site_admins where user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- 2. Offers of the moment (the ones posted on Instagram)
--    Visitors only see offers between starts_at and ends_at.
-- ---------------------------------------------------------------------
create table if not exists public.moment_offers (
  id          uuid primary key default gen_random_uuid(),
  title_sq    text not null,
  title_en    text not null default '',
  caption_sq  text not null default '',
  caption_en  text not null default '',
  photos      text[] not null default '{}',
  price_eur   int check (price_eur is null or price_eur >= 0),
  per_person  boolean not null default true,
  trip_from   date,
  trip_to     date,
  starts_at   timestamptz not null default now(),
  ends_at     timestamptz not null,
  created_at  timestamptz not null default now()
);
alter table public.moment_offers enable row level security;

drop policy if exists "public sees live offers" on public.moment_offers;
create policy "public sees live offers" on public.moment_offers
  for select to anon, authenticated
  using (starts_at <= now() and ends_at > now());

drop policy if exists "admin manages offers" on public.moment_offers;
create policy "admin manages offers" on public.moment_offers
  for all to authenticated
  using (public.is_site_admin()) with check (public.is_site_admin());

-- ---------------------------------------------------------------------
-- 3. Hotel content added from the panel (photos, texts, prices).
--    Hotels without a row here keep what the website already has.
-- ---------------------------------------------------------------------
create table if not exists public.hotel_content (
  slug            text primary key,
  description_sq  text not null default '',
  description_en  text not null default '',
  photos          text[] not null default '{}',
  pricing         jsonb,
  updated_at      timestamptz not null default now()
);
alter table public.hotel_content enable row level security;

drop policy if exists "public reads hotel content" on public.hotel_content;
create policy "public reads hotel content" on public.hotel_content
  for select to anon, authenticated using (true);

drop policy if exists "admin manages hotel content" on public.hotel_content;
create policy "admin manages hotel content" on public.hotel_content
  for all to authenticated
  using (public.is_site_admin()) with check (public.is_site_admin());

-- ---------------------------------------------------------------------
-- 4. Photo storage: everyone can view, only the admin can upload or delete
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-photos', 'site-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "admin uploads site photos" on storage.objects;
create policy "admin uploads site photos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-photos' and public.is_site_admin());

drop policy if exists "admin updates site photos" on storage.objects;
create policy "admin updates site photos" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-photos' and public.is_site_admin());

drop policy if exists "admin deletes site photos" on storage.objects;
create policy "admin deletes site photos" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-photos' and public.is_site_admin());

-- ---------------------------------------------------------------------
-- 5. Make YOUR account the admin.
--    First create the user in Authentication > Users > Add user,
--    then put that e-mail address below (keep the quotes) and run this file.
-- ---------------------------------------------------------------------
insert into public.site_admins (user_id)
select id from auth.users where email = 'PUT-YOUR-EMAIL-HERE'
on conflict do nothing;
