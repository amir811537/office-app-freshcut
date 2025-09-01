import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomButton from '../../components/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDropdown from '../../components/CustomDropdown';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import WrapperContainer from '../../components/WrapperContainer';
import { Colors } from '../../constants/colors';
import { getAllCustomers } from '../../services/customerService';
import { createSale } from '../../services/salesService';
import { goBack } from '../../utils/navigationRef';
import { useUserStore } from '../../store/userStore';

// 🔹 Types
interface Customer {
  _id: string;
  name: string;
  defaultProductName?: string;
  defaultUOM?: string;
  defaultPrice?: number;
  previousDue?: number; // Add previous due field
  dueLimit?: number; // Add due limit field
  value: string;
  label: string;
}

interface FormValues {
  customer: Customer | null;
  date: Date;
  productName: string;
  uom: string;
  price: string;
  quantity: string;
  paidAmount: string;
  totalPrice: string;
  dueAmount: string;
  previousDue?: string; // Add previous due to form
  dueLimit?: string; // Add due limit to form
  notes?: string;
}

const CreateSaleScreen: React.FC = () => {
  const { auth } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [customerOptions, setCustomerOptions] = useState<Customer[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      customer: null,
      productName: '',
      uom: '',
      price: '',
      quantity: '',
      paidAmount: '',
      totalPrice: '',
      dueAmount: '',
      previousDue: '',
      dueLimit: '',
      notes: '',
    },
  });

  const price = watch('price');
  const quantity = watch('quantity');
  const paidAmount = watch('paidAmount');

  // 🔹 Calculate total and due amounts
  useEffect(() => {
    const total = parseFloat(price || '0') * parseFloat(quantity || '0');
    const due = total - parseFloat(paidAmount || '0');
    setValue('totalPrice', total.toFixed(2));
    setValue('dueAmount', due < 0 ? '0' : due.toFixed(2));
  }, [price, quantity, paidAmount, setValue]);

  // 🔹 Fetch customers
  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers({ page: 1, limit: 200 }, setLoading);
      if (res?.data?.customers?.length > 0) {
        const options: Customer[] = res.data.customers.map((item: any) => ({
          ...item,
          value: item._id,
          label: item.name,
        }));
        setCustomerOptions(options);
      } else {
        setCustomerOptions([]);
      }
    } catch {
      showMessage({
        message: 'কাস্টমার লোড করতে সমস্যা হয়েছে!',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔹 Handle submit
  const onSubmit = async (data: FormValues) => {
    try {
      if (!data.customer) {
        showMessage({
          message: 'কাস্টমার নির্বাচন করুন',
          type: 'danger',
        });
        return;
      }

      if (!auth?.user?._id) {
        showMessage({
          message: 'ইউজার তথ্য পাওয়া যায়নি',
          type: 'danger',
        });
        return;
      }

      const payload = {
        customerId: data.customer._id,
        employeeId: auth.user._id,
        productName: data.productName,
        uom: data.uom,
        quantity: +data.quantity,
        price: +data.price,
        paidAmount: +data.paidAmount,
        notes: data.notes || '',
      };

      const result = await createSale(payload, setLoading);
      console.log('result ', JSON.stringify(result, null, 2));

      if (result?.statusCode == 201) {
        showMessage({
          message: result?.message || 'সফলভাবে বিক্রয় তৈরি হয়েছে!',
          type: 'success',
        });
        goBack();
      } else {
        showMessage({
          message: result?.message || 'বিক্রয় তৈরি করতে ব্যর্থ হয়েছে!',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'বিক্রয় তৈরি করতে ব্যর্থ হয়েছে!',
        type: 'danger',
      });
    }
  };

  // 🔹 Handle customer selection
  const onCustomerSelect = (selected: Customer) => {
    setValue('customer', selected, { shouldValidate: true });
    setValue('productName', selected.defaultProductName || '');
    setValue('uom', selected.defaultUOM || '');
    setValue('price', selected.defaultPrice?.toString() || '');
    setValue('previousDue', selected.previousDue?.toString() || '0');
    setValue('dueLimit', selected.dueLimit?.toString() || '0');
  };

  // 🔹 Disable submit if required fields are missing
  const isSubmitDisabled =
    !watch('customer') ||
    !watch('price') ||
    !watch('quantity') ||
    !watch('paidAmount');

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="নতুন বিক্রয় তৈরি করুন"
        leftIconName="arrow-back"
        onLeftPress={goBack}
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
        {/* Customer */}
        <CustomDropdown
          label="কাস্টমার"
          name="customer"
          control={control}
          items={customerOptions}
          rules={{ required: 'কাস্টমার নির্বাচন করুন' }}
          error={errors.customer as any}
          enableSearch
          onSelected={onCustomerSelect}
        />

        {/* Date */}
        <CustomDatePicker
          label="তারিখ"
          name="date"
          control={control}
          rules={{ required: 'তারিখ নির্বাচন করুন' }}
          errorStyle={{ color: Colors.error }}
        />

        {/* Product & UOM */}
        <CustomInput
          label="পণ্যের নাম"
          name="productName"
          control={control}
          disabled
          error={errors.productName}
        />
        <CustomInput
          label="একক (UOM)"
          name="uom"
          control={control}
          disabled
          error={errors.uom}
        />

        {/* Price & Quantity */}
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

        {/* Paid Amount */}
        <CustomInput
          label="প্রদত্ত টাকা"
          control={control}
          name="paidAmount"
          keyboardType="numeric"
          rules={{
            required: 'প্রদত্ত টাকা আবশ্যক',
            validate: val => {
              const prevDue = parseFloat(watch('previousDue') || '0');
              const total = parseFloat(watch('totalPrice') || '0');
              const paid = parseFloat(val || '0');

              if (prevDue === 0 && paid > total) {
                return 'আগের বাকি নেই, প্রদত্ত টাকা মোট দামের চেয়ে বেশি হতে পারবে না';
              }
              return true;
            },
          }}
          error={errors.paidAmount}
        />

        {/* Total & Due */}
        <CustomInput
          label="মোট দাম"
          control={control}
          name="totalPrice"
          disabled
        />
        <CustomInput
          label="বাকি টাকা"
          control={control}
          name="dueAmount"
          disabled
        />

        {/* Notes */}
        <CustomInput
          label="নোট"
          control={control}
          name="notes"
          multiline
          placeholder="অতিরিক্ত নোট লিখুন"
        />

        {/* Customer Due Information */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="আগের বাকি"
              control={control}
              name="previousDue"
              disabled
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="বাকি সীমা"
              control={control}
              name="dueLimit"
              disabled
            />
          </View>
        </View>

        {/* Submit */}
        <CustomButton
          loading={loading}
          disabled={isSubmitDisabled}
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
