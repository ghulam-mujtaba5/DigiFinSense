import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BudgetsScreenProps, Budget } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Card, EmptyState } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

const BudgetsScreen = ({ navigation, budgets }: BudgetsScreenProps) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => makeStyles(tokens), [tokens]);
  const renderBudget = ({ item }: { item: Budget }) => {
    const progress = item.limit > 0 ? (item.spent / item.limit) * 100 : 0;
    const isOverBudget = progress > 100;

    return (
      <Card padded style={styles.budgetItem}>
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
      </Card>
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
        contentContainerStyle={budgets.length === 0 ? styles.emptyListContent : { paddingBottom: tokens.spacing.xl * 3 }}
        accessibilityLabel="Budgets list"
        ListEmptyComponent={
          <EmptyState title="No budgets yet" subtitle="Create a budget to start tracking your spending." />
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddBudget')}
        accessibilityRole="button"
        accessibilityLabel="Add budget"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
      padding: t.spacing.lg,
    },
    header: {
      fontSize: t.typography.xl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.lg,
    },
    budgetList: {
      flex: 1,
    },
    emptyListContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    budgetItem: {
      marginBottom: t.spacing.md,
    },
    budgetInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: t.spacing.sm,
    },
    budgetCategory: {
      fontSize: t.typography.md,
      color: t.colors.textPrimary,
      fontWeight: '600',
    },
    budgetLimit: {
      fontSize: t.typography.sm,
      color: t.colors.textSecondary,
    },
    progressBarContainer: {
      height: 10,
      backgroundColor: t.colors.border,
      borderRadius: t.radius.sm,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: t.colors.success,
      borderRadius: t.radius.sm,
    },
    progressBarOverBudget: {
      backgroundColor: t.colors.danger,
    },
    fab: {
      position: 'absolute',
      right: t.spacing.xl + t.spacing.xs,
      bottom: t.spacing.xl + t.spacing.xs,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: t.colors.fab,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: t.elevation.fab,
    },
    fabIcon: {
      fontSize: 30,
      color: t.colors.textPrimary,
    },
  });

export default BudgetsScreen;
