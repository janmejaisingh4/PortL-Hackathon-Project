create or replace function public.respond_to_visitor_request(
  p_request_id uuid,
  p_status text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
as $$
declare
  current_user_id uuid;
  current_profile public.profiles%rowtype;
  request_row public.visitor_requests%rowtype;
begin
  select auth.uid() into current_user_id;
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = 'P0001';
  end if;

  select * into current_profile from public.profiles where id = current_user_id;
  if current_profile is null or current_profile.is_active is false then
    raise exception 'Inactive profile' using errcode = 'P0002';
  end if;

  select * into request_row from public.visitor_requests where id = p_request_id;
  if request_row.id is null then
    raise exception 'Request not found' using errcode = 'P0003';
  end if;

  if current_profile.role != 'resident' then
    raise exception 'Only residents can respond' using errcode = 'P0004';
  end if;

  if request_row.requested_resident_id != current_user_id then
    raise exception 'Not authorized for this request' using errcode = 'P0005';
  end if;

  if request_row.status != 'pending' then
    raise exception 'Request is no longer pending' using errcode = 'P0006';
  end if;

  if p_status not in ('approved','rejected') then
    raise exception 'Invalid response status' using errcode = 'P0007';
  end if;

  update public.visitor_requests
  set status = p_status,
      resident_response_note = coalesce(p_note, resident_response_note),
      responded_at = now(),
      updated_at = now()
  where id = p_request_id;

  insert into public.audit_logs(society_id, user_id, action, entity_type, entity_id, details)
  values (request_row.society_id, current_user_id, 'respond_visitor_request', 'visitor_requests', p_request_id, jsonb_build_object('status', p_status));

  return jsonb_build_object('success', true, 'status', p_status);
end;
$$;
