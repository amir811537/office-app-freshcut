import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';

interface CustomDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  rules?: object;
  containerStyle?: object;
  labelStyle?: object;
  errorStyle?: object;
  minimumDate?: Date;
  maximumDate?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  control,
  label,
  rules,
  containerStyle,
  labelStyle,
  errorStyle,
  minimumDate,
  maximumDate,
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
          : 'তারিখ নির্বাচন করুন';

        const onChangeDate = (
          event: DateTimePickerEvent,
          selectedDate?: Date,
        ) => {
          setShowPicker(Platform.OS === 'ios');
          if (selectedDate) {
            onChange(selectedDate);
          }
        };

        return (
          <View style={[styles.container, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <TouchableOpacity
              style={[styles.input, error ? styles.inputError : null]}
              onPress={() => setShowPicker(true)}
            >
              <Text style={[styles.text, !value && styles.placeholder]}>
                {displayDate}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
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
