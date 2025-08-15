DigiFinSense — Product Requirements Document (PRD) & AI Build Blueprint

App Type: Mobile (React Native, iOS + Android)Owner: GM Studio (Ghulam Mujtaba)Version: v1.0 (Initial Draft)Last Updated: 15 Aug 2025

1) Vision & Goals

Vision: Build a modern, privacy-first personal finance + investing superapp for emerging markets (starting with Pakistan) that combines portfolio tracking (à la getquin) with rich personal finance features (budgeting, cashflow, bills, goals), social investing, and actionable insights.

Primary Goals

Track 100% of user wealth: brokerage assets, crypto, cash accounts, gold, real-estate (manual), and custom assets.

Offer multi-currency portfolio analytics, tax-ready reporting, and import tools (CSV, broker reports, bank SMS parsing).

Provide personal finance: budgeting, categorization, recurring bills, goals/sinking funds, and cashflow forecasting.

Enable community features inspired by getquin (posts, watchlists, shared portfolios with privacy controls).

Be offline-first with seamless sync, strong data ownership, and transparent security.

Non-Goals (v1)

Real-money trading and brokerage execution.

Robo-advisory suitability algorithms (basic heuristics OK).

Instant bank linking for Pakistan (until reliable APIs are available; rely on CSV, SMS parsing, manual import in v1).

2) Target Users & Personas

New Investor (Ayesha, 22): Tracks a few stocks/ETFs and crypto, wants simple gain/loss and goals.

Active Trader (Bilal, 27): Wants advanced analytics (time-weighted returns, tax lots, allocation heatmaps).

Family Finance Manager (Sana, 35): Needs budgeting, recurring bills, categories, joint goals, and cashflow projection.

Creator/Influencer (Hamza, 29): Shares public watchlists and posts insights; values community and growth charts.

3) Competitive Notes (vs. getquin)

Parity: Portfolio tracking, community feed, watchlists, performance charts, news.

Differentiators: Manual assets + gold/real-estate, Pakistan-first cashflow + SMS parsing, robust budgeting, tax exports for PK/US/EU (configurable rules), offline-first, AI-driven categorization & insights.

4) Scope — Feature Inventory

4.1 Onboarding & Identity

Email/phone sign-up, social (Google/Apple), biometric unlock.

Optional KYC profile (only if connecting regulated integrations later).

Data residency & privacy consent, backup/restore setup.

4.2 Accounts & Assets (Multi-Portfolio)

Create multiple portfolios (e.g., “Long-term”, “Trading”, “Family”).

Add accounts inside a portfolio: Brokerage, Crypto wallet, Bank/Cash, Custom.

Asset classes: Stocks/ETFs, Mutual Funds, Bonds (manual), Crypto, Cash, Gold, Real Estate (manual), Custom.

Manual asset creation: Symbol-less assets with name, units, price source (manual/linked), valuation frequency.

4.3 Holdings, Transactions & Cost Basis

CRUD transactions: Buy, Sell, Transfer, Dividends, Interest, Fees, Splits, Airdrops (crypto), Staking rewards.

Cost basis methods: FIFO, LIFO, Average, Specific Lot.

Realized/unrealized P&L; accrued dividends; corporate actions support.

Bulk import via CSV (templates) + broker statement parsers (pluggable).

Price sources: Free delayed quotes (Yahoo/Alpha Vantage), premium real-time (toggled by tier), CoinGecko for crypto.

4.4 Portfolio Analytics & Insights

Performance: TWR, MWR/XIRR, IRR by asset/account/portfolio; drawdown; volatility; beta; Sharpe (risk-free toggle).

Allocation: By asset class, sector, geography, currency; treemap & donut; rebalance suggestions vs target.

Benchmarks: KSE-100, S&P 500, Nasdaq, MSCI EM, Gold; relative out/under-performance.

FX: Multi-currency with daily FX rates; base currency selectable; per-transaction currency support.

Alerts: Price thresholds, % moves, news, earnings dates, dividend ex-dates. Push + in-app.

4.5 Research & Discovery

Watchlists (multiple), screeners (basic v1: market cap, P/E, dividend yield, sector).

Company pages: summary, charts (1D–Max), key ratios, news, events.

News feed filtered by holdings/watchlists; AI-summarized briefs.

4.6 Personal Finance Suite

