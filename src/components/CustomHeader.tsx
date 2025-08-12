import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type CustomHeaderProps = {
  title: string;
  leftIconName?: string; // icon name for left button (e.g., 'arrow-back')
  onLeftPress?: () => void;
  rightIconName?: string; // icon name for right button (e.g., 'settings-outline')
  onRightPress?: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  iconColor?: string;
  iconSize?: number;
  accessibilityLabel?: string;
  testID?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIconName,
  onLeftPress,
  rightIconName,
  onRightPress,
  containerStyle,
  titleStyle,
  iconColor = '#000',
  iconSize = 24,
  accessibilityLabel,
  testID,
}) => {
  return (
    <View
      style={[styles.container, containerStyle]}
      accessibilityRole="header"
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
    >
      {/* Left icon */}
      {leftIconName ? (
        <TouchableOpacity
          onPress={onLeftPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Back"
          activeOpacity={0.7}
        >
          <Icon name={leftIconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      {/* Title */}
      <Text
        style={[styles.title, titleStyle]}
        numberOfLines={1}
        accessible={true}
      >
        {title}
      </Text>

      {/* Right icon */}
      {rightIconName ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Options"
          activeOpacity={0.7}
        >
          <Icon name={rightIconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  iconButton: {
    padding: 8,
  },
  iconPlaceholder: {
    width: 40, // increased width for better balance with padding
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
