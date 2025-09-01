import React, { useState, useEffect } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

interface DropdownItem {
  value: number | string;
  label: string;
  [key: string]: any;
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
  onSelected?: (item: any) => void;
  disabled?: boolean;
  // New props for search functionality
  onSearch?: (searchText: string) => void;
  searchPlaceholder?: string;
  enableSearch?: boolean;
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
  disabled = false,
  onSearch,
  searchPlaceholder = 'Search...',
  enableSearch = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>(items);

  useEffect(() => {
    if (enableSearch && onSearch) {
      onSearch(searchText);
    } else {
      const filtered = items.filter(item =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [searchText, items, enableSearch, onSearch]);

  useEffect(() => {
    if (!visible) {
      setSearchText('');
      if (!onSearch) setFilteredItems(items);
    }
  }, [visible, items, onSearch]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          // Handle both object and primitive values
          const selectedItem =
            value && typeof value === 'object' && 'label' in value
              ? value
              : items.find(item => item.value === value);

          const handleSelect = (item: DropdownItem) => {
            onChange(item); // Pass the entire item object
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
                  disabled && styles.disabledDropdown,
                ]}
                onPress={() => !disabled && setVisible(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    dropdownTextStyle,
                    disabled && styles.disabledText,
                  ]}
                >
                  {selectedItem?.label ?? placeholder}
                </Text>
                <Text style={[styles.arrow, disabled && styles.disabledText]}>
                  ▼
                </Text>
              </TouchableOpacity>

              {!disabled && (
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
                      {enableSearch && (
                        <View style={styles.searchContainer}>
                          <TextInput
                            style={styles.searchInput}
                            placeholder={searchPlaceholder}
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus={true}
                          />
                        </View>
                      )}
                      <FlatList
                        data={onSearch ? items : filteredItems}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={[
                              styles.item,
                              selectedItem?.value === item.value &&
                                styles.selectedItem,
                            ]}
                            onPress={() => handleSelect(item)}
                          >
                            <Text
                              style={[
                                styles.itemText,
                                selectedItem?.value === item.value &&
                                  styles.selectedItemText,
                              ]}
                            >
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                          <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                              No options found
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              )}
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
    height: 46,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  disabledDropdown: {
    backgroundColor: Colors.disabled,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.black,
  },
  disabledText: {
    color: Colors.inactive_tint,
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
    fontSize: 14,
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: width * 0.85, // 85% of screen width
    height: height * 0.6, // max 60% of screen height
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surfaceLight,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  selectedItem: {
    backgroundColor: Colors.theme + '15', // light overlay for selected
  },
  itemText: {
    fontSize: 16,
    color: Colors.black,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: Colors.theme,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
  },
});

export default CustomDropdown;
