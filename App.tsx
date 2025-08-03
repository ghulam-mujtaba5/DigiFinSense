import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  value: number;
  change: number;
  icon: string;
};

// Dummy data for the asset list
const DUMMY_ASSETS: Asset[] = [
  { id: '1', name: 'Bitcoin', ticker: 'BTC', value: 6800.5, change: 2.5, icon: 'B' },
  { id: '2', name: 'Ethereum', ticker: 'ETH', value: 3400.2, change: -1.2, icon: 'E' },
  { id: '3', name: 'Apple Inc.', ticker: 'AAPL', value: 1250.75, change: 5.1, icon: 'A' },
  { id: '4', name: 'Tesla Inc.', ticker: 'TSLA', value: 850.0, change: 0.8, icon: 'T' },
];

const App = () => {
  const [assets, setAssets] = useState<Asset[]>(DUMMY_ASSETS);

  const addAsset = (newAsset: Omit<Asset, 'id' | 'change' | 'icon' | 'value'> & { value: number }) => {
    setAssets(prevAssets => [
      ...prevAssets,
      {
        ...newAsset,
        id: Math.random().toString(),
        change: (Math.random() - 0.5) * 10, // Random change
        icon: newAsset.name.charAt(0).toUpperCase(),
      },
    ]);
  };

  return <AppNavigator assets={assets} addAsset={addAsset} />;
};

export default App;
