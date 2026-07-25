insert into public.societies (id, name, code, address, city, state, postal_code, timezone, status)
values ('11111111-1111-1111-1111-111111111111', 'GreenView Residency', 'GRV001', '12, Sector 15', 'Kanpur', 'Uttar Pradesh', '208001', 'Asia/Kolkata', 'active')
on conflict (id) do nothing;

insert into public.towers (id, society_id, name, floors)
values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Tower A', 10),
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Tower B', 8)
on conflict (id) do nothing;

insert into public.flats (id, society_id, tower_id, flat_number, floor_number, occupancy_status)
values
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'A-502', 5, 'occupied'),
  ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'B-101', 1, 'occupied')
on conflict (id) do nothing;

insert into public.gates (id, society_id, name, location_description, is_active)
values ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Main Gate', 'Primary gate near the security lobby', true)
on conflict (id) do nothing;
