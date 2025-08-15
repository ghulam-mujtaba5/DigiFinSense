import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AnalyticsScreenProps, Transaction } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Card, EmptyState, Skeleton, ErrorBanner } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

type Props = AnalyticsScreenProps & {
  transactions: Transaction[];
};

const AnalyticsScreen = ({ navigation, transactions }: Props) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRetry = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  const handleDismiss = useCallback(() => setErrorMessage(null), []);

  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {} as { [key: string]: number });

  const chartData = Object.keys(spendingByCategory).map((category, index) => ({
    name: category,
    population: spendingByCategory[category],
    color: [tokens.colors.danger, tokens.colors.warning, tokens.colors.primary, tokens.colors.secondary, tokens.colors.success][index % 5],
    legendFontColor: tokens.colors.textSecondary,
    legendFontSize: tokens.typography.sm,
  }));

  const chartConfig = {
    backgroundGradientFrom: tokens.colors.card,
    backgroundGradientTo: tokens.colors.card,
    color: (opacity = 1) => {
      const alpha = Math.min(Math.max(opacity, 0), 1);
      // derive from textPrimary
      return tokens.colors.textPrimary.startsWith('#')
        ? `${tokens.colors.textPrimary}${Math.round(alpha * 255)
            .toString(16)
            .padStart(2, '0')}`
        : `rgba(255,255,255,${alpha})`;
    },
  } as const;

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Spending Analytics</Text>
      </View>
      {errorMessage ? (
        <View style={{ paddingHorizontal: 16 }}>
          <ErrorBanner message={errorMessage} onRetry={handleRetry} onDismiss={handleDismiss} />
        </View>
      ) : null}
      <Card padded style={styles.chartContainer}>
        <Text style={styles.chartHeader}>Spending by Category</Text>
        {isLoading ? (
          <Skeleton height={220} width={Dimensions.get('window').width - 40} radius={16} />
        ) : chartData.length > 0 ? (
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 0]}
            absolute
          />
        ) : (
          <EmptyState title="No spending data" subtitle="Add expenses to see category insights." />
        )}
      </Card>
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
    },
    backButton: {
      color: t.colors.textPrimary,
      fontSize: t.typography.xl,
      marginRight: t.spacing.md,
    },
    headerTitle: {
      fontSize: t.typography.lg,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
    },
    chartContainer: {
      alignItems: 'center',
      marginTop: t.spacing.lg,
      padding: t.spacing.lg,
      marginHorizontal: t.spacing.lg,
    },
    chartHeader: {
      fontSize: t.typography.md,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.md,
      alignSelf: 'flex-start',
    },
  });

export default AnalyticsScreen;
