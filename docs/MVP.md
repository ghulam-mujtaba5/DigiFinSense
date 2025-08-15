# DigiFinSense MVP (P0) Scope

Version: v1.0 (Initial)  
Owner: GM Studio (Ghulam Mujtaba)  
Last Updated: 15 Aug 2025

## 1. MVP Goals
- Deliver a usable personal finance + portfolio tracker with offline-first local data and basic analytics.  
- Focus on Pakistan-first experience: PKR base currency, basic FX handling, CSV imports, and SMS parsing (baseline).  
- Ship within 4–6 weeks with quality and a clear upgrade path to Premium.

## 2. In-Scope (P0)
- Onboarding/Auth
  - [x] Temporary no-auth: login/signup flows that accept empty credentials.
  - [ ] Local user profile stub (name, base currency, region).

- Portfolios/Accounts/Assets
  - [ ] Create a single portfolio (multi-portfolio later).  
  - [ ] Add Manual Accounts (Brokerage, Crypto, Cash, Custom).  
  - [ ] Manual Asset creation (symbol-less supported).  
  - [ ] CRUD Transactions: Buy/Sell/Transfer/Dividends/Fees.

- Pricing/Data
  - [ ] Free delayed quotes for stocks/ETFs via Yahoo/Alpha Vantage (best-effort).  
  - [ ] Crypto prices via CoinGecko.  
  - [ ] Basic FX rates (daily) for PKR conversion.

- Analytics
  - [ ] Performance: Daily P/L, Unrealized/Realized P&L (Average cost).  
  - [ ] Allocation: By asset class; donut chart.  
  - [ ] Benchmarks: KSE-100 and S&P 500 (price-only, relative chart).  

- Personal Finance
  - [ ] Budgets: Monthly budgets with categories; progress bars; manual transactions.  
  - [ ] CSV import for PF transactions (template + basic validator).  
  - [ ] Android SMS parsing (baseline): parse amount/merchant from selected bank SMS (regex rules), manual confirm.

- Reports/Export
  - [ ] Export holdings, transactions, and budget summary as CSV.  
  - [ ] Local encrypted JSON backup.

- App Quality
  - [ ] Offline-first local store (SQLite/AsyncStorage mix).  
  - [ ] Basic theming and responsive layouts.  
  - [ ] Error handling + empty states.  
  - [ ] Basic analytics events (screen views, actions) using PostHog or Firebase.

## 3. Out of Scope (Defer)
- Real-time quotes behind paywall.  
- Multi-portfolio.  
- Advanced analytics (XIRR/TWR with cashflows per account).  
- Tax packs and PDF reports.  
- Community feed.

## 4. Milestones
- M1 — Foundations (Week 1–2)
  - RN screens/shell, navigation, local storage, data models.
- M2 — Portfolio Core (Week 2–3)
  - Manual accounts, assets, CRUD txns, prices, allocation.
- M3 — Personal Finance (Week 3–4)
  - Budgets, CSV import, baseline SMS parsing.
- M4 — Reports/Polish (Week 4–5)
  - CSV exports, backup/restore, QA hardening, telemetry.
- Launch/Buffer (Week 6)

## 5. Acceptance Criteria (sample)
- Portfolio
  - [ ] User can add a manual asset with units and price; portfolio value updates.  
  - [ ] User can import a CSV of transactions; invalid rows are flagged with messages.  
  - [ ] Allocation donut shows correct percentages (sum ~100%).
- PF
  - [ ] Budget progress updates when new expense with matching category is added.  
  - [ ] SMS parsing surface shows parsed fields and allows accept/undo.  
- General
  - [ ] App works fully offline; changes persist across restarts.  
  - [ ] Exported CSVs open correctly in Excel/Sheets.

## 6. Risks & Mitigations
- Data sources reliability → Make providers pluggable; cache last-good data.  
- SMS format variance → Start with 2–3 banks; ship rule config UI for quick tweaks.  
- Performance on low-end devices → Use FlatList, memoization, and chunking for imports.
