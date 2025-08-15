import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Core Data Types
export type Asset = {
  id: string;
  name: string;
  ticker: string;
  amount: number;
  value: number;
  change: number;
  icon: string;
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

// Navigation Stack
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  AddAsset: undefined;
  Transactions: undefined;
  AddTransaction: undefined;
  Analytics: undefined;
  Budgets: undefined;
  AddBudget: undefined;
  DebugSupabase: undefined;
};

// Screen-specific Prop Types
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & {
  assets: Asset[];
  transactions: Transaction[];
  budgets: Budget[];
};

export type AddAssetScreenProps = NativeStackScreenProps<RootStackParamList, 'AddAsset'> & {
  addAsset: (asset: Omit<Asset, 'id'>) => void;
};

export type TransactionsScreenProps = NativeStackScreenProps<RootStackParamList, 'Transactions'> & {
  transactions: Transaction[];
};

export type AddTransactionScreenProps = NativeStackScreenProps<RootStackParamList, 'AddTransaction'> & {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

export type AnalyticsScreenProps = NativeStackScreenProps<RootStackParamList, 'Analytics'> & {
  transactions: Transaction[];
};

export type BudgetsScreenProps = NativeStackScreenProps<RootStackParamList, 'Budgets'> & {
  budgets: Budget[];
};

export type AddBudgetScreenProps = NativeStackScreenProps<RootStackParamList, 'AddBudget'> & {
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
};

export type DebugSupabaseScreenProps = NativeStackScreenProps<RootStackParamList, 'DebugSupabase'>;
