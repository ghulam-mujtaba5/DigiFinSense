import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BudgetsScreenProps, Budget } from '../navigation/types';

const BudgetsScreen = ({ navigation, budgets }: BudgetsScreenProps) => {
  const renderBudget = ({ item }: { item: Budget }) => {
    const progress = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
    const isOverBudget = progress > 100;

    return (
      <View style={styles.budgetItem}>
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetCategory}>{item.category}</Text>
          <Text style={styles.budgetLimit}>
            ${item.spent.toFixed(2)} / ${item.limit.toFixed(2)}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${Math.min(progress, 100)}%` },
              isOverBudget && styles.progressBarOverBudget,
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Budgets</Text>
      <FlatList
        data={budgets}
        renderItem={renderBudget}
        keyExtractor={item => item.id}
        style={styles.budgetList}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddBudget')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  budgetList: {
    flex: 1,
  },
  budgetItem: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  budgetCategory: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  budgetLimit: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressBarOverBudget: {
    backgroundColor: '#D32F2F',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default BudgetsScreen;
