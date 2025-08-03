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
} from 'react-native';
import { AddAssetScreenProps, Asset } from '../navigation/types';

type Props = AddAssetScreenProps & {
  addAsset: (newAsset: Asset) => void;
};

const AddAssetScreen = ({ navigation, addAsset }: Props) => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState('');

  const handleAddAsset = () => {
    if (!name || !ticker || !value || !amount) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    addAsset({
      name,
      ticker,
      amount: parseFloat(amount),
      value: parseFloat(value),
      change: 0, // Default change to 0 for new assets
      icon: name.charAt(0).toUpperCase(), // Default icon to first letter
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Asset</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Asset Name (e.g., Bitcoin)"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Ticker (e.g., BTC)"
          placeholderTextColor="#888"
          value={ticker}
          onChangeText={setTicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount Owned"
          placeholderTextColor="#A9A9A9"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Current Value per Unit"
          placeholderTextColor="#A9A9A9"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleAddAsset}>
          <Text style={styles.saveButtonText}>Save Asset</Text>
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

export default AddAssetScreen;
