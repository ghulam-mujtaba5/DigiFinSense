import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { Asset } from '../../App';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddAssetScreen from '../screens/AddAssetScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  assets: Asset[];
  addAsset: (newAsset: Omit<Asset, 'id' | 'change' | 'icon'>) => void;
};

const AppNavigator = ({ assets, addAsset }: AppNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard">
          {props => <DashboardScreen {...props} assets={assets} />}
        </Stack.Screen>
        <Stack.Screen name="AddAsset">
          {props => <AddAssetScreen {...props} addAsset={addAsset} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
