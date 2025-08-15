import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DebugSupabaseScreenProps } from '../navigation/types';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '../../source/config/supabase';
import { useTheme } from '../../source/theme/ThemeProvider';
import { Card, Button, ErrorBanner, Skeleton } from '../../source/components/ui';
import type { Tokens } from '../../source/theme/tokens';

const DebugSupabaseScreen = ({ navigation }: DebugSupabaseScreenProps) => {
  const { tokens } = useTheme();
  const styles = React.useMemo(() => makeStyles(tokens), [tokens]);
  const [status, setStatus] = useState<'idle' | 'checking' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const runCheck = async () => {
    setStatus('checking');
    setMessage('Starting checks...');

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setStatus('error');
      setMessage('Missing SUPABASE_URL or SUPABASE_ANON_KEY. Fill them in source/config/.secrets.local.ts');
      return;
    }

    if (!supabase) {
      setStatus('error');
      setMessage('Supabase client not initialized.');
      return;
    }

    try {
      // Query the new 'assets' table created in docs/db/schema.sql
      const { data, error } = await supabase.from('assets').select('*').limit(1);
      if (error) {
        setStatus('error');
        setMessage(`Query error: ${error.message}`);
      } else {
        setStatus('ok');
        setMessage(`OK. Received ${data?.length ?? 0} row(s) from assets.`);
      }
    } catch (e: any) {
      setStatus('error');
      setMessage(e?.message || 'Unknown error');
    }
  };

  useEffect(() => {
    // Auto-run once when screen opens
    runCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} accessibilityLabel="Supabase debug screen">
      <Text style={styles.title}>Supabase Status</Text>

      <Card padded style={styles.cardMargin}>
        <Text style={styles.label}>SUPABASE_URL</Text>
        <Text style={styles.value}>{SUPABASE_URL || '— not set —'}</Text>
        <Text style={[styles.label, styles.labelTop]}>Anon key present</Text>
        <Text style={styles.value}>{SUPABASE_ANON_KEY ? 'Yes' : 'No'}</Text>
      </Card>

      <Card padded style={styles.cardMargin}>
        <Text style={styles.label}>Connection check</Text>
        {status === 'checking' ? (
          <View style={styles.skeletonRow}>
            <Skeleton width="60%" height={16} />
          </View>
        ) : status === 'error' ? (
          <ErrorBanner message={message} />
        ) : (
          <Text style={[styles.value, status === 'ok' ? styles.ok : undefined]}>
            {status.toUpperCase()} — {message}
          </Text>
        )}
      </Card>

      <View style={styles.actions}>
        <Button
          title="Re-run Check"
          variant="primary"
          onPress={runCheck}
          accessibilityLabel="Re-run Supabase connection check"
        />
        <Button
          title="Back"
          variant="secondary"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        />
      </View>
    </ScrollView>
  );
};

const makeStyles = (t: Tokens) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: t.spacing.lg,
      backgroundColor: t.colors.surface,
    },
    title: {
      color: t.colors.textPrimary,
      fontSize: t.typography.lg,
      fontWeight: 'bold',
      marginBottom: t.spacing.md,
    },
    cardMargin: {
      marginBottom: t.spacing.md,
    },
    label: {
      color: t.colors.textSecondary,
      fontSize: t.typography.xs,
      marginTop: t.spacing.xs,
    },
    labelTop: {
      marginTop: t.spacing.sm,
    },
    value: {
      color: t.colors.textPrimary,
      fontSize: t.typography.sm,
    },
    ok: { color: t.colors.success },
    actions: {
      flexDirection: 'row',
      gap: t.spacing.md,
      marginTop: t.spacing.md,
    },
    skeletonRow: {
      marginTop: t.spacing.sm,
    },
  });

export default DebugSupabaseScreen;