Budgeting: Monthly/weekly budgets; envelopes; category hierarchy; rollover; rules; shared budgets.

Transactions: Import via CSV; Android SMS parser (bank/card/Raast SMS → parse amount, merchant, category).

Categorization: AI model with user-trainable rules; split transactions; notes & attachments (receipts).

Bills & Recurring: Due dates, reminders, auto-categorize, partial payments.

Cashflow: Inflow/outflow trends, savings rate, runway forecast, goals funding plan.

Goals: Sinking funds, progress trackers, recommendations to reallocate excess cash to goals/portfolio.

Net Worth: Aggregated across portfolios, bank accounts, manual assets & liabilities.

4.7 Community (Optional Toggle per user)

Feed: Text + charts + link posts; reactions, comments, share.

Profiles: Public/Private; shared portfolios with masking (e.g., show allocation but hide position sizes).

Clubs: Private groups; moderators; pinned ideas.

4.8 Reports & Export

Tax: Capital gains (per method), dividend income report, holdings statement; PK settings (filing year, slabs, rebates) + generic config.

Export: CSV, PDF (portfolio, transactions, budget summary), JSON backup.

4.9 Settings & Privacy

Data backup/restore (encrypted) to cloud drive (Google Drive, iCloud) or local file.

Region/locale, currency, time zone.

Two-factor auth, session management, device list.

Telemetry toggle; granular permissions.

Offline-first with conflict resolution on sync.

4.10 Monetization

Free: Manual assets, basic quotes, budgets, SMS parsing basic, one portfolio, 1-month history exports.

Premium: Unlimited portfolios, advanced analytics, real-time quotes (where legal), priority alerts, tax reports, advanced screeners, scheduled backups.

5) UX Information Architecture

Tabs (5): Home, Portfolio, Finance, Discover, Community (toggle off removes tab).

Key Flows:

Onboard → Create/Import portfolio → Add account (Manual/CSV/SMS) → Add holdings/transactions.

Finance → Connect SMS/Import CSV → Categorize → Create budget → Review insights.

Discover → Watchlist → Company page → Add to portfolio → Set alert.

Reports → Select timeframe → Export PDF/CSV.

Wireframe Notes (textual)

Home: Net worth card, P&L, budget status, upcoming bills, alerts.

Portfolio: Allocation donut, performance line, holdings table, add txn FAB.

Finance: Budget progress bars, recent transactions list, “Add Transaction” CTA.

Discover: Search bar, watchlists, top movers, screener presets.

Community: Feed with post composer and filters.

6) Technical Architecture

Client: React Native (TypeScript), React Navigation, Redux Toolkit + RTK Query (or Zustand), Reanimated, NativeWind/Tailwind.Local Data: SQLite (expo-sqlite/WatermelonDB) for offline; AsyncStorage for small prefs; MMKV for secure small secrets.Charts: Victory Native or React Native Skia-based charts.Push: Firebase Cloud Messaging (FCM).Testing: Jest, React Native Testing Library, Detox (E2E).

Backend: Node.js (NestJS) or Python (FastAPI) — pick one.

DB: PostgreSQL + Prisma/SQLAlchemy.

Cache: Redis.

Workers: BullMQ/Celery for scheduled fetchers (quotes, FX, news).

File Storage: S3-compatible (e.g., Cloudflare R2) for backups/attachments.

Auth: JWT + refresh tokens; OAuth providers.

Analytics: PostHog or Firebase Analytics + Crashlytics.

Monitoring: OpenTelemetry; logs in Loki/ELK.

External Data Providers (pluggable):

Quotes/Fundamentals: Yahoo Finance (unofficial), Alpha Vantage, Twelve Data, Finnhub, Polygon (US), PSX data source (plugin).

Crypto: CoinGecko, CryptoCompare.

News: NewsAPI, Finnhub news, custom RSS.

FX: ExchangeRate.host/OpenExchangeRates.

SMS Parsing: Android SMS Retriever + custom regex/ML model for PK banks.

7) Data Model (High-Level)

Entities: User, Device, Portfolio, Account, Holding, Transaction, Price, CorporateAction, Watchlist, Alert, Budget, Category, PFTransaction (personal finance), Bill, Goal, Report, Post, Comment, Like, Club, Attachment, BackupJob.

Key Fields (examples):

Transaction: id, account_id, symbol (nullable), asset_type, side, quantity, price, fee, tax, currency, fx_rate, lot_id (nullable), timestamp.

