import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import * as TokenModule from './tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  scheme: Exclude<ColorSchemeName, 'no-preference'> | 'light' | 'dark';
  tokens: TokenModule.Tokens;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ initialMode?: ThemeMode; children: React.ReactNode }> = ({ initialMode = 'system', children }) => {
  const osScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const hydrated = useRef(false);

  // Lazy require AsyncStorage to avoid hard dependency
  const getStorage = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require('@react-native-async-storage/async-storage');
      return mod?.default || mod;
    } catch {
      return undefined;
    }
  };

  // Hydrate persisted mode
  useEffect(() => {
    const AsyncStorage = getStorage();
    if (!AsyncStorage) return;
    let cancelled = false;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('theme:mode');
        if (!cancelled && (stored === 'light' || stored === 'dark' || stored === 'system')) {
          setMode(stored);
        }
      } catch {
        // ignore
      } finally {
        hydrated.current = true;
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change (skip first run until hydration attempt)
  useEffect(() => {
    const AsyncStorage = getStorage();
    if (!AsyncStorage) return;
    if (!hydrated.current) return;
    (async () => {
      try {
        await AsyncStorage.setItem('theme:mode', mode);
      } catch {
        // ignore
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const effectiveScheme: 'light' | 'dark' = useMemo(() => {
    if (mode === 'system') {
      return osScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  }, [mode, osScheme]);

  const tokens = useMemo(() => TokenModule.makeTokens(effectiveScheme), [effectiveScheme]);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    setMode,
    scheme: effectiveScheme,
    tokens,
  }), [mode, effectiveScheme, tokens]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
