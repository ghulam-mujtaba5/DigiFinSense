// // import React from 'react';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import SignupScreen from '../screens/SignupScreen';
// // import LoginScreen from '../screens/LoginScreen';
// // import DashboardScreen from '../screens/DashboardScreen';

// // const Stack = createNativeStackNavigator();

// // const AppNavigator = () => {
// //   return (
// //     <Stack.Navigator initialRouteName="Signup">
// //       <Stack.Screen name="Signup" component={SignupScreen} />
// //       <Stack.Screen name="Login" component={LoginScreen} />
// //       <Stack.Screen name="Dashboard" component={DashboardScreen} />
// //     </Stack.Navigator>
// //   );
// // };

// // export default AppNavigator;

// // src/navigation/AppNavigator.tsx

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import DashboardScreen from '../screens/DashboardScreen';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Signup" component={SignupScreen} />
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
