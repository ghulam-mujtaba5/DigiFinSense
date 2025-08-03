import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { AddTransactionScreenProps, Transaction } from '../navigation/types';

const AddTransactionScreen = ({ navigation, addTransaction }: AddTransactionScreenProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');

  const handleAddTransaction = () => {
    const transactionCategory = type === 'expense' ? category : 'Income';
    if (!description || !amount || (type === 'expense' && !category)) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newTransaction: Omit<Transaction, 'id'> = {
      description,
      amount: parseFloat(amount),
      type,
      category: transactionCategory,
      date: new Date().toISOString().split('T')[0],
    };

    addTransaction(newTransaction);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#A9A9A9"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Income</Text>
        <Switch
          value={type === 'income'}
          onValueChange={(value) => setType(value ? 'income' : 'expense')}
          thumbColor={type === 'income' ? '#4CAF50' : '#FF6347'}
          trackColor={{ false: '#f4f3f4', true: '#81b0ff' }}
        />
        <Text style={styles.switchLabel}>Expense</Text>
      </View>

      {type === 'expense' && (
        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Food, Transport)"
          placeholderTextColor="#A9A9A9"
          value={category}
          onChangeText={setCategory}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleAddTransaction}>
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