Holding: id, account_id, symbol, asset_type, units, avg_cost, currency.

PFTransaction: id, account_id, amount, currency, merchant, channel, sms_id (nullable), category_id, split_group_id, timestamp, notes.

Budget: id, period_start, period_end, base_currency, limit_amount, rollover, categories[].

Relationships: Portfolio 1–N Accounts; Account 1–N Transactions/Holdings/PFTransactions; User 1–N Portfolios; Post ←→ User; Watchlist ←→ Symbols.

8) API Design (REST-first, GraphQL optional later)

Auth

POST /auth/register, /auth/login, /auth/refresh, /auth/logout

POST /auth/password/reset

Portfolio

GET/POST /portfolios

GET/PUT/DELETE /portfolios/:id

POST /portfolios/:id/accounts

POST /accounts/:id/transactions (bulk accepted)

GET /accounts/:id/holdings

GET /portfolios/:id/performance?granularity=day|week|month

GET /portfolios/:id/allocation

Prices & Market Data

GET /quotes?symbols=…

GET /fundamentals/:symbol

GET /news?symbols=…

Finance

POST /finance/transactions (CSV upload)

POST /finance/sms/ingest

GET /finance/budget/summary

POST /finance/budget

GET /finance/cashflow/forecast

Community

GET/POST /posts, /comments, /likes

POST /profiles/share-settings

Reports & Export

GET /reports/tax

GET /exports?type=csv|pdf|json

9) Functional Requirements (Selected)

Manual Asset Add: User can define a custom asset with valuation method (manual or linked).

CSV Import: Template download; validator shows errors by row; preview before commit.

SMS Parsing: Device permission flow; ML regex rules per bank; user can approve/undo.

Performance Engines: TWR and XIRR computed locally for instant view; server recomputes authoritative values on sync.

10) UI/UX Requirements (2025-quality Frontend)

• Visual Language (2025 look)

  - Dark-first design with auto light theme; high contrast, soft depth (subtle elevation, shadows), neumorphism avoided.
  - Spacing scale: 4, 8, 12, 16, 20, 24, 32.
  - Typography: Inter or SF Pro Text. Sizes: 12, 14, 16 (body), 20 (title), 24–32 (headers). Line-height 1.3–1.5.
  - Color tokens: primary (#007BFF), secondary (#6200EE), success (#4CAF50), danger (#FF5252), warning (#FFC107), surface (#121212), card (#1E1E1E), border (#333333), textPrimary (#FFFFFF), textSecondary (#A9A9A9).

• Design System

  - Use a token-first system (JSON/TS tokens) powering RN styles and charts. Store tokens in `source/` and consume via hooks.
  - Components standard: Button, Input, Card, ListItem, Badge, Chip, Tabs, Modal/BottomSheet, Toast/Snackbar, Tooltip, EmptyState, Skeleton.
  - Charts: consistent margins, axes styles, and color ramps; support pinch-to-zoom on performance charts.

• Navigation & Layout

  - React Navigation with 5-tab bottom bar; large header on top-level screens; contextual FABs.
  - Avoid nested scroll conflicts: one VirtualizedList per screen; use `ListHeaderComponent`/`ListFooterComponent` for composites.
  - Safe areas respected; keyboard avoiding on forms.

• Accessibility (A11y)

  - Text contrast WCAG AA minimum; support Dynamic Type (font scaling) up to 200% without layout breakage.
  - VoiceOver/TalkBack labels for interactive elements; hit slop ≥ 44x44 dp; focus order logical.
  - Haptics for key actions (success, error, selection) with OS-appropriate feedback.

• Motion & Micro-interactions

  - 120–200ms transitions; 300–400ms for major modals; use Reanimated for smoothness at 60fps.
  - Pull-to-refresh on lists; swipe actions on list items (e.g., delete, categorize) with confirm.
  - Skeleton loaders for lists and charts; shimmer optional.

• Performance Budgets (Mobile)

  - Cold start < 2.5s on mid-tier Android; TTI < 3.0s.
  - Above-the-fold content render < 1.2s after navigation.
  - List screens: use `FlatList`/`SectionList` with proper `keyExtractor`, `getItemLayout` where feasible, and `removeClippedSubviews`.
  - Image sizes optimized; cache with `react-native-fast-image` (or equivalent) when added.
  - No layout thrash: avoid heavy re-renders; memoize row components; use `useCallback`, `React.memo`.

• Theming & Localization

  - System theme follow (light/dark) with runtime toggle; persist preference.
  - RTL support; strings via i18n file; date/number localized to region/currency settings.

• Forms & Validation

  - Inline validation with helper/error text; disabled states; clear success/error toasts.
  - Masked inputs for currency; numeric keyboard where applicable.

• Empty, Loading, Error States

  - Each list/screen defines: EmptyState (icon, guidance CTA), Loading (skeleton + spinner fallback), Error (retry button, diagnostic text).

• Offline-first UX

  - Visible offline badge; queue writes; optimistic UI with rollback on error; conflict resolution messaging.

• Security & Privacy in UI

  - Sensitive numbers obfuscation toggle (tap to reveal) on Home/Portfolio; clipboard copy requires confirm for secrets.

• Charts UX

  - Tooltips on long-press; scrub with crosshair; date/value pinned; accessible summary for screen readers.

• Definition of Done (UI)

  - Meets performance budgets; no yellow-box warnings; no nested VirtualizedList violations.
  - A11y checks pass (contrast, labels, focus, scaling).
  - Works on small (4.7”), medium, large phones; basic tablet layout not required v1 but scales gracefully.
  - Unit tests for pure components; snapshot tests for key screens; E2E happy-path flows for add/edit asset/transaction/budget.
  - Design tokens used exclusively; no magic hex codes in components.

11) Frontend Implementation Notes

