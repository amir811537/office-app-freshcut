import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { goBack } from '../../../utils/navigationRef';

import CustomButton from '../../../components/CustomButton';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomHeader from '../../../components/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import WrapperContainer from '../../../components/WrapperContainer';
import { Colors } from '../../../constants/colors';
import {
  createCustomer,
  updateCustomer,
  getCustomerById,
} from '../../../services/customerService';
import { useRoute } from '@react-navigation/native';

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
  const route = useRoute<any>();
  const customerId = route?.params?.customer?._id;

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

  // Fetch customer data if editing
  useEffect(() => {
    if (customerId) {
      const fetchCustomer = async () => {
        setLoading(true);
        const res = await getCustomerById(customerId, setLoading);
        setLoading(false);

        if (res?.success && res.data) {
          const customer = res.data;
          reset({
            name: customer.name,
            email: customer.email || '',
            phone: customer.phone,
            address: customer.address || '',
            customerType: customer.customerType || 'Regular',
            defaultProductName: customer.defaultProductName || 'Boiler',
            defaultUOM: customer.defaultUOM || 'kg',
            defaultPrice: customer.defaultPrice?.toString() || '',
            previousDue: customer.previousDue?.toString() || '',
            dueLimit: customer.dueLimit?.toString() || '',
            isActive: customer.isActive ?? true,
          });
        } else {
          showMessage({
            message: res?.message || 'কাস্টমার তথ্য আনার সময় সমস্যা হয়েছে ❌',
            type: 'danger',
            icon: 'danger',
            duration: 2000,
            floating: true,
          });
        }
      };
      fetchCustomer();
    }
  }, [customerId]);

  // Submit handler
  const onSubmit = async (data: CustomerForm) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      customerType: data.customerType,
      defaultProductName: data.defaultProductName,
      defaultUOM: data.defaultUOM,
      defaultPrice: +data.defaultPrice || 0,
      previousDue: +data.previousDue || 0,
      dueLimit: +data.dueLimit || 0,
      isActive: data.isActive,
    };

    setLoading(true);
    const res = customerId
      ? await updateCustomer(customerId, payload, setLoading)
      : await createCustomer(payload, setLoading);
    setLoading(false);

    if (res?.statusCode === 200 || res?.statusCode === 201) {
      showMessage({
        message:
          res?.message ||
          (customerId
            ? 'কাস্টমার সফলভাবে আপডেট হয়েছে ✅'
            : 'কাস্টমার সফলভাবে সংরক্ষণ করা হয়েছে ✅'),
        type: 'success',
        icon: 'success',
        duration: 1000,
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
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title={customerId ? 'কাস্টমার আপডেট করুন' : 'নতুন কাস্টমার তৈরি করুন'}
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
        <CustomInput
          label="নাম"
          control={control}
          name="name"
          placeholder="কাস্টমারের নাম লিখুন"
          rules={{ required: 'নাম আবশ্যক' }}
          error={errors.name}
        />

        <CustomInput
          label="ইমেল"
          control={control}
          name="email"
          placeholder="ইমেল লিখুন"
          keyboardType="email-address"
          error={errors.email}
        />

        <CustomInput
          label="ফোন"
          control={control}
          name="phone"
          placeholder="ফোন নাম্বার লিখুন"
          keyboardType="phone-pad"
          rules={{ required: 'ফোন নাম্বার আবশ্যক' }}
          error={errors.phone}
        />

        <CustomInput
          label="ঠিকানা"
          control={control}
          name="address"
          placeholder="ঠিকানা লিখুন"
          multiline
          error={errors.address}
        />

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

        <CustomInput
          label="ডিফল্ট পণ্য নাম"
          control={control}
          name="defaultProductName"
          placeholder="যেমন: Boiler"
          rules={{ required: 'ডিফল্ট পণ্য নাম আবশ্যক' }}
          error={errors.defaultProductName}
        />

        <CustomInput
          label="ডিফল্ট একক (UOM)"
          control={control}
          name="defaultUOM"
          placeholder="যেমন: kg"
          rules={{ required: 'ডিফল্ট একক আবশ্যক' }}
          error={errors.defaultUOM}
        />

        <CustomInput
          label="ডিফল্ট দাম"
          control={control}
          name="defaultPrice"
          keyboardType="numeric"
          placeholder="ডিফল্ট দাম লিখুন"
          rules={{ required: 'ডিফল্ট দাম আবশ্যক' }}
          error={errors.defaultPrice}
        />

        <CustomInput
          label="পূর্বের বকেয়া"
          control={control}
          name="previousDue"
          keyboardType="numeric"
          placeholder="যদি থাকে"
          error={errors.previousDue}
        />

        <CustomInput
          label="বকেয়ার সীমা"
          control={control}
          name="dueLimit"
          keyboardType="numeric"
          placeholder="বকেয়ার সর্বোচ্চ সীমা লিখুন"
          rules={{ required: 'বকেয়ার সীমা আবশ্যক' }}
          error={errors.dueLimit}
        />

        <CustomButton
          loading={loading}
          disabled={loading}
          title={customerId ? 'আপডেট করুন' : 'সাবমিট করুন'}
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
