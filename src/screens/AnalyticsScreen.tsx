import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AnalyticsScreenProps, Transaction } from '../navigation/types';

type Props = AnalyticsScreenProps & {
  transactions: Transaction[];
};

const AnalyticsScreen = ({ navigation, transactions }: Props) => {
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as { [key: string]: number });

  const chartData = Object.keys(spendingByCategory).map((category, index) => ({
    name: category,
    population: spendingByCategory[category],
    color: ['#ff4d4d', '#ffcc00', '#8a2be2', '#007bff', '#33cc33'][index % 5],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#1e1e1e',
    backgroundGradientTo: '#1e1e1e',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spending Analytics</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Spending by Category</Text>
        {chartData.length > 0 ? (
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 0]}
            absolute
          />
        ) : (
          <Text style={styles.noDataText}>No spending data available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight || 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  noDataText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AnalyticsScreen;
