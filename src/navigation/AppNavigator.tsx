import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Asset, Transaction } from './types';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddAssetScreen from '../screens/AddAssetScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  assets: Asset[];
  addAsset: (newAsset: Omit<Asset, 'id' | 'change' | 'icon' | 'value'> & { value: number }) => void;
  transactions: Transaction[];
  addTransaction: (newTransaction: Omit<Transaction, 'id' | 'date'>) => void;
};

const AppNavigator = ({ assets, addAsset, transactions, addTransaction }: AppNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard">
          {props => <DashboardScreen {...props} assets={assets} transactions={transactions} />}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
