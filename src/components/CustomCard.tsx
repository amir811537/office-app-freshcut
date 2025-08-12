import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

type CustomCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  style,
  testID,
  accessibilityLabel,
}) => {
  return (
    <View
      style={[styles.card, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="summary"
    >
      {children}
    </View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16, // Added padding for content spacing

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Elevation for Android
    elevation: 4,
  },
});
