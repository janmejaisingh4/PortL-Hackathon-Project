import { supabase } from '../../lib/supabase';

export interface VisitorRequestPayload {
  visitorId: string;
  flatId: string;
  gateId: string;
  requestedResidentId: string;
  purpose: string;
  validUntil: string;
  maxEntries?: number;
}

export interface VisitorResponseResult {
  success: boolean;
  status?: string;
}

export async function createVisitorRequest(payload: VisitorRequestPayload) {
  const { data, error } = await supabase.from('visitor_requests').insert({
    visitor_id: payload.visitorId,
    flat_id: payload.flatId,
    gate_id: payload.gateId,
    requested_resident_id: payload.requestedResidentId,
    purpose: payload.purpose,
    valid_until: payload.validUntil,
    max_entries: payload.maxEntries ?? 1,
  }).select().single();

  if (error) throw error;
  return data;
}

export async function respondToVisitorRequest(requestId: string, status: 'approved' | 'rejected', note?: string) {
  const { data, error } = await supabase.rpc('respond_to_visitor_request', {
    p_request_id: requestId,
    p_status: status,
    p_note: note ?? null,
  });

  if (error) throw error;
  return data as VisitorResponseResult;
}

export async function markVisitorEntry(requestId: string) {
  const { data, error } = await supabase.from('visitor_entry_logs').insert({
    visitor_request_id: requestId,
  }).select().single();

  if (error) throw error;
  return data;
}
