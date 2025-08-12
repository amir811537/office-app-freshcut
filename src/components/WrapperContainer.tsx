import React from 'react';
import { StatusBar, StyleSheet, ViewStyle, Platform } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

interface WrapperContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  statusBarStyle?: 'dark-content' | 'light-content' | 'default';
  statusBarBackgroundColor?: string;
}

const WrapperContainer: React.FC<WrapperContainerProps> = React.memo(
  ({
    children,
    style,
    statusBarStyle = 'dark-content',
    statusBarBackgroundColor = '#fff',
    ...safeAreaProps
  }) => {
    return (
      <SafeAreaView
        style={[
          styles.container,
          style,
          { backgroundColor: Colors.background },
        ]}
        {...safeAreaProps}
      >
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={
            Platform.OS === 'android' ? statusBarBackgroundColor : undefined
          }
          translucent={false}
        />
        {children}
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WrapperContainer;
