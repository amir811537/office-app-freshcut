import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useForm, useWatch } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomDatePicker from '../../components/CustomDatePicker';
import WrapperContainer from '../../components/WrapperContainer';
import { Colors } from '../../constants/colors';
import { goBack } from '../../utils/navigationRef';
import { getAllCustomers } from '../../services/customerService';

const CreateSaleScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [customerDDL, setCustomerDDL] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerId: '',
      employeeId: '',
      date: new Date(),
      productName: '',
      uom: '',
      quantity: '',
      price: '',
      paidAmount: '',
      totalPrice: '',
      dueAmount: '',
      notes: '',
    },
  });

  const fetchCustomers = async () => {
    const res = await getAllCustomers({ page: 1, limit: 200 }, setLoading);

    if (res?.data?.customers?.length > 0) {
      console.log(res?.data?.customers);
      // reset({
      //   productName,
      //   uom,
      //   price,

      // })
      let modifyData = res?.data?.customers?.map(item => {
        return {
          ...item,
          value: item?._id,
          label: item?.name,
        };
      });
      setCustomerDDL(modifyData);
    } else {
      setCustomerDDL([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔹 Watch values for calculation
  const price = useWatch({ control, name: 'price' });
  const quantity = useWatch({ control, name: 'quantity' });
  const paidAmount = useWatch({ control, name: 'paidAmount' });

  // 🔹 Auto-calculate total & due
  useEffect(() => {
    const total = (Number(price) || 0) * (Number(quantity) || 0);
    const due = total - (Number(paidAmount) || 0);
    setValue('totalPrice', total.toString());
    setValue('dueAmount', due.toString());
  }, [price, quantity, paidAmount, setValue]);

  const onSubmit = async data => {};

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="নতুন বিক্রয় তৈরি করুন"
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
        {/* 🔹 Customer */}
        <CustomDropdown
          label="কাস্টমার"
          name="customerId"
          control={control}
          onSearch={searchText => {
            console.log(searchText);
            // Call your search API here and update the items prop
          }}
          items={customerDDL}
          rules={{ required: 'কাস্টমার নির্বাচন করুন' }}
          error={errors.customerId}
          enableSearch={true}
        />

        {/* 🔹 Employee */}
        {/* <CustomDropdown
          label="কর্মচারী"
          name="employeeId"
          control={control}
          items={[
            { label: 'এমপ্লয়ি ১', value: 'emp1' },
            { label: 'এমপ্লয়ি ২', value: 'emp2' },
          ]}
          rules={{ required: 'কর্মচারী নির্বাচন করুন' }}
          error={errors.employeeId}
        /> */}

        {/* 🔹 Date */}
        <CustomDatePicker
          label="তারিখ"
          name="date"
          control={control}
          rules={{ required: 'তারিখ নির্বাচন করুন' }}
          errorStyle={{ color: Colors.error }}
        />

        {/* 🔹 Product Name (disabled) */}
        <CustomInput
          label="পণ্যের নাম"
          control={control}
          name="productName"
          disabled
          error={errors.productName}
        />

        {/* 🔹 UOM (disabled) */}
        <CustomInput
          label="একক (UOM)"
          control={control}
          name="uom"
          disabled
          error={errors.uom}
        />

        {/* 🔹 Price & Quantity */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="দাম"
              control={control}
              name="price"
              keyboardType="numeric"
              rules={{ required: 'দাম আবশ্যক' }}
              error={errors.price}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="পরিমাণ"
              control={control}
              name="quantity"
              keyboardType="numeric"
              rules={{ required: 'পরিমাণ আবশ্যক' }}
              error={errors.quantity}
            />
          </View>
        </View>

        {/* 🔹 Paid Amount */}
        <CustomInput
          label="প্রদত্ত টাকা"
          control={control}
          name="paidAmount"
          keyboardType="numeric"
          error={errors.paidAmount}
        />

        {/* 🔹 Total Price (disabled) */}
        <CustomInput
          label="মোট দাম"
          control={control}
          name="totalPrice"
          disabled
        />

        {/* 🔹 Due Amount (disabled) */}
        <CustomInput
          label="বাকি টাকা"
          control={control}
          name="dueAmount"
          disabled
        />

        {/* 🔹 Notes */}
        <CustomInput
          label="নোট"
          control={control}
          name="notes"
          multiline
          placeholder="অতিরিক্ত নোট লিখুন"
        />

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

export default CreateSaleScreen;

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  halfInput: { flex: 1 },
  submitButton: { marginTop: 30, borderRadius: 10, paddingVertical: 16 },
});
