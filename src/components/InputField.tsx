import React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';

interface InputFieldProps {
  placeholder: string;  
  
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  style,
}) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default InputField;
