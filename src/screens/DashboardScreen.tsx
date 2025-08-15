import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Dimensions,
  RefreshControl,
  Vibration,
  I18nManager,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Asset, DashboardScreenProps, Transaction } from '../navigation/types';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Card, ListItem, EmptyState, Skeleton, ErrorBanner } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';
import { t } from '../i18n/strings';
import { useConnectivity } from '../hooks/useConnectivity';

type Props = DashboardScreenProps & {
  assets: Asset[];
  transactions: Transaction[];
};

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
        Math.random() * 10000,
      ],
    },
  ],
};

// chart config will be created per-theme inside the component

const DashboardScreen = ({ navigation, assets, transactions, budgets }: Props) => {
  const { tokens } = useTheme();
  const styles = useMemo(() => makeStyles(tokens), [tokens]);
  // Local demo state; replace with real loading/error state from data hooks when available
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hideSensitive, setHideSensitive] = useState(false);
  const { isConnected } = useConnectivity();

  const handleRetry = useCallback(() => {
    setErrorMessage(null);
    setIsLoading(true);
    // simulate reload
    setTimeout(() => setIsLoading(false), 1200);
  }, []);
  const handleDismiss = useCallback(() => setErrorMessage(null), []);

  const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const cashBalance = transactions.reduce((balance, transaction) => {
    return transaction.type === 'income' ? balance + transaction.amount : balance - transaction.amount;
  }, 0);
  const netWorth = totalAssetValue + cashBalance;

  const pieChartData = assets.map((asset, index) => ({
    name: asset.ticker,
    population: asset.value,
    color: ['#007bff', '#ff4d4d', '#33cc33', '#ffcc00', '#8a2be2'][index % 5],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const renderAsset = useCallback(({ item }: { item: Asset }) => (
    <View style={styles.assetRow}>
      <View style={styles.assetInfo}>
        <Text style={styles.assetName} allowFontScaling maxFontSizeMultiplier={2}>{item.name}</Text>
        <Text style={styles.assetTicker} allowFontScaling maxFontSizeMultiplier={2}>{item.ticker}</Text>
      </View>
      <View style={styles.assetMeta}>
        <Text
          style={styles.assetValue}
          allowFontScaling
          maxFontSizeMultiplier={2}
          accessibilityLabel={hideSensitive ? `${item.name} value hidden` : `${item.name} value ${item.value.toLocaleString()} dollars`}
        >
          {hideSensitive ? '•••' : `$${item.value.toLocaleString()}`}
        </Text>
        <Text style={[styles.assetChange, { color: item.change >= 0 ? tokens.colors.success : tokens.colors.danger }]} allowFontScaling maxFontSizeMultiplier={2}>
          {item.change >= 0 ? '+' : ''}{item.change}%
        </Text>
      </View>
    </View>
  ), [tokens, hideSensitive]);

  const chartConfig = useMemo(() => ({
    backgroundColor: tokens.colors.card,
    backgroundGradientFrom: tokens.colors.card,
    backgroundGradientTo: tokens.colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(${tokens.colors.textPrimary === '#FFFFFF' ? '255, 255, 255' : '18, 18, 18'}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${tokens.colors.textSecondary === '#A9A9A9' ? '169, 169, 169' : '79, 79, 79'}, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    },
  }), [tokens]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    // simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // subtle haptic feedback on refresh completion
      try { Vibration.vibrate(10); } catch {}
    }, 1000);
  }, []);

  const getItemLayout = useCallback<NonNullable<React.ComponentProps<typeof FlatList<Asset>>['getItemLayout']>>(
    (_data, index) => {
      // Approximate row height = padding + content ~ 72
      const ROW_HEIGHT = 72;
      return { length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index };
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {errorMessage ? (
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          <ErrorBanner message={errorMessage} onRetry={handleRetry} onDismiss={handleDismiss} />
        </View>
      ) : null}
      {!isConnected ? (
        <View style={styles.offlineBanner} accessible accessibilityRole="text" accessibilityLabel={`${t('offlineBadge')}. ${t('offlineHint')}`}>
          <Text style={styles.offlineText} allowFontScaling maxFontSizeMultiplier={2}>{t('offlineBadge')}</Text>
          <Text style={styles.offlineHint} allowFontScaling maxFontSizeMultiplier={2}>{t('offlineHint')}</Text>
        </View>
      ) : null}
      {/* Use a single VirtualizedList as the main scroller to avoid nesting warnings */}
      <FlatList
        data={isLoading ? [] : assets}
        renderItem={renderAsset}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        ListHeaderComponent={(
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle} allowFontScaling maxFontSizeMultiplier={2}>{t('dashboardTitle')}</Text>
              <View style={styles.privacyRow}>
                <Text style={styles.privacyLabel} allowFontScaling maxFontSizeMultiplier={2}>
                  {hideSensitive ? t('amountsHidden') : t('amountsVisible')}
                </Text>
                <Text
                  onPress={() => setHideSensitive(v => !v)}
                  accessibilityRole="button"
                  accessibilityLabel={hideSensitive ? t('show') + ' amounts' : t('hide') + ' amounts'}
                  accessibilityHint="Toggles visibility of sensitive financial numbers"
                  style={styles.privacyToggle}
                >
                  {hideSensitive ? t('show') : t('hide')}
                </Text>
              </View>
            </View>

            {/* Navigation buttons removed to keep a simple Dashboard-only screen */}

            <Card padded style={styles.balanceCard}>
              <Text style={styles.balanceLabel} allowFontScaling maxFontSizeMultiplier={2}>{t('netWorth')}</Text>
              <Text
                style={styles.balanceAmount}
                allowFontScaling
                maxFontSizeMultiplier={2}
                accessibilityLabel={hideSensitive ? t('netWorth') + ' hidden' : `${t('netWorth')} ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} dollars`}
              >
                {hideSensitive ? '•••••' : `$${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </Text>
            </Card>

            <View style={styles.chartContainer}>
              <Text style={styles.chartHeader} allowFontScaling maxFontSizeMultiplier={2}>{t('portfolioPerformance')}</Text>
              {/* Accessible summary for screen readers */}
              <Text
                accessible
                accessibilityLabel={t('lineChartA11y', chartData.datasets[0].data[5])}
                style={styles.chartSummary}
                allowFontScaling
                maxFontSizeMultiplier={2}
              >
                {t('lineChartSummary', chartData.datasets[0].data[5])}
              </Text>
              {isLoading ? (
                <Skeleton height={220} width={Dimensions.get('window').width - 40} radius={16} />
              ) : (
                <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                  <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                  />
                </View>
              )}
            </View>

            <Text style={styles.listHeader} allowFontScaling maxFontSizeMultiplier={2}>{t('yourAssets')}</Text>
            {isLoading ? (
              <View style={{ gap: 12 }}>
                <Skeleton height={64} />
                <Skeleton height={64} />
                <Skeleton height={64} />
              </View>
            ) : null}
          </View>
        )}
        ListFooterComponent={(
          <View>
            <Text style={styles.sectionTitle} allowFontScaling maxFontSizeMultiplier={2}>{t('budgets')}</Text>
            {budgets.map(budget => (
              <View key={budget.id} style={styles.budgetItem}>
                <View style={styles.budgetInfo}>
                  <Text style={styles.budgetCategory} allowFontScaling maxFontSizeMultiplier={2}>{budget.category}</Text>
                  <Text style={styles.budgetLimit} allowFontScaling maxFontSizeMultiplier={2}>${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }]} />
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle} allowFontScaling maxFontSizeMultiplier={2}>{t('recentTransactions')}</Text>
            {transactions.length === 0 ? (
              <EmptyState title={t('noTransactionsTitle')} subtitle={t('noTransactionsSubtitle')} />
            ) : (
              transactions.slice(0, 5).map(item => (
                <ListItem
                  key={item.id}
                  title={item.description}
                  subtitle={item.date}
                  right={
                    <Text
                      style={[styles.transactionAmount, { color: item.type === 'income' ? tokens.colors.success : tokens.colors.danger }]}
                      accessibilityLabel={hideSensitive ? 'Amount hidden' : `${item.type === 'income' ? 'Income' : 'Expense'} ${item.amount.toFixed(2)} dollars`}
                    >
                      {hideSensitive ? '•••' : `${item.type === 'income' ? '+' : '-'}$${item.amount.toFixed(2)}`}
                    </Text>
                  }
                />
              ))
            )}

            <View style={styles.chartContainer}>
              <Text style={styles.chartHeader}>Asset Allocation</Text>
              {isLoading ? (
                <Skeleton height={220} width={Dimensions.get('window').width - 40} radius={16} />
              ) : (
                <PieChart
                  data={pieChartData}
                  width={Dimensions.get('window').width - 40}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'15'}
                  center={[10, 0]}
                  absolute
                />
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={(
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <EmptyState title="No assets yet" subtitle="Add your first asset to see it listed here." />
          </View>
        )}
        style={styles.assetList}
      />

      {/* FAB removed in single-screen mode */}
    </SafeAreaView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    scrollViewContent: {
      paddingBottom: t.spacing.xl,
    },
    
    
    container: {
      flex: 1,
      backgroundColor: t.colors.surface,
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    header: {
      padding: t.spacing.lg,
      paddingTop: StatusBar.currentHeight || t.spacing.lg,
    },
    headerTitle: {
      fontSize: t.typography.xxl,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
    },
    balanceCard: {
      backgroundColor: t.colors.card,
      borderRadius: t.radius.lg,
      padding: t.spacing.xl,
      marginHorizontal: t.spacing.lg,
      marginBottom: t.spacing.lg,
      alignItems: 'center',
      elevation: t.elevation.card,
    },
    balanceLabel: {
      fontSize: t.typography.md,
      color: t.colors.textSecondary,
    },
    balanceAmount: {
      fontSize: 36,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginTop: 5,
    },
    listHeader: {
      fontSize: t.typography.lg,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      paddingHorizontal: t.spacing.lg,
      marginTop: t.spacing.lg,
      marginBottom: t.spacing.sm,
    },
    chartContainer: {
      marginTop: t.spacing.lg,
      alignItems: 'center',
    },
    chartHeader: {
      fontSize: t.typography.lg,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginBottom: t.spacing.sm,
      alignSelf: 'flex-start',
      paddingHorizontal: t.spacing.lg,
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
    chartSummary: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
      marginBottom: t.spacing.xs,
    },
    offlineBanner: {
      backgroundColor: t.colors.warning,
      paddingHorizontal: t.spacing.lg,
      paddingVertical: t.spacing.xs,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    offlineText: {
      color: t.colors.textPrimary,
      fontWeight: '700',
    },
    offlineHint: {
      color: t.colors.textPrimary,
      opacity: 0.9,
      fontSize: t.typography.sm,
    },
    assetList: {
      paddingHorizontal: t.spacing.lg,
    },
    assetRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: t.colors.card,
      padding: t.spacing.md,
      borderRadius: t.radius.md,
      marginBottom: t.spacing.md,
      elevation: t.elevation.card,
    },
    assetIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: t.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: t.spacing.md,
    },
    assetIconText: {
      color: t.colors.textPrimary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    assetInfo: {
      flex: 1,
    },
    assetName: {
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      fontWeight: 'bold',
    },
    assetTicker: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
    },
    assetMeta: {
      alignItems: 'flex-end',
    },
    assetValue: {
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      fontWeight: '600',
      textAlign: 'right',
    },
    assetPrice: {
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      fontWeight: 'bold',
    },
    assetChange: {
      fontSize: t.typography.sm,
    },
    fab: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
      backgroundColor: t.colors.fab,
      borderRadius: 30,
      elevation: t.elevation.fab,
    },
    fabIcon: {
      fontSize: 24,
      color: t.colors.textPrimary,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: t.colors.textPrimary,
      marginTop: t.spacing.lg,
      marginBottom: t.spacing.sm,
      paddingHorizontal: t.spacing.lg,
    },
    budgetItem: {
      backgroundColor: t.colors.card,
      padding: t.spacing.md,
      borderRadius: t.radius.md,
      marginBottom: t.spacing.md,
      elevation: t.elevation.card,
    },
    budgetInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: t.spacing.sm,
    },
    budgetCategory: {
      color: t.colors.textPrimary,
      fontSize: t.typography.md,
      fontWeight: '600',
    },
    budgetLimit: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: t.colors.border,
      borderRadius: 4,
    },
    progressBar: {
      height: '100%',
      backgroundColor: t.colors.secondary,
      borderRadius: 4,
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: t.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.border,
      paddingHorizontal: t.spacing.lg,
    },
    transactionDescription: {
      fontSize: t.typography.md,
      color: t.colors.textPrimary,
    },
    transactionAmount: {
      fontSize: t.typography.md,
      fontWeight: '600',
    },
    privacyRow: {
      marginTop: t.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      gap: t.spacing.md,
    },
    privacyLabel: {
      color: t.colors.textSecondary,
      fontSize: t.typography.sm,
      flex: 1,
    },
    privacyToggle: {
      color: t.colors.primary,
      fontSize: t.typography.sm,
      fontWeight: '600',
      paddingHorizontal: t.spacing.sm,
      paddingVertical: t.spacing.xs,
      borderRadius: t.radius.sm,
    },
  });

export default DashboardScreen;
