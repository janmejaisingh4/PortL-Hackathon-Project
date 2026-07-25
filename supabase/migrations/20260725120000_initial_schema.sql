create extension if not exists "uuid-ossp";

create table if not exists public.societies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  code text not null unique,
  address text,
  city text,
  state text,
  postal_code text,
  timezone text default 'Asia/Kolkata',
  logo_url text,
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.towers (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  floors integer not null default 10 check (floors > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flats (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  tower_id uuid references public.towers(id) on delete set null,
  flat_number text not null,
  floor_number integer not null default 1,
  occupancy_status text not null default 'vacant' check (occupancy_status in ('vacant','occupied','reserved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(society_id, tower_id, flat_number)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  society_id uuid references public.societies(id) on delete set null,
  full_name text not null,
  phone text,
  avatar_url text,
  role text not null check (role in ('resident','guard','admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gates (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  location_description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.guard_assignments (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  guard_id uuid not null references public.profiles(id) on delete cascade,
  gate_id uuid not null references public.gates(id) on delete cascade,
  shift_start time not null default '08:00:00',
  shift_end time not null default '20:00:00',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resident_flats (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  resident_id uuid not null references public.profiles(id) on delete cascade,
  flat_id uuid not null references public.flats(id) on delete cascade,
  relationship_type text not null default 'owner' check (relationship_type in ('owner','tenant','family')),
  is_primary boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visitors (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  phone text,
  visitor_type text not null check (visitor_type in ('guest','delivery','cab','service_staff','other')),
  photograph_url text,
  vehicle_number text,
  organization text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visitor_requests (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  flat_id uuid not null references public.flats(id) on delete cascade,
  gate_id uuid not null references public.gates(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  requested_resident_id uuid not null references public.profiles(id) on delete cascade,
  purpose text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','expired','cancelled','entered','exited')),
  resident_response_note text,
  requested_at timestamptz not null default now(),
  responded_at timestamptz,
  valid_from timestamptz not null default now(),
  valid_until timestamptz not null,
  approval_code_hash text,
  max_entries integer not null default 1 check (max_entries > 0),
  current_entry_count integer not null default 0 check (current_entry_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visitor_entry_logs (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  visitor_request_id uuid not null references public.visitor_requests(id) on delete cascade,
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  flat_id uuid not null references public.flats(id) on delete cascade,
  gate_id uuid not null references public.gates(id) on delete cascade,
  marked_by_guard_id uuid not null references public.profiles(id) on delete cascade,
  entry_time timestamptz not null default now(),
  exit_time timestamptz,
  entry_photograph_url text,
  exit_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_categories (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaints (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.complaint_categories(id) on delete set null,
  title text not null,
  description text not null,
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  status text not null default 'open' check (status in ('open','assigned','in_progress','resolved','closed','reopened')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.complaint_updates (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  complaint_id uuid not null references public.complaints(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  is_internal boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.amenities (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null default 0 check (price >= 0),
  capacity integer not null default 10 check (capacity > 0),
  slot_duration_minutes integer not null default 60 check (slot_duration_minutes > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.amenity_bookings (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  amenity_id uuid not null references public.amenities(id) on delete cascade,
  booked_by uuid not null references public.profiles(id) on delete cascade,
  booking_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'confirmed' check (status in ('confirmed','cancelled','pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  category text not null default 'general',
  audience text not null default 'all',
  is_pinned boolean not null default false,
  is_published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notice_reads (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  notice_id uuid not null references public.notices(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(notice_id, user_id)
);

create table if not exists public.polls (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  is_anonymous boolean not null default false,
  results_visible_after timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.poll_options (
  id uuid primary key default uuid_generate_v4(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  label text not null,
  created_at timestamptz not null default now(),
  unique(poll_id, label)
);

create table if not exists public.poll_votes (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(poll_id, user_id)
);

create table if not exists public.staff_members (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  role text not null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_providers (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  name text not null,
  service_type text not null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_devices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  expo_push_token text not null,
  device_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, expo_push_token)
);

create table if not exists public.in_app_notifications (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  notification_type text not null,
  entity_id uuid,
  route text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  society_id uuid not null references public.societies(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_towers_society_id on public.towers(society_id);
create index if not exists idx_flats_society_id on public.flats(society_id);
create index if not exists idx_flats_tower_id on public.flats(tower_id);
create index if not exists idx_resident_flats_resident_id on public.resident_flats(resident_id);
create index if not exists idx_resident_flats_flat_id on public.resident_flats(flat_id);
create index if not exists idx_visitor_requests_status on public.visitor_requests(status);
create index if not exists idx_visitor_requests_requested_at on public.visitor_requests(requested_at);
create index if not exists idx_visitor_entry_logs_exit_time on public.visitor_entry_logs(exit_time);
create index if not exists idx_complaints_status on public.complaints(status);
create index if not exists idx_amenity_bookings_booking_date on public.amenity_bookings(booking_date);
create index if not exists idx_notices_published_at on public.notices(published_at);
create index if not exists idx_polls_ends_at on public.polls(ends_at);
