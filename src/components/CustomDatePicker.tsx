import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../constants/colors';

interface CustomDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: object;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
  accessibilityLabel?: string;
  testID?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
  label,
  rules,
  containerStyle,
  labelStyle,
  inputStyle,
  textStyle,
  errorStyle,
  minimumDate,
  maximumDate,
  placeholder = 'তারিখ নির্বাচন করুন',
  accessibilityLabel,
  testID,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const displayDate = value
          ? dayjs(value).format('DD MMMM YYYY')
          : placeholder;

        const onChangeDate = (
          event: DateTimePickerEvent,
          selectedDate?: Date,
        ) => {
          if (Platform.OS !== 'ios') setShowPicker(false);
          if (selectedDate) {
            onChange(selectedDate);
          }
        };

        return (
          <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableOpacity
              style={[
                styles.input,
                inputStyle,
                error ? styles.inputError : null,
              ]}
              onPress={() => setShowPicker(true)}
              activeOpacity={0.7}
              accessibilityLabel={accessibilityLabel || label || placeholder}
              accessibilityRole="button"
              testID={testID}
            >
              <Text
                style={[styles.text, textStyle, !value && styles.placeholder]}
              >
                {displayDate}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeDate}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            )}

            {error && (
              <Text style={[styles.errorText, errorStyle]}>
                {error.message || 'This field is required'}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default CustomDatePicker;

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
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
  placeholder: {
    color: Colors.placeholder,
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
