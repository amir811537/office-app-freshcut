import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { Colors } from '../constants/colors'; // adjust path if needed

type ButtonType = 'primary' | 'secondary';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode; // <-- added children support
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  disabled = false,
  style,
  textStyle,
  children,
}) => {
  const backgroundColor = disabled
    ? Colors.disabled
    : type === 'primary'
    ? Colors.buttonPrimary
    : Colors.buttonSecondary;

  const textColor = disabled ? Colors.inactive_tint : Colors.white;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={disabled ? undefined : onPress}
      style={[styles.button, { backgroundColor }, style]}
      disabled={disabled}
    >
      {children}
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
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
    flexDirection: 'row', // add this to place icon & text horizontally
    // Optional shadow for iOS
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Optional elevation for Android
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8, // space between icon and text
  },
});
