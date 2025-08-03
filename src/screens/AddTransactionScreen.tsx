import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { AddTransactionScreenProps, Transaction } from '../navigation/types';

type Props = AddTransactionScreenProps & {
  addTransaction: (newTransaction: Omit<Transaction, 'id' | 'date'>) => void;
};

const AddTransactionScreen = ({ navigation, addTransaction }: Props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState('');

  const handleAddTransaction = () => {
    const parsedAmount = parseFloat(amount);
    const transactionCategory = isExpense ? category : 'Income';
    if (description.trim() && !isNaN(parsedAmount) && (isExpense ? category.trim() : true)) {
      addTransaction({
        description,
        amount: parsedAmount,
        type: isExpense ? 'expense' : 'income',
        category: transactionCategory,
      });
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all fields correctly.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Description (e.g., Groceries)"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (e.g., 50.00)"
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        {isExpense && (
          <TextInput
            style={styles.input}
            placeholder="Category (e.g., Food)"
            placeholderTextColor="#888"
            value={category}
            onChangeText={setCategory}
          />
        )}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Income</Text>
          <Switch
            trackColor={{ false: '#f44336', true: '#4caf50' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsExpense(previousState => !previousState)}
            value={!isExpense}
          />
          <Text style={styles.switchLabel}>Expense</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleAddTransaction}>
          <Text style={styles.saveButtonText}>Save Transaction</Text>
        </TouchableOpacity>
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
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
