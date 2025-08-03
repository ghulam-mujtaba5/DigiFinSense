import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Asset, DashboardScreenProps, Transaction } from '../navigation/types';

type Props = DashboardScreenProps & {
  assets: Asset[];
  transactions: Transaction[];
};

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
      ],
    },
  ],
};

const chartConfig = {
  backgroundColor: '#1e1e1e',
  backgroundGradientFrom: '#1e1e1e',
  backgroundGradientTo: '#1e1e1e',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
  },
};

const DashboardScreen = ({ navigation, assets, transactions, budgets }: Props) => {
  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const cashBalance = transactions.reduce((balance, transaction) => {
    return transaction.type === 'income' ? balance + transaction.amount : balance - transaction.amount;
  }, 0);
  const netWorth = totalAssetValue + cashBalance;

  const pieChartData = assets.map((asset, index) => ({
    name: asset.ticker,
    population: asset.value,
    color: ['#007bff', '#ff4d4d', '#33cc33', '#ffcc00', '#8a2be2'][index % 5],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

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

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.headerButtonText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
            <Text style={styles.headerButtonText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Net Worth</Text>
          <Text style={styles.balanceAmount}>${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Portfolio Performance</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <Text style={styles.listHeader}>Your Assets</Text>
        
        <FlatList
          data={assets}
          renderItem={renderAsset}
          keyExtractor={item => item.id}
          style={styles.assetList}
          scrollEnabled={false} // Disable scrolling on the FlatList
        />

        <Text style={styles.sectionTitle}>Budgets</Text>
        {budgets.map(budget => (
          <View key={budget.id} style={styles.budgetItem}>
            <View style={styles.budgetInfo}>
              <Text style={styles.budgetCategory}>{budget.category}</Text>
              <Text style={styles.budgetLimit}>${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }]} />
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions.slice(0, 5)} // Show latest 5 transactions
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={[styles.transactionAmount, { color: item.type === 'income' ? '#4CAF50' : '#FF6347' }]}>
                {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
              </Text>
            </View>
          )}
        />

        <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Asset Allocation</Text>
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 0]}
            absolute
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddAsset')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 80, // Ensure there's space for the FAB
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
    fontSize: 24,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  budgetItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  budgetCategory: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  budgetLimit: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200EE',
    borderRadius: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
