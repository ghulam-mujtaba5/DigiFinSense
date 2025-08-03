import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  value: number;
  change: number;
  icon: string;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  AddAsset: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
export type AddAssetScreenProps = NativeStackScreenProps<RootStackParamList, 'AddAsset'>;
