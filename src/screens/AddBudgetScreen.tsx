import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AddBudgetScreenProps } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Button, Card, Input } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

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

  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  const categoryError = category.length === 0 ? 'Category is required' : undefined;
  const limitError = limit.length === 0
    ? undefined
    : isNaN(Number(limit)) || Number(limit) <= 0
    ? 'Enter a valid positive limit'
    : undefined;
  const isSaveDisabled = !category || !limit || Boolean(categoryError) || Boolean(limitError);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Add a New Budget</Text>
        <Card>
          <Input
            label="Category"
            placeholder="e.g., Food, Shopping"
            value={category}
            onChangeText={setCategory}
            accessibilityLabel="Budget category"
            errorText={category.length === 0 ? undefined : categoryError}
          />
          <Input
            label="Spending Limit"
            placeholder="0.00"
            value={limit}
            onChangeText={setLimit}
            keyboardType="numeric"
            accessibilityLabel="Spending limit"
            errorText={limitError}
          />
        </Card>
        <Button title="Save Budget" onPress={handleAddBudget} accessibilityLabel="Save budget" accessibilityHint="Saves the budget and returns to the previous screen" disabled={isSaveDisabled} />
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
    },
    header: {
      fontSize: t.typography.xl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.md,
    },
    input: {
      backgroundColor: t.colors.card,
      color: t.colors.textPrimary,
      padding: t.spacing.md,
      borderRadius: t.radius.md,
      marginBottom: t.spacing.md,
      fontSize: t.typography.md,
      borderWidth: 1,
      borderColor: t.colors.border,
    },
  });

export default AddBudgetScreen;
