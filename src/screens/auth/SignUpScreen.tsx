import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { goBack, navigate } from '../../utils/navigationRef';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';

type SignUpForm = {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  employeeCode: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen: React.FC = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>({
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      phone: '',
      employeeCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignUpForm) => {
    console.log('SignUp Data:', data);
    // 🔥 API later
  };

  const password = watch('password');

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="নতুন অ্যাকাউন্ট"
        leftIconName="arrow-back"
        onLeftPress={() => goBack()}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={80}
      >
     
        {/* Full Name */}
        <CustomInput
          label="পূর্ণ নাম"
          placeholder="আপনার নাম লিখুন"
          control={control}
          name="fullName"
          rules={{ required: 'পূর্ণ নাম আবশ্যক' }}
          error={errors.fullName}
        />

        {/* Username */}
        <CustomInput
          label="ইউজারনেম"
          placeholder="ইউজারনেম লিখুন"
          control={control}
          name="userName"
          rules={{ required: 'ইউজারনেম আবশ্যক' }}
          error={errors.userName}
        />

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
              message: 'সঠিক ইমেইল লিখুন',
            },
          }}
          error={errors.email}
        />

        {/* Phone */}
        <CustomInput
          label="ফোন"
          placeholder="ফোন নম্বর লিখুন"
          control={control}
          name="phone"
          keyboardType="phone-pad"
          rules={{
            required: 'ফোন নম্বর আবশ্যক',
            minLength: { value: 11, message: 'সঠিক ফোন নম্বর লিখুন' },
          }}
          error={errors.phone}
        />

        {/* Employee Code */}
        <CustomInput
          label="কর্মচারী কোড"
          placeholder="কোড লিখুন"
          control={control}
          name="employeeCode"
          rules={{ required: 'কর্মচারী কোড আবশ্যক' }}
          error={errors.employeeCode}
        />

        {/* Password */}
        <CustomInput
          label="পাসওয়ার্ড"
          placeholder="পাসওয়ার্ড লিখুন"
          control={control}
          name="password"
          secureTextEntry={!showPassword}
          rules={{
            required: 'পাসওয়ার্ড আবশ্যক',
            minLength: { value: 4, message: 'পাসওয়ার্ড কমপক্ষে 4 অক্ষর' },
          }}
          error={errors.password}
          rightIcon={
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.lightText}
            />
          }
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        {/* Confirm Password */}
        <CustomInput
          label="পাসওয়ার্ড নিশ্চিত করুন"
          placeholder="পুনরায় পাসওয়ার্ড লিখুন"
          control={control}
          name="confirmPassword"
          secureTextEntry={!showConfirmPassword}
          rules={{
            required: 'পাসওয়ার্ড নিশ্চিতকরণ আবশ্যক',
            validate: (value) => value === password || 'পাসওয়ার্ড মিলছে না',
          }}
          error={errors.confirmPassword}
          rightIcon={
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.lightText}
            />
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        {/* Sign Up Button */}
        <CustomButton
          title="রেজিস্টার করুন"
          onPress={handleSubmit(onSubmit)}
          style={styles.signupButton}
        />

        {/* Already have account */}
        <View style={styles.loginWrapper}>
          <Text style={styles.loginText}>অ্যাকাউন্ট আছে?</Text>
          <TouchableOpacity onPress={() => navigate('LoginScreen')}>
            <Text style={styles.loginLink}> লগইন করুন</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  signupButton: {
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 16,
  },
  loginWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  loginText: {
    fontSize: 14,
    color: Colors.text,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.theme,
  },
});
