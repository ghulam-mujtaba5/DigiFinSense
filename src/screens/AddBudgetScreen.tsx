import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AddBudgetScreenProps } from '../navigation/types';

const AddBudgetScreen = ({ navigation, addBudget }: AddBudgetScreenProps) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');

  const handleAddBudget = () => {
    if (!category || !limit) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const limitAmount = parseFloat(limit);
    if (isNaN(limitAmount) || limitAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid limit amount.');
      return;
    }

    addBudget({ category, limit: limitAmount });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Food, Shopping)"
        placeholderTextColor="#A9A9A9"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Spending Limit"
        placeholderTextColor="#A9A9A9"
        value={limit}
        onChangeText={setLimit}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleAddBudget}>
        <Text style={styles.saveButtonText}>Save Budget</Text>
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
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddBudgetScreen;
