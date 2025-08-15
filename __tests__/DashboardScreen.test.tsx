import React from 'react';
import renderer from 'react-test-renderer';

// Mock ThemeProvider hook to return minimal tokens
jest.mock('../source/theme/ThemeProvider', () => {
  const tokens = {
    colors: {
      primary: '#007BFF',
      secondary: '#6200EE',
      success: '#4CAF50',
      danger: '#FF5252',
      warning: '#FFC107',
      surface: '#121212',
      card: '#1E1E1E',
      border: '#333333',
      textPrimary: '#FFFFFF',
      textSecondary: '#A9A9A9',
      fab: '#007BFF',
    },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
    typography: { sm: 12, md: 16, lg: 20, xl: 24, xxl: 32 },
    radius: { sm: 6, md: 8, lg: 12 },
    elevation: { card: 2, fab: 6 },
  };
  return {
    useTheme: () => ({ tokens }),
  };
});

// Mock UI kit components with plain Views/Text to avoid native deps in test env
jest.mock('../source/components/ui', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    Card: ({ children }: any) => <View accessibilityLabel="Card">{children}</View>,
    ListItem: ({ title, subtitle, right }: any) => (
      <View accessibilityLabel="ListItem">
        <Text>{title}</Text>
        {!!subtitle && <Text>{subtitle}</Text>}
        {!!right && right}
      </View>
    ),
    EmptyState: ({ title, subtitle }: any) => (
      <View accessibilityLabel="EmptyState">
        <Text>{title}</Text>
        {!!subtitle && <Text>{subtitle}</Text>}
      </View>
    ),
    Skeleton: ({ height = 20, width = 100 }: any) => (
      <View style={{ height, width }} accessibilityLabel="Skeleton" />
    ),
    ErrorBanner: ({ message }: any) => (
      <View accessibilityLabel="ErrorBanner"><Text>{message}</Text></View>
    ),
  };
});

// Mock charts to simple Views
jest.mock('react-native-chart-kit', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LineChart: (props: any) => <View accessibilityLabel="LineChart" {...props} />,
    PieChart: (props: any) => <View accessibilityLabel="PieChart" {...props} />,
  };
});

// Mock NetInfo optional hook by forcing online state
jest.mock('../src/hooks/useConnectivity', () => ({
  useConnectivity: () => ({ isConnected: true }),
}));

import DashboardScreen from '../src/screens/DashboardScreen';
import { Asset, Transaction } from '../src/navigation/types';

const assets: Asset[] = [
  { id: 'a1', name: 'Apple Inc.', ticker: 'AAPL', value: 12000, change: 1.2 },
  { id: 'a2', name: 'Bitcoin', ticker: 'BTC', value: 8000, change: -0.5 },
];

const transactions: Transaction[] = [
  { id: 't1', description: 'Salary', amount: 1000, date: '2025-08-01', type: 'income' },
  { id: 't2', description: 'Groceries', amount: 120.55, date: '2025-08-02', type: 'expense' },
];

const budgets = [
  { id: 'b1', category: 'Food', limit: 300, spent: 120 },
  { id: 'b2', category: 'Transport', limit: 150, spent: 80 },
];

describe('DashboardScreen', () => {
  it('renders without crashing and matches snapshot', () => {
    const tree = renderer.create(
      <DashboardScreen
        // navigation props are not used on Dashboard-only mode
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...({ navigation: {} } as any)}
        assets={assets}
        transactions={transactions}
        budgets={budgets}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
