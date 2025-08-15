import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AddTransactionScreenProps, Transaction } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Button, Card, Input } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

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

  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens, type]);

  const descriptionError = description.length === 0
    ? undefined
    : description.trim().length < 3
    ? 'Description is too short'
    : undefined;
  const amountError = amount.length === 0
    ? undefined
    : isNaN(Number(amount)) || Number(amount) <= 0
    ? 'Enter a valid amount'
    : undefined;
  const categoryError = type === 'expense' && category.length === 0 ? 'Category is required for expenses' : undefined;
  const isSaveDisabled =
    !description || !amount || Boolean(descriptionError) || Boolean(amountError) || (type === 'expense' && Boolean(categoryError));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Add Transaction</Text>

      <Card>
        <Input
          label="Description"
          placeholder="e.g., Salary or Lunch"
          value={description}
          onChangeText={setDescription}
          accessibilityLabel="Description"
          errorText={descriptionError}
        />
        <Input
          label="Amount"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          accessibilityLabel="Amount"
          errorText={amountError}
          returnKeyType="done"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Income</Text>
          <Switch
            value={type === 'income'}
            onValueChange={(value) => setType(value ? 'income' : 'expense')}
            thumbColor={type === 'income' ? tokens.colors.success : tokens.colors.danger}
            trackColor={{ false: tokens.colors.border, true: tokens.colors.primary }}
            accessibilityLabel="Toggle income or expense"
          />
          <Text style={styles.switchLabel}>Expense</Text>
        </View>

        {type === 'expense' && (
          <Input
            label="Category"
            placeholder="e.g., Food, Transport"
            value={category}
            onChangeText={setCategory}
            accessibilityLabel="Category"
            errorText={categoryError}
          />
        )}
      </Card>

      <Button title="Save Transaction" onPress={handleAddTransaction} accessibilityLabel="Save transaction" accessibilityHint="Saves the transaction and returns to the previous screen" disabled={isSaveDisabled} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    content: {
      flexGrow: 1,
      padding: t.spacing.lg,
      paddingTop: t.spacing.xl,
    },
    title: {
      fontSize: t.typography.xxl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.lg,
      textAlign: 'center',
    },
    input: {
      backgroundColor: t.colors.card,
      color: t.colors.textPrimary,
      paddingHorizontal: t.spacing.md,
      paddingVertical: t.spacing.md,
      borderRadius: t.radius.md,
      fontSize: t.typography.md,
      marginBottom: t.spacing.md,
      borderWidth: 1,
      borderColor: t.colors.border,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: t.spacing.md,
    },
    switchLabel: {
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      marginHorizontal: t.spacing.sm,
    },
  });

export default AddTransactionScreen;
