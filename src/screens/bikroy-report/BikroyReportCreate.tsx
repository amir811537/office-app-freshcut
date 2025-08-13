import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import WrapperContainer from '../../components/WrapperContainer';
import { Colors } from '../../constants/colors';
import { goBack } from '../../utils/navigationRef';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type FormData = {
  occupation: number;
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

const CreateBikroyReport = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      occupation: undefined,
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

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', JSON.stringify(data, null, 2));
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="বিক্রয় রিপোর্ট তৈরি করুন"
        leftIconName="arrow-back"
        onLeftPress={() => goBack()}
      />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'ios' ? 150 : 200}
        extraScrollHeight={Platform.OS === 'ios' ? 120 : 150}
        enableAutomaticScroll={true}
        keyboardDismissMode="interactive"
        keyboardOpeningTime={250}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomInput
          label="নাম"
          placeholder="নাম লিখুন"
          control={control}
          name="naam"
          onChangeText={e => {
            setValue('naam', e);
            console.log(e);
          }}
          rules={{ required: 'নাম আবশ্যক' }}
          error={errors.naam}
        />

        <CustomDatePicker
          label="তারিখ"
          control={control}
          name="tarikh"
          rules={{ required: 'তারিখ নির্বাচন করুন' }}
          maximumDate={new Date()}
        />

        <CustomInput
          label="ঠিকানা"
          placeholder="ঠিকানা লিখুন"
          control={control}
          name="thikana"
          rules={{ required: 'ঠিকানা আবশ্যক' }}
          error={errors.thikana}
        />

        <CustomInput
          label="ফোন নম্বর"
          placeholder="ফোন নম্বর লিখুন"
          keyboardType="phone-pad"
          control={control}
          name="phone"
          rules={{
            required: 'ফোন নম্বর আবশ্যক',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: 'সঠিক ফোন নম্বর লিখুন',
            },
          }}
          error={errors.phone}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="বয়লার সংখ্যা"
              placeholder="বয়লার সংখ্যা লিখুন"
              keyboardType="numeric"
              control={control}
              name="boilerSonkha"
              rules={{ required: 'বয়লার সংখ্যা আবশ্যক' }}
              error={errors.boilerSonkha}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="কেজি"
              placeholder="কেজি লিখুন"
              keyboardType="numeric"
              control={control}
              name="kg"
              rules={{ required: 'কেজি আবশ্যক' }}
              error={errors.kg}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="রেট"
              placeholder="রেট লিখুন"
              keyboardType="numeric"
              control={control}
              name="rate"
              rules={{ required: 'রেট আবশ্যক' }}
              error={errors.rate}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="আজকের জমা"
              placeholder="আজকের জমা লিখুন"
              keyboardType="numeric"
              control={control}
              name="ajkerJoma"
              rules={{ required: 'আজকের জমা আবশ্যক' }}
              error={errors.ajkerJoma}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="আজকের বিক্রি"
              placeholder="আজকের বিক্রি লিখুন"
              control={control}
              name="ajekrBikri"
              rules={{ required: 'আজকের বিক্রি আবশ্যক' }}
              error={errors.ajekrBikri}
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="বাকি/ইজ্জা আছে"
              placeholder="বাকি/ইজ্জা লিখুন"
              keyboardType="numeric"
              control={control}
              name="bakiIzaAche"
              rules={{ required: 'বাকি/ইজ্জা আবশ্যক' }}
              error={errors.bakiIzaAche}
            />
          </View>
        </View>

        <CustomButton
          title="সাবমিট"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />

        {/* Bottom spacer for keyboard clearance */}
        <View style={styles.bottomSpacer} />
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default CreateBikroyReport;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  halfInput: {
    flex: 1,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 10,
    paddingVertical: 16,
  },
  bottomSpacer: {
    height: 100, // Extra space at bottom for keyboard clearance
  },
});
