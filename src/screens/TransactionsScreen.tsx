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
import { TransactionsScreenProps, Transaction } from '../navigation/types';

type Props = TransactionsScreenProps & {
  transactions: Transaction[];
};

const TransactionsScreen = ({ navigation, transactions }: Props) => {
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionRow}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.type === 'income' ? styles.income : styles.expense,
        ]}
      >
        {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.transactionList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
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
  transactionList: {
    flex: 1,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    color: '#fff',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#4caf50',
  },
  expense: {
    color: '#f44336',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
  },
});

export default TransactionsScreen;
