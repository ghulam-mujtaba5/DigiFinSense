import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Transaction, Budget } from './src/navigation/types';

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  value: number;
  change: number;
  icon: string;
};

// Dummy data for the asset list
const DUMMY_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', ticker: 'BTC', value: 6800.5, change: 2.5, icon: 'B' },
  { id: '2', name: 'Ethereum', ticker: 'ETH', value: 3400.2, change: -1.2, icon: 'E' },
  { id: '3', name: 'Apple Inc.', ticker: 'AAPL', value: 1250.75, change: 5.1, icon: 'A' },
  { id: '4', name: 'Tesla Inc.', ticker: 'TSLA', value: 850.0, change: 0.8, icon: 'T' },
];

const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salary', amount: 5000, date: '2023-07-01', type: 'income', category: 'Income' },

const App = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Bitcoin', ticker: 'BTC', amount: 0.5, value: 30000, change: 2.5, icon: 'https://img.icons8.com/fluency/48/bitcoin.png' },
    { id: '2', name: 'Ethereum', ticker: 'ETH', amount: 10, value: 20000, change: -1.2, icon: 'https://img.icons8.com/fluency/48/ethereum.png' },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salary', amount: 5000, date: '2024-07-01', type: 'income', category: 'Income' },
    { id: '2', description: 'Groceries', amount: 150, date: '2024-07-05', type: 'expense', category: 'Food' },
    { id: '3', description: 'Rent', amount: 1500, date: '2024-07-02', type: 'expense', category: 'Housing' },
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', limit: 500, spent: 150 },
    { id: '2', category: 'Shopping', limit: 300, spent: 350 },
  ]);

  const addAsset = (asset: Omit<Asset, 'id'>) => {
    setAssets(prevAssets => [
      ...prevAssets,
      { ...asset, id: Math.random().toString() },
    ]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prevTransactions => [
      ...prevTransactions,
      { ...transaction, id: Math.random().toString() },
    ]);

    if (transaction.type === 'expense' && transaction.category) {
      setBudgets(prevBudgets =>
        prevBudgets.map(budget =>
          budget.category === transaction.category
            ? { ...budget, spent: budget.spent + transaction.amount }
            : budget
        )
      );
    }
  };

  const addBudget = (budget: Omit<Budget, 'id' | 'spent'>) => {
    setBudgets(prevBudgets => [
      ...prevBudgets,
      { ...budget, id: Math.random().toString(), spent: 0 },
    ]);
  };

  return (
    <AppNavigator
      assets={assets}
      addAsset={addAsset}
      transactions={transactions}
      addTransaction={addTransaction}
      budgets={budgets}
      addBudget={addBudget}
    />
  );
};

export default App;
