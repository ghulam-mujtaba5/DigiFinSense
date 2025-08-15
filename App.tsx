import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Asset, Transaction, Budget } from './src/navigation/types';
import { fetchAssets, fetchBudgets, fetchTransactions } from './src/services/supabaseData';
import { supabase } from './source/config/supabase';
import { ThemeProvider } from './source/theme/ThemeProvider';

// Dummy data using the centralized types
const DUMMY_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', ticker: 'BTC', amount: 0.5, value: 45000, change: 2.5, icon: 'https://img.icons8.com/fluency/48/bitcoin.png' },
  { id: '2', name: 'Ethereum', ticker: 'ETH', amount: 10, value: 3000, change: -1.2, icon: 'https://img.icons8.com/fluency/48/ethereum.png' },
  { id: '3', name: 'Tesla', ticker: 'TSLA', amount: 15, value: 300, change: 5.1, icon: 'https://img.icons8.com/fluency/48/tesla.png' },
];

const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salary', amount: 5000, date: '2024-07-01', type: 'income', category: 'Income' },
  { id: '2', description: 'Rent', amount: 1500, date: '2024-07-02', type: 'expense', category: 'Housing' },
  { id: '3', description: 'Groceries', amount: 250, date: '2024-07-03', type: 'expense', category: 'Food' },
];

const DUMMY_BUDGETS: Budget[] = [
  { id: '1', category: 'Food', limit: 500, spent: 250 },
  { id: '2', category: 'Shopping', limit: 300, spent: 350 },
];

const App = () => {
  const [assets, setAssets] = useState<Asset[]>(DUMMY_ASSETS);
  const [transactions, setTransactions] = useState<Transaction[]>(DUMMY_TRANSACTIONS);
  const [budgets, setBudgets] = useState<Budget[]>(DUMMY_BUDGETS);
  const [loadedFromDB, setLoadedFromDB] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Load auth session (if any) to bind user_id on inserts
    const loadSession = async () => {
      try {
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          setUserId(data.session?.user?.id ?? null);
        }
      } catch {
        setUserId(null);
      }
    };

    const load = async () => {
      try {
        const [a, t, b] = await Promise.all([
          fetchAssets(),
          fetchTransactions(),
          fetchBudgets(),
        ]);
        if (a.length) setAssets(a);
        if (t.length) setTransactions(t);
        if (b.length) setBudgets(b);
      } catch (e) {
        // keep dummy data on error
      } finally {
        setLoadedFromDB(true);
      }
    };
    loadSession();
    load();
  }, []);

  // Realtime subscriptions (assets, transactions, budgets)
  useEffect(() => {
    if (!supabase) return;

    const mapAsset = (row: any): Asset => ({
      id: row.id,
      name: row.name,
      ticker: row.ticker ?? '',
      amount: Number(row.amount ?? 0),
      value: Number(row.value ?? 0),
      change: Number(row.change ?? 0),
      icon: row.icon ?? '',
    });

    const assetsChannel = supabase
      .channel('realtime-assets')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'assets' },
        (payload: any) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setAssets(prev => {
              if (prev.find(a => a.id === payload.new.id)) return prev;
              return [...prev, mapAsset(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setAssets(prev => prev.map(a => (a.id === payload.new.id ? mapAsset(payload.new) : a)));
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setAssets(prev => prev.filter(a => a.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    const mapTx = (row: any): Transaction => ({
      id: row.id,
      description: row.description,
      amount: Number(row.amount ?? 0),
      date: String(row.date),
      type: row.type,
      category: row.category ?? '',
    });

    const txChannel = supabase
      .channel('realtime-transactions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload: any) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setTransactions(prev => {
              if (prev.find(t => t.id === payload.new.id)) return prev;
              return [...prev, mapTx(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setTransactions(prev => prev.map(t => (t.id === payload.new.id ? mapTx(payload.new) : t)));
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setTransactions(prev => prev.filter(t => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    const mapBudget = (row: any): Budget => ({
      id: row.id,
      category: row.category,
      limit: Number(row.limit_amount ?? 0),
      spent: Number(row.spent ?? 0),
    });

    const budgetsChannel = supabase
      .channel('realtime-budgets')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'budgets' },
        (payload: any) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setBudgets(prev => {
              if (prev.find(b => b.id === payload.new.id)) return prev;
              return [...prev, mapBudget(payload.new)];
            });
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setBudgets(prev => prev.map(b => (b.id === payload.new.id ? mapBudget(payload.new) : b)));
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setBudgets(prev => prev.filter(b => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      try { supabase?.removeChannel(assetsChannel); } catch {}
      try { supabase?.removeChannel(txChannel); } catch {}
      try { supabase?.removeChannel(budgetsChannel); } catch {}
    };
  }, []);

  const addAsset = async (asset: Omit<Asset, 'id'>) => {
    // Try DB insert first if configured
    if (supabase) {
      const { data, error } = await supabase
        .from('assets')
        .insert({
          user_id: userId,
          name: asset.name,
          ticker: asset.ticker,
          amount: asset.amount,
          value: asset.value,
          change: asset.change,
          icon: asset.icon,
        })
        .select('id, name, ticker, amount, value, change, icon')
        .single();
      if (!error && data) {
        setAssets(prev => [...prev, {
          id: data.id,
          name: data.name,
          ticker: data.ticker ?? '',
          amount: Number(data.amount ?? 0),
          value: Number(data.value ?? 0),
          change: Number(data.change ?? 0),
          icon: data.icon ?? '',
        }]);
        return;
      }
    }
    // Fallback local
    setAssets(prev => [...prev, { ...asset, id: Math.random().toString() }]);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    let newId: string | undefined;
    if (supabase) {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          type: transaction.type,
          category: transaction.category,
        })
        .select('id')
        .single();
      if (!error && data) newId = data.id as string;
    }
    const tx = { ...transaction, id: newId ?? Math.random().toString() };
    setTransactions(prev => [...prev, tx]);

    if (tx.type === 'expense' && tx.category) {
      setBudgets(prevBudgets =>
        prevBudgets.map(budget =>
          budget.category === tx.category
            ? { ...budget, spent: budget.spent + tx.amount }
            : budget
        )
      );
      // Optional: persist spent update later via aggregate
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'spent'>) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('budgets')
        .insert({
          user_id: userId,
          category: budget.category,
          limit_amount: budget.limit,
          spent: 0,
        })
        .select('id, category, limit_amount, spent')
        .single();
      if (!error && data) {
        setBudgets(prev => [...prev, {
          id: data.id,
          category: data.category,
          limit: Number(data.limit_amount ?? 0),
          spent: Number(data.spent ?? 0),
        }]);
        return;
      }
    }
    setBudgets(prev => [...prev, { ...budget, id: Math.random().toString(), spent: 0 }]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigator
            assets={assets}
            addAsset={addAsset}
            transactions={transactions}
            addTransaction={addTransaction}
            budgets={budgets}
            addBudget={addBudget}
          />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
