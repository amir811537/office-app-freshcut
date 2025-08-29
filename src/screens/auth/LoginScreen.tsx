import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { IMAGES } from '../../constants/images';
import { navigate } from '../../utils/navigationRef';
import WrapperContainer from '../../components/WrapperContainer';

type LoginForm = {
  email: string;
  password: string;
};

const LoginScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginForm) => {
    console.log('Login Data:', data);
    navigate('BottomTab');
    // 🔥 API call here
  };

  return (
  <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <KeyboardAwareScrollView
      style={styles.keyboardContainer}
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={80}
    >
      {/* Logo & Title */}
      <View style={styles.logoContainer}>
        <Image source={IMAGES.logo} style={styles.logo} />
        <Text style={styles.title}>স্বাগতম 👋</Text>
        <Text style={styles.subtitle}>আপনার অ্যাকাউন্টে লগইন করুন</Text>
      </View>

      {/* Email */}
      <CustomInput
        label="ইমেইল"
        placeholder="আপনার ইমেইল লিখুন"
        control={control}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        rules={{
          required: 'ইমেইল আবশ্যক',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'সঠিক ইমেইল দিন',
          },
        }}
        error={errors.email}
        leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.lightText} />}
      />

      {/* Password */}
      <CustomInput
        label="পাসওয়ার্ড"
        placeholder="আপনার পাসওয়ার্ড লিখুন"
        control={control}
        name="password"
        secureTextEntry={!showPassword}
        rules={{
          required: 'পাসওয়ার্ড আবশ্যক',
          minLength: {
            value: 4,
            message: 'পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে',
          },
        }}
        error={errors.password}
        leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.lightText} />}
        rightIcon={
          <Ionicons
            name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={Colors.lightText}
          />
        }
        onRightIconPress={() => setShowPassword(!showPassword)}
      />

      {/* Login Button */}
      <CustomButton
        title="লগইন করুন"
        onPress={handleSubmit(onSubmit)}
        style={styles.loginButton}
      />

      {/* Register */}
      <View style={styles.registerWrapper}>
        <Text style={styles.registerText}>একাউন্ট নেই?</Text>
        <TouchableOpacity onPress={() => navigate('RegisterScreen')}>
          <Text style={styles.registerLink}> রেজিস্টার করুন</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  </WrapperContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1, backgroundColor: Colors.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 4,
  },
  loginButton: {
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 16,
  },
  registerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  registerText: {
    fontSize: 14,
    color: Colors.text,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.theme,
  },
});
