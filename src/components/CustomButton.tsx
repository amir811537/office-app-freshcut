import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
  View,
} from 'react-native';
import { Colors } from '../constants/colors'; // adjust path if needed

type ButtonType = 'primary' | 'secondary';

interface CustomButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  accessibilityLabel?: string;
  testID?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
  accessibilityLabel,
  testID,
}) => {
  const backgroundColor =
    disabled || loading
      ? Colors.disabled
      : type === 'primary'
      ? Colors.buttonPrimary
      : Colors.buttonSecondary;

  const textColor = disabled || loading ? Colors.inactive_tint : Colors.white;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled || loading ? undefined : onPress}
      style={[styles.button, { backgroundColor }, style]}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
    >
      <View style={styles.contentContainer}>
        {loading && (
          <ActivityIndicator color={textColor} style={{ marginRight: 8 }} />
        )}
        {children}
        {title && (
          <Text
            style={[styles.text, { color: textColor }, textStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
