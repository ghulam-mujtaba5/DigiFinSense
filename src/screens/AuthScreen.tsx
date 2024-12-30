// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { supabase } from '../services/supabaseClient';

// const AuthScreen = (): React.JSX.Element => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true);

//   const handleAuth = async () => {
//     if (isLogin) {
//       // Login user
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) {
//         Alert.alert('Error', error.message);
//       } else {
//         Alert.alert('Success', 'Logged in successfully!');
//       }
//     } else {
//       // Signup user
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) {
//         Alert.alert('Error', error.message);
//       } else {
//         Alert.alert('Success', 'Signup successful! Please check your email.');
//       }
//     }
//   };

//   const handleOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider });
//     if (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleAuth}>
//         <Text style={styles.buttonText}>
//           {isLogin ? 'Login' : 'Signup'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => setIsLogin(!isLogin)}
//         style={styles.linkButton}>
//         <Text style={styles.linkText}>
//           {isLogin ? 'Don’t have an account? Signup' : 'Already have an account? Login'}
//         </Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>Or sign in with</Text>
//       <View style={styles.oauthContainer}>
//         <TouchableOpacity
//           style={[styles.oauthButton, { backgroundColor: '#4285F4' }]}
//           onPress={() => handleOAuth('google')}>
//           <Text style={styles.oauthText}>Google</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.oauthButton, { backgroundColor: '#1877F2' }]}
//           onPress={() => handleOAuth('facebook')}>
//           <Text style={styles.oauthText}>Facebook</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.oauthButton, { backgroundColor: '#000000' }]}
//           onPress={() => handleOAuth('apple')}>
//           <Text style={styles.oauthText}>Apple</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007BFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   linkButton: {
//     marginTop: 10,
//   },
//   linkText: {
//     color: '#007BFF',
//     fontSize: 14,
//   },
//   orText: {
//     fontSize: 16,
//     marginTop: 20,
//     color: '#333',
//   },
//   oauthContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   oauthButton: {
//     flex: 1,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//     borderRadius: 8,
//   },
//   oauthText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default AuthScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { supabase } from '../services/supabaseClient';

const AuthScreen = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Login user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Success', 'Logged in successfully!');
      } else {
        // Signup user
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert('Success', 'Signup successful! Please check your email.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to sign in with OAuth.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Signup'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsLogin(!isLogin)}
        style={styles.linkButton}>
        <Text style={styles.linkText}>
          {isLogin ? 'Don’t have an account? Signup' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>
      <View style={styles.oauthContainer}>
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#4285F4' }]}
          onPress={() => handleOAuth('google')}>
          <Text style={styles.oauthText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#1877F2' }]}
          onPress={() => handleOAuth('facebook')}>
          <Text style={styles.oauthText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.oauthButton, { backgroundColor: '#000000' }]}
          onPress={() => handleOAuth('apple')}>
          <Text style={styles.oauthText}>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
  orText: {
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  oauthContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  oauthButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  oauthText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AuthScreen;