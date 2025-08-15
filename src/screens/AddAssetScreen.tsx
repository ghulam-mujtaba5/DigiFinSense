import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { AddAssetScreenProps, Asset } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Button, Card, Input } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

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

  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  const nameError = name.length === 0 ? undefined : name.trim().length < 2 ? 'Name is too short' : undefined;
  const tickerError = ticker.length === 0 ? undefined : !/^[A-Z0-9]{1,10}$/.test(ticker) ? 'Use A–Z and 0–9, up to 10 chars' : undefined;
  const amountError = amount.length === 0 ? undefined : isNaN(Number(amount)) || Number(amount) < 0 ? 'Enter a valid amount' : undefined;
  const valueError = value.length === 0 ? undefined : isNaN(Number(value)) || Number(value) <= 0 ? 'Enter a positive value' : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Add New Asset</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={64} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <Card>
            <Input
              label="Asset Name"
              placeholder="e.g., Bitcoin"
              value={name}
              onChangeText={setName}
              accessibilityLabel="Asset name"
              errorText={nameError}
              autoCapitalize="words"
            />
            <Input
              label="Ticker"
              placeholder="e.g., BTC"
              value={ticker}
              onChangeText={(t) => setTicker(t.toUpperCase())}
              accessibilityLabel="Ticker"
              autoCapitalize="characters"
              errorText={tickerError}
            />
            <Input
              label="Amount Owned"
              placeholder="0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              accessibilityLabel="Amount owned"
              errorText={amountError}
            />
            <Input
              label="Current Value per Unit"
              placeholder="0.00"
              value={value}
              onChangeText={setValue}
              keyboardType="numeric"
              accessibilityLabel="Current value per unit"
              errorText={valueError}
            />
          </Card>
          <Button title="Save Asset" onPress={handleAddAsset} accessibilityLabel="Save asset" accessibilityHint="Saves the asset and returns to the previous screen" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    flex: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: t.spacing.lg,
      paddingTop: (StatusBar.currentHeight || 20) as number,
    },
    backButton: {
      color: t.colors.textPrimary,
      fontSize: t.typography.xl,
      marginRight: t.spacing.md,
    },
    headerTitle: {
      fontSize: t.typography.xl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
    },
    form: {
      padding: t.spacing.lg,
      gap: t.spacing.md,
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

export default AddAssetScreen;
