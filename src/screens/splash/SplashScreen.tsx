import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { resetAndNavigate } from '../../utils/navigationRef';
import { Colors } from '../../constants/colors';
import { IMAGES } from '../../constants/images';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetAndNavigate('BottomTab');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />

      <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.appName}>FreshCut</Text>

      <ActivityIndicator
        size="large"
        color={Colors.white}
        style={styles.loader}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: '900',
    marginTop: 24,
    letterSpacing: 2,
  },
  loader: {
    marginTop: 30,
  },
});
