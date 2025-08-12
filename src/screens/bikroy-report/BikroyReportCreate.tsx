import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomHeader from '../../components/CustomHeader';
import CustomInput from '../../components/CustomInput';
import WrapperContainer from '../../components/WrapperContainer';
import { Colors } from '../../constants/colors';
import { goBack } from '../../utils/navigationRef';
import CustomDropdown from '../../components/CustomDropdown';

type FormData = {
  occupation: number; // Added occupation to form data
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
      occupation: undefined, // Added default value for occupation
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

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Occupation Dropdown */}
        <CustomDropdown
          name="occupation"
          control={control}
          label="পেশা"
          placeholder="পেশা নির্বাচন করুন"
          items={[
            { value: 1, label: 'শিক্ষক', grade: 'A' },
            { value: 2, label: 'চিকিৎসক', grade: 'B' },
            { value: 3, label: 'প্রকৌশলী', grade: 'C' },
          ]}
          rules={{ required: 'পেশা নির্বাচন আবশ্যক' }}
          error={errors.occupation}
          onSelected={item => {
            console.log(item);
          }}
        />

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

        {/* Two inputs side-by-side */}
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
      </ScrollView>
    </WrapperContainer>
  );
};

export default CreateBikroyReport;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: 10,
    paddingVertical: 16,
  },
});
