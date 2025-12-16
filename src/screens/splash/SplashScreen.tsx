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
import { useUserStore } from '../../store/userStore';
import WrapperContainer from '../../components/WrapperContainer';

const SplashScreen = () => {
  const { auth } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (auth?.accessToken) {
        resetAndNavigate('BottomTab');
      } else {
        resetAndNavigate('LoginScreen');
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [auth?.accessToken]);

  return (
    <WrapperContainer style={styles.wrapper}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* Decorative Top Shape */}
      <View style={styles.topCircle} />

      <View style={styles.container}>
        <Image
          source={IMAGES.logo}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          Fresh<Text style={styles.appNameHighlight}>Cut</Text>
        </Text>

        <Text style={styles.tagline}>
          Fresh • Halal • Fast Delivery
        </Text>

        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.loader}
        />
      </View>

      {/* Bottom Accent */}
      <View style={styles.bottomBar} />
    </WrapperContainer>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },

  appNameHighlight: {
    color: Colors.primary,
  },

  tagline: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textSecondary,
    letterSpacing: 0.6,
  },

  loader: {
    marginTop: 30,
  },

  /* Decorative elements */
  topCircle: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primaryLight,
    opacity: 0.9,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 6,
    backgroundColor: Colors.primary,
  },
});
