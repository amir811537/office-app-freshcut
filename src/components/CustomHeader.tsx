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
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  iconColor?: string;
  iconSize?: number;
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
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left icon */}
      {leftIconName ? (
        <TouchableOpacity
          onPress={onLeftPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name={leftIconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      {/* Title */}
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {/* Right icon */}
      {rightIconName ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.iconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
    width: 32, // same size as iconButton to keep title centered
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
