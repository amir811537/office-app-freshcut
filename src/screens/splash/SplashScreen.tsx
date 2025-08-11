import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { resetAndNavigate } from '../../utils/navigationRef';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetAndNavigate('BottomTab');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
