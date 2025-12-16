import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../../constants/colors';
import { IMAGES } from '../../constants/images';
import WrapperContainer from '../../components/WrapperContainer';
import { navigate } from '../../utils/navigationRef';
import { loginUser } from '../../services/loginService';
import { showMessage } from 'react-native-flash-message';
import { useUserStore } from '../../store/userStore';

type LoginForm = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { setAuth } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    if (loading) return;

    const res = await loginUser(data, setLoading);

    if (res?.statusCode === 200) {
      setAuth(res.data);

      showMessage({
        message: 'Login successful 🎉',
        description: 'Welcome back! You can continue.',
        type: 'success',
        duration: 1000,
        onHide: () => navigate('BottomTab'),
      });
    } else {
      showMessage({
        message: 'Login failed',
        description: res?.message || 'Invalid email or password',
        type: 'danger',
        duration: 2500,
      });
    }
  };

  return (
    <WrapperContainer style={styles.wrapper}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={IMAGES.logo} style={styles.logo} />
          <Text style={styles.appName}>
            Fresh<Text style={styles.brandAccent}>Cut</Text>
          </Text>
          <Text style={styles.subtitle}>
            Fresh • Halal • Fast Delivery
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={Colors.textSecondary}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textLight}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={Colors.textSecondary}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.textLight}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>
              {errors.password.message}
            </Text>
          )}

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Register */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don’t have an account?
            </Text>
            <TouchableOpacity onPress={() => navigate('RegisterScreen')}>
              <Text style={styles.register}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  /* Header */
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  brandAccent: {
    color: Colors.primary,
  },

  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  /* Card */
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: Colors.textSecondary,
    fontWeight: '600',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 6,
  },

  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },

  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },

  footerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  register: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
