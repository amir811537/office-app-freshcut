import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';

import CustomButton from '../../components/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import WrapperContainer from '../../components/WrapperContainer';
import { Colors } from '../../constants/colors';
import { goBack } from '../../utils/navigationRef';
import { createReport, updateReport } from '../../services/reportService';
import { CreateReportPayload, CustomerReportTs } from '../../types/reportTypes';

type FormData = {
  naam: string;
  tarikh: Date;
  thikana: string;
  phone: string;
  boilerSonkha: string;
  kg: string;
  rate: string;
  ajekrBikri: string;
  ajkerJoma: string;
  bakiIzaAche: string;
};

interface Props {
  route?: {
    params?: {
      reportData?: CustomerReportTs;
    };
  };
}

const CreateBikroyReport: React.FC<Props> = ({ route }) => {
  const reportData = route?.params?.reportData; // undefined if creating new
  const isEditMode = !!reportData?._id;

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      naam: '',
      tarikh: new Date(),
      thikana: '',
      phone: '',
      boilerSonkha: '',
      kg: '',
      rate: '',
      ajekrBikri: '',
      ajkerJoma: '',
      bakiIzaAche: '',
    },
  });

  // Prefill fields in edit mode
  useEffect(() => {
    if (isEditMode) {
      reset({
        naam: reportData!.name,
        tarikh: new Date(reportData!.date),
        thikana: reportData!.address,
        phone: reportData!.phone,
        boilerSonkha: reportData!.boilerQtypes,
        kg: reportData!.boilerQtykg,
        rate: reportData!.boilerRate,
        ajekrBikri: reportData!.todaySell.toString(),
        ajkerJoma: reportData!.payment.toString(),
        bakiIzaAche: reportData!.due.toString(),
      });
    }
  }, [isEditMode, reportData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (isEditMode) {
        const payload = {
          payment: Number(data.ajkerJoma),
          due: Number(data.bakiIzaAche),
          boilerRate: data.rate,
        };

        const res = await updateReport(reportData!._id, payload);

        if (res?.message === 'User updated successfully') {
          showMessage({
            message: 'রিপোর্ট সফলভাবে আপডেট করা হয়েছে ✅',
            type: 'success',
            icon: 'success',
            duration: 2000,
            floating: true,
            onHide: () => goBack(),
          });
        } else {
          showMessage({
            message: 'আপডেট করা যায়নি ❌',
            type: 'danger',
            icon: 'danger',
            duration: 2000,
            floating: true,
          });
        }
      } else {
        const payload: CreateReportPayload = {
          name: data.naam,
          date: data.tarikh.toISOString().split('T')[0],
          address: data.thikana,
          phone: data.phone,
          boilerRate: data.rate,
          todaySell: Number(data.ajekrBikri),
          payment: Number(data.ajkerJoma),
          due: Number(data.bakiIzaAche),
          boilerQtykg: data.kg,
          boilerQtypes: data.boilerSonkha,
        };

        await createReport(payload);

        showMessage({
          message: 'রিপোর্ট সফলভাবে সংরক্ষণ করা হয়েছে ✅',
          type: 'success',
          icon: 'success',
          duration: 2000,
          floating: true,
          onHide: () => goBack(),
        });
      }
    } catch (error) {
      console.error('Error saving report:', error);
      showMessage({
        message: 'রিপোর্ট সংরক্ষণে সমস্যা হয়েছে ❌',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
        floating: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title={
          isEditMode
            ? 'বিক্রয় রিপোর্ট সম্পাদনা করুন'
            : 'বিক্রয় রিপোর্ট তৈরি করুন'
        }
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
        keyboardDismissMode="interactive"
        keyboardOpeningTime={250}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Disabled fields in edit mode */}
        <CustomInput
          label="নাম"
          control={control}
          name="naam"
          disabled={isEditMode}
          rules={!isEditMode ? { required: 'নাম আবশ্যক' } : undefined}
          error={errors.naam}
        />
        <CustomDatePicker
          label="তারিখ"
          control={control}
          name="tarikh"
          disabled={isEditMode}
          rules={!isEditMode ? { required: 'তারিখ আবশ্যক' } : undefined}
          error={errors.tarikh}
          maximumDate={new Date()}
        />
        <CustomInput
          label="ঠিকানা"
          control={control}
          name="thikana"
          disabled={isEditMode}
          rules={!isEditMode ? { required: 'ঠিকানা আবশ্যক' } : undefined}
          error={errors.thikana}
        />
        <CustomInput
          label="ফোন নম্বর"
          control={control}
          name="phone"
          disabled={isEditMode}
          rules={!isEditMode ? { required: 'ফোন নম্বর আবশ্যক' } : undefined}
          error={errors.phone}
        />
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="বয়লার সংখ্যা"
              control={control}
              name="boilerSonkha"
              disabled={isEditMode}
              rules={
                !isEditMode ? { required: 'বয়লার সংখ্যা আবশ্যক' } : undefined
              }
              error={errors.boilerSonkha}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="কেজি"
              control={control}
              name="kg"
              disabled={isEditMode}
              rules={!isEditMode ? { required: 'কেজি আবশ্যক' } : undefined}
              error={errors.kg}
            />
          </View>
        </View>

        {/* Always editable fields */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="রেট"
              control={control}
              name="rate"
              keyboardType="numeric"
              rules={{ required: 'রেট আবশ্যক' }}
              error={errors.rate}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="আজকের জমা"
              control={control}
              name="ajkerJoma"
              keyboardType="numeric"
              rules={{ required: 'আজকের জমা আবশ্যক' }}
              error={errors.ajkerJoma}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="আজকের বিক্রি"
              control={control}
              name="ajekrBikri"
              keyboardType="numeric"
              rules={
                !isEditMode ? { required: 'আজকের বিক্রি আবশ্যক' } : undefined
              }
              error={errors.ajekrBikri}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="বাকি/ইজ্জা আছে"
              control={control}
              name="bakiIzaAche"
              keyboardType="numeric"
              rules={{ required: 'বাকি/ইজ্জা আবশ্যক' }}
              error={errors.bakiIzaAche}
            />
          </View>
        </View>

        <CustomButton
          loading={loading}
          title={isEditMode ? 'আপডেট করুন' : 'সাবমিট'}
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />

        <View style={styles.bottomSpacer} />
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default CreateBikroyReport;

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { flexGrow: 1, paddingHorizontal: 16, paddingVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  halfInput: { flex: 1 },
  submitButton: { marginTop: 30, borderRadius: 10, paddingVertical: 16 },
  bottomSpacer: { height: 100 },
});