• State: Lightweight (Zustand or RTK Query) for server cache; local SQLite for offline data sets.

• Networking: Retry with backoff for fetchers; cancellation on unmount; debounce search.

• Error Handling: Central toast/snackbar; error boundary for charts and heavy widgets.

• File/Code Quality: Strict TypeScript; ESLint + Prettier; commit hooks run tests and lint.

12) QA Checklist (per screen)

  - Visual parity with design tokens (light/dark).
  - Scroll/gesture correctness; no overlap with FAB; safe area respected.
  - A11y labels; font scaling 100–200% passes.
  - Offline behavior verified (read, optimistic write where applicable).
  - Performance trace captured once before release.

13) Implementation Status (Live)

Status Legend: Implemented · In Progress · Planned 

• Navigation & Layout

  - Single-screen app (Dashboard-only) as initial route 
  - Remove/guard navigation to non-existent screens 
  - One VirtualizedList per screen; no nesting warnings 

• Accessibility (A11y)

  - Dynamic Type up to 200% on key text (headers, cards, list headers) 
  - Accessible chart summary for screen readers (line chart) 
  - Hide visual chart from accessibility tree to prevent duplicate reading 
  - A11y labels on privacy toggle and amounts 

• Motion & Micro-interactions

  - Pull-to-refresh on Dashboard list 
  - Subtle haptic feedback on refresh completion 
  - Additional haptic patterns for success/error 

• Performance Budgets

  - FlatList tuned: keyExtractor, getItemLayout, initialNumToRender, maxToRenderPerBatch, windowSize, removeClippedSubviews 
  - Skeleton placeholders for charts and list items 
  - Measure cold start/TTI on device 

• Theming & Localization

  - Token-first theming via `source/theme/tokens.ts` (light/dark) 
  - i18n scaffold for strings (en) 
  - RTL-safe writing direction on root container 

• Security & Privacy in UI

  - Sensitive numbers obfuscation toggle (Dashboard) 
  - Clipboard protection for secrets 

• Offline-first UX

  - Offline badge (basic, NetInfo optional) ✅
  - Optimistic writes with rollback messaging 📝
  - Conflict resolution messaging 📝

• Charts UX

  - Accessible summary 
  - Pinch-to-zoom / gestures 
  - Tooltips / scrub with crosshair 

• QA/Quality

  - No yellow-box warnings expected 
  - Unit and snapshot tests for Dashboard 
  - E2E happy-path (add/edit asset/transaction/budget) 

Notes

- Current focus is stabilizing a Dashboard-only MVP for reliable QA and performance validation before scaling features.
- NetInfo is optional; app shows the Offline banner when NetInfo is present, and assumes online when absent. Installing `@react-native-community/netinfo` enables accurate connectivity detection.
- Next milestone: refine haptics and begin test coverage for Dashboard components.
