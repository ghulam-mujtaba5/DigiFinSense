import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import { TransactionsScreenProps, Transaction } from '../navigation/types';
import { ListItem, EmptyState, Skeleton, ErrorBanner } from '../../source/components/ui';
import { useTheme } from '../../source/theme/ThemeProvider';
import type { Tokens } from '../../source/theme/tokens';

type Props = TransactionsScreenProps & {
  transactions: Transaction[];
};

const TransactionsScreen = ({ navigation, transactions }: Props) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => makeStyles(tokens), [tokens]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRetry = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  const handleDismiss = useCallback(() => setErrorMessage(null), []);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <ListItem
      title={item.description}
      subtitle={item.date}
      right={
        <Text style={[styles.transactionAmount, { color: item.type === 'income' ? tokens.colors.success : tokens.colors.danger }]}>
          {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
        </Text>
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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
        <Text style={styles.headerTitle}>Transactions</Text>
      </View>
      {errorMessage ? (
        <View style={{ paddingHorizontal: 16 }}>
          <ErrorBanner message={errorMessage} onRetry={handleRetry} onDismiss={handleDismiss} />
        </View>
      ) : null}
      <FlatList
        data={isLoading ? [] : transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.transactionList}
        contentContainerStyle={(isLoading || transactions.length === 0) ? styles.emptyListContent : styles.listContent}
        ListEmptyComponent={
          isLoading ? (
            <View style={{ width: '100%', paddingHorizontal: 16 }}>
              <View style={{ gap: 12 }}>
                <Skeleton height={64} />
                <Skeleton height={64} />
                <Skeleton height={64} />
              </View>
            </View>
          ) : (
            <View style={{ width: '100%', paddingHorizontal: 16 }}>
              <EmptyState title="No transactions yet" subtitle="Add your first transaction to get started." />
            </View>
          )
        }
        initialNumToRender={12}
        windowSize={11}
        maxToRenderPerBatch={12}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews
      />
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
        accessibilityRole="button"
        accessibilityLabel="Add transaction"
        accessibilityHint="Opens the add transaction form"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: t.spacing.lg,
      paddingTop: StatusBar.currentHeight || t.spacing.lg,
    },
    backButton: {
      color: t.colors.textPrimary,
      fontSize: 24,
      marginRight: t.spacing.md,
    },
    headerTitle: {
      fontSize: t.typography.xl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
    },
    transactionList: {
      flex: 1,
    },
    listContent: {
      paddingBottom: t.spacing.xxl * 2,
    },
    emptyListContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: t.spacing.lg,
    },
    transactionAmount: {
      fontSize: t.typography.md,
      fontWeight: 'bold',
    },
    fab: {
      position: 'absolute',
      right: t.spacing.lg,
      bottom: t.spacing.lg,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: t.colors.fab,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: t.elevation.fab,
    },
    fabIcon: {
      fontSize: 24,
      color: t.colors.textPrimary,
    },
    emptyState: {
      alignItems: 'center',
      gap: t.spacing.xs,
    },
    emptyTitle: {
      fontSize: t.typography.lg,
      color: t.colors.textPrimary,
      fontWeight: '600',
    },
    emptySubtitle: {
      fontSize: t.typography.sm,
      color: t.colors.textSecondary,
      marginTop: 2,
      textAlign: 'center',
    },
  });

export default TransactionsScreen;
