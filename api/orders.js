import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

export default async function handler(req, res) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return res.status(500).json({ error: 'Supabase service role key is not configured.' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('orders').select('*').order('id', { ascending: false });
      if (error) {
        throw error;
      }
      return res.status(200).json(data ?? []);
    }

    if (req.method === 'POST') {
      const order = req.body;
      const { data, error } = await supabase.from('orders').insert(order).select();
      if (error) {
        throw error;
      }
      return res.status(200).json(data?.[0] ?? null);
    }

    if (req.method === 'PATCH') {
      const orderId = req.query.id;
      if (!orderId) {
        return res.status(400).json({ error: 'Order id is required for updates.' });
      }
      const updates = req.body;
      const { data, error } = await supabase.from('orders').update(updates).eq('id', orderId).select();
      if (error) {
        throw error;
      }
      return res.status(200).json(data?.[0] ?? null);
    }

    if (req.method === 'DELETE') {
      if (req.query.id) {
        const { data, error } = await supabase.from('orders').delete().eq('id', req.query.id).select();
        if (error) {
          throw error;
        }
        return res.status(200).json(data ?? []);
      }

      const { data, error } = await supabase.from('orders').delete().neq('id', '').select();
      if (error) {
        throw error;
      }
      return res.status(200).json(data ?? []);
    }

    res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    return res.status(405).end();
  } catch (error) {
    console.error('Supabase order API error:', error);
    return res.status(500).json({ error: error.message || 'An unknown error occurred.' });
  }
}
