import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Asset, Transaction, Budget } from './src/navigation/types';

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
