import React from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';

interface WrapperContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const WrapperContainer: React.FC<WrapperContainerProps> = ({
  children,
  style,
  ...safeAreaProps
}) => {
  return (
    <SafeAreaView
      style={[styles.container, style, { backgroundColor: Colors.background }]}
      {...safeAreaProps}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(WrapperContainer);
