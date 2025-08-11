import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Colors } from '../constants/colors';

interface CustomInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: object;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  error?: FieldError | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  label,
  rules,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  error,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, inputStyle, error ? styles.inputError : null]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProps}
          />
        )}
      />

      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error.message || 'This field is required'}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: Colors.text,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.error,
  },
});
