import React, { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from '../constants/colors';

interface DropdownItem {
  value: number | string;
  label: string;
  [key: string]: any; // allow extra fields
}

interface CustomDropdownProps {
  name: string;
  control: Control<any>;
  items: DropdownItem[];
  label?: string;
  placeholder?: string;
  rules?: object;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
  dropdownTextStyle?: TextStyle;
  errorStyle?: TextStyle;
  error?: FieldError | undefined;
  onSelected?: (item: DropdownItem) => void; // callback with full object
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  name,
  control,
  items,
  label,
  placeholder = 'Select an option',
  rules,
  containerStyle,
  labelStyle,
  dropdownStyle,
  dropdownTextStyle,
  errorStyle,
  error,
  onSelected,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          const selectedItem =
            typeof value === 'object' && value !== null
              ? value
              : items.find(item => item.value === value);

          const handleSelect = (item: DropdownItem) => {
            onChange(item); // store full object in form state
            setVisible(false);
            onSelected?.(item);
          };

          return (
            <>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  dropdownStyle,
                  error ? styles.inputError : null,
                ]}
                onPress={() => setVisible(true)}
              >
                <Text style={[styles.dropdownText, dropdownTextStyle]}>
                  {selectedItem?.label ?? placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>

              <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setVisible(false)}
                >
                  <View style={styles.modalContent}>
                    <FlatList
                      data={items}
                      keyExtractor={item => item.value.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => handleSelect(item)}
                        >
                          <Text style={styles.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          );
        }}
      />

      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error.message || 'This field is required'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: Colors.text,
  },
  dropdown: {
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.black,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.error,
  },
  arrow: {
    fontSize: 12,
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 8,
    maxHeight: 300,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default CustomDropdown;
