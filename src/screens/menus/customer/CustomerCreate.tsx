import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';

import CustomButton from '../../../components/CustomButton';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import WrapperContainer from '../../../components/WrapperContainer';
import { goBack } from '../../../utils/navigationRef';
import { Colors } from '../../../constants/colors';


// Form type
type CustomerForm = {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  customerType: string;
  defaultProductName: string;
  defaultUOM: string;
  defaultPrice: string;
  previousDue?: string;
  dueLimit: string;
  isActive: boolean;
};

const CustomerCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      customerType: 'Regular',
      defaultProductName: 'Boiler',
      defaultUOM: 'kg',
      defaultPrice: '',
      previousDue: '',
      dueLimit: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: CustomerForm) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        defaultPrice: Number(data.defaultPrice) || 0,
        previousDue: Number(data.previousDue) || 0,
        dueLimit: Number(data.dueLimit),
      };

      const res = '';

      if (res?.status === 201) {
        showMessage({
          message: 'কাস্টমার সফলভাবে সংরক্ষণ করা হয়েছে ✅',
          type: 'success',
          icon: 'success',
          duration: 2000,
          floating: true,
          onHide: () => goBack(),
        });
      } else {
        showMessage({
          message: res?.message || 'কাস্টমার সংরক্ষণ ব্যর্থ ❌',
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (error: any) {
      showMessage({
        message: error?.message || 'কাস্টমার সংরক্ষণ ব্যর্থ ❌',
        type: 'danger',
        icon: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="নতুন কাস্টমার তৈরি করুন"
        leftIconName="arrow-back"
        onLeftPress={() => goBack()}
      />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraHeight={Platform.OS === 'ios' ? 150 : 200}
        extraScrollHeight={Platform.OS === 'ios' ? 120 : 150}
        enableAutomaticScroll
        showsVerticalScrollIndicator={false}
      >
        {/* Name */}
        <CustomInput
          label="নাম"
          control={control}
          name="name"
          placeholder="কাস্টমারের নাম লিখুন"
          rules={{ required: 'নাম আবশ্যক' }}
          error={errors.name}
        />

        {/* Email */}
        <CustomInput
          label="ইমেল"
          control={control}
          name="email"
          placeholder="ইমেল লিখুন (ঐচ্ছিক)"
          keyboardType="email-address"
          error={errors.email}
        />

        {/* Phone */}
        <CustomInput
          label="ফোন"
          control={control}
          name="phone"
          placeholder="ফোন নাম্বার লিখুন"
          keyboardType="phone-pad"
          rules={{ required: 'ফোন নাম্বার আবশ্যক' }}
          error={errors.phone}
        />

        {/* Address */}
        <CustomInput
          label="ঠিকানা"
          control={control}
          name="address"
          placeholder="ঠিকানা লিখুন (ঐচ্ছিক)"
          multiline
          error={errors.address}
        />

        {/* Customer Type */}
        <CustomDropdown
          label="কাস্টমার টাইপ"
          name="customerType"
          control={control}
          items={[
            { label: 'Regular', value: 'Regular' },
            { label: 'One-time', value: 'One-time' },
          ]}
          rules={{ required: 'কাস্টমার টাইপ আবশ্যক' }}
          error={errors.customerType}
        />

        {/* Default Product Name */}
        <CustomInput
          label="ডিফল্ট পণ্য নাম"
          control={control}
          name="defaultProductName"
          placeholder="যেমন: Boiler"
          error={errors.defaultProductName}
        />

        {/* Default UOM */}
        <CustomInput
          label="ডিফল্ট একক (UOM)"
          control={control}
          name="defaultUOM"
          placeholder="যেমন: kg"
          error={errors.defaultUOM}
        />

        {/* Default Price */}
        <CustomInput
          label="ডিফল্ট দাম"
          control={control}
          name="defaultPrice"
          keyboardType="numeric"
          placeholder="ডিফল্ট দাম লিখুন"
          error={errors.defaultPrice}
        />

        {/* Previous Due */}
        <CustomInput
          label="পূর্বের বকেয়া"
          control={control}
          name="previousDue"
          keyboardType="numeric"
          placeholder="যদি থাকে"
          error={errors.previousDue}
        />

        {/* Due Limit */}
        <CustomInput
          label="বকেয়ার সীমা"
          control={control}
          name="dueLimit"
          keyboardType="numeric"
          placeholder="বকেয়ার সর্বোচ্চ সীমা লিখুন"
          rules={{ required: 'বকেয়ার সীমা আবশ্যক' }}
          error={errors.dueLimit}
        />

        {/* Submit Button */}
        <CustomButton
          loading={loading}
          title="সাবমিট করুন"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />

        <View style={{ height: 100 }} />
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default CustomerCreate;

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, padding: 16 },
  submitButton: { marginTop: 30, borderRadius: 10, paddingVertical: 16 },
});
