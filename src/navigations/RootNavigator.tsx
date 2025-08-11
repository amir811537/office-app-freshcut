import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { navigationRef } from '../utils/navigationRef';
import MainStack from './MainStack';
const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
