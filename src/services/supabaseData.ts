import { supabase } from '../../source/config/supabase';
import type { Asset, Transaction, Budget } from '../navigation/types';

export async function fetchAssets(): Promise<Asset[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('assets')
    .select('id, name, ticker, amount, value, change, icon')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    ticker: row.ticker ?? '',
    amount: Number(row.amount ?? 0),
    value: Number(row.value ?? 0),
    change: Number(row.change ?? 0),
    icon: row.icon ?? '',
  }));
}

export async function fetchTransactions(): Promise<Transaction[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('transactions')
    .select('id, description, amount, date, type, category')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.id,
    description: row.description,
    amount: Number(row.amount ?? 0),
    date: String(row.date),
    type: row.type,
    category: row.category ?? '',
  }));
}

export async function fetchBudgets(): Promise<Budget[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('budgets')
    .select('id, category, limit_amount, spent, month')
    .order('month', { ascending: false });
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.id,
    category: row.category,
    limit: Number(row.limit_amount ?? 0),
    spent: Number(row.spent ?? 0),
  }));
}
