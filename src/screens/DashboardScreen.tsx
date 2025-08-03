import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { DashboardScreenProps } from '../navigation/types';

// Define the type for a single asset
type Asset = {
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

const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  const totalBalance = DUMMY_ASSETS.reduce((sum, asset) => sum + asset.value, 0);

  const renderAsset = ({ item }: { item: Asset }) => (
    <View style={styles.assetRow}>
      <View style={styles.assetIcon}>
        <Text style={styles.assetIconText}>{item.icon}</Text>
      </View>
      <View style={styles.assetInfo}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text style={styles.assetTicker}>{item.ticker}</Text>
      </View>
      <View style={styles.assetValue}>
        <Text style={styles.assetPrice}>${item.value.toFixed(2)}</Text>
        <Text style={[styles.assetChange, { color: item.change >= 0 ? '#4caf50' : '#f44336' }]}>
          {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>

      <Text style={styles.listHeader}>Your Assets</Text>
      
      <FlatList
        data={DUMMY_ASSETS}
        renderItem={renderAsset}
        keyExtractor={item => item.id}
        style={styles.assetList}
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    paddingTop: StatusBar.currentHeight || 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#aaa',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  assetList: {
    paddingHorizontal: 20,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  assetIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetTicker: {
    color: '#aaa',
    fontSize: 14,
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetChange: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#007bff',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default DashboardScreen;
