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
    }, 1500);
    return () => clearTimeout(timer);
  }, [auth?.accessToken]);

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />

        <Image source={IMAGES.logo} style={styles.logo} resizeMode="contain" />

        <Text style={styles.appName}>FreshCut</Text>

        <ActivityIndicator
          size="large"
          color={Colors.theme}
          style={styles.loader}
        />
      </View>
    </WrapperContainer>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    color: Colors.theme,
    fontSize: 48,
    fontWeight: '900',
    marginTop: 24,
    letterSpacing: 2,
  },
  loader: {
    marginTop: 30,
  },
});
