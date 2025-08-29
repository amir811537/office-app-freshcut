import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
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
  disabled?: boolean;

  // ✅ New props
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
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
  disabled = false,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <View style={styles.inputWrapper}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            style={styles.iconContainer}
          >
            {leftIcon}
          </TouchableOpacity>
        )}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                inputStyle,
                error ? styles.inputError : null,
                disabled ? styles.inputDisabled : null,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!disabled}
              placeholderTextColor={disabled ? Colors.lightText : undefined}
              {...inputProps}
            />
          )}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.iconContainer}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

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
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: Colors.text,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.black,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.disabled,
    color: Colors.inactive_tint,
  },
  iconContainer: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.error,
  },
});
