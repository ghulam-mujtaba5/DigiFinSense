import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Asset, Transaction, Budget } from './types';

// Import Screens
import DashboardScreen from '../screens/DashboardScreen';

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
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard">
          {props => (
            <DashboardScreen
              {...props}
              assets={assets}
              transactions={transactions}
              budgets={budgets}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
