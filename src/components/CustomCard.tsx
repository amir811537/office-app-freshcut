import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type CustomCardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const CustomCard: React.FC<CustomCardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,

    marginVertical: 8,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Elevation for Android
    elevation: 4,
  },
});
