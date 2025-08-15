// Simple i18n scaffold (no external deps)
// Extend with more locales later
export type Locale = 'en';

const en = {
  dashboardTitle: 'Dashboard',
  netWorth: 'Net Worth',
  portfolioPerformance: 'Portfolio Performance',
  yourAssets: 'Your Assets',
  budgets: 'Budgets',
  recentTransactions: 'Recent Transactions',
  amountsHidden: 'Amounts hidden',
  amountsVisible: 'Amounts visible',
  show: 'Show',
  hide: 'Hide',
  lineChartSummary: (latest: number) => `Line chart summary: latest value ${latest}k.`,
  lineChartA11y: (latest: number) => `Line chart showing portfolio trend over six months. Latest value ${latest} thousand dollars.`,
  noTransactionsTitle: 'No transactions yet',
  noTransactionsSubtitle: 'Add a transaction to see it here.',
  offlineBadge: 'Offline',
  offlineHint: 'Some features may be unavailable.',
};

const locales: Record<Locale, typeof en> = { en };

let currentLocale: Locale = 'en';

export const setLocale = (l: Locale) => { currentLocale = l; };
export const getLocale = () => currentLocale;
export const strings = () => locales[currentLocale];
export const t = <K extends keyof typeof en>(key: K, ...args: any[]): any => {
  const s = locales[currentLocale][key];
  if (typeof s === 'function') return (s as any)(...args);
  return s as any;
};
