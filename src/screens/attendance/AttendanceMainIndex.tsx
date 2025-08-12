import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const AttendanceMainIndex = ({ navigation }: any) => {
  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="অ্যাটেন্ডেন্স"
        onPressLeft={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.content}>
          <Icon
            name="time-outline"
            size={60}
            color={Colors.theme}
            style={styles.icon}
          />
          <Text style={styles.title}>শীঘ্রই আসছে!</Text>
          <Text style={styles.subtitle}>এই ফিচারটি খুব শীঘ্রই উপলব্ধ হবে</Text>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default AttendanceMainIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.error,
    textAlign: 'center',
    lineHeight: 22,
  },
});
