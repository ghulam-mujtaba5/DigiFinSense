import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Asset, Transaction, Budget } from './types';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddAssetScreen from '../screens/AddAssetScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import BudgetsScreen from '../screens/BudgetsScreen';
import AddBudgetScreen from '../screens/AddBudgetScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define a type for the navigator's props
type AppNavigatorProps = {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  budgets: Budget[];
  addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
};

const AppNavigator = ({ assets, addAsset, transactions, addTransaction, budgets, addBudget }: AppNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard">
          {props => <DashboardScreen {...props} assets={assets} transactions={transactions} budgets={budgets} />}
        </Stack.Screen>
        <Stack.Screen name="AddAsset">
          {props => <AddAssetScreen {...props} addAsset={addAsset} />}
        </Stack.Screen>
        <Stack.Screen name="Transactions">
          {props => <TransactionsScreen {...props} transactions={transactions} />}
        </Stack.Screen>
        <Stack.Screen name="AddTransaction">
          {props => <AddTransactionScreen {...props} addTransaction={addTransaction} />}
        </Stack.Screen>
        <Stack.Screen name="Analytics">
          {props => <AnalyticsScreen {...props} transactions={transactions} />}
        </Stack.Screen>
        <Stack.Screen name="Budgets">
          {props => <BudgetsScreen {...props} budgets={budgets} />}
        </Stack.Screen>
        <Stack.Screen name="AddBudget">
          {props => <AddBudgetScreen {...props} addBudget={addBudget} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
