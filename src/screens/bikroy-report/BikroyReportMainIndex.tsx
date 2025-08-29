import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import CustomDatePicker from '../../components/CustomDatePicker';
import { useForm, Control } from 'react-hook-form';
import { goBack, navigate } from '../../utils/navigationRef';

const { width } = Dimensions.get('window');

const BikroyReportMainIndex = () => {
  const { control, watch } = useForm({
    defaultValues: {
      fromDate: dayjs().startOf('month').toDate(),
      toDate: dayjs().endOf('month').toDate(),
    },
  });

  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const [recentSales, setRecentSales] = useState([
    {
      _id: '1',
      customer: { name: 'গ্রাহক A' },
      employee: { fullName: 'কর্মকর্তা X' },
      productName: 'চিকেন ৫ কেজি',
      quantity: 5,
      totalAmount: 5000,
      status: 'paid',
      date: new Date(),
    },
    {
      _id: '2',
      customer: { name: 'গ্রাহক B' },
      employee: { fullName: 'কর্মকর্তা Y' },
      productName: 'ডিম ৩০ পিস',
      quantity: 30,
      totalAmount: 3000,
      status: 'partial',
      date: new Date(),
    },
  ]);

  const onViewPress = () => {
    console.log('View data from', fromDate, 'to', toDate);
  };

  const renderSaleItem = ({ item }: any) => (
    <View style={styles.saleCard}>
      <View style={styles.saleHeader}>
        <Text style={styles.saleCustomer}>{item.customer.name}</Text>
        <View style={styles.statusRow}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              item.status === 'paid'
                ? { backgroundColor: Colors.greenFresh }
                : item.status === 'partial'
                ? { backgroundColor: Colors.orangeAccent }
                : { backgroundColor: Colors.error },
            ]}
          >
            <Text style={styles.statusText}>
              {item.status === 'paid'
                ? 'পরিশোধিত'
                : item.status === 'partial'
                ? 'আংশিক'
                : 'বাকি'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="create-outline" size={20} color={Colors.theme} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="trash-outline" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.saleProduct}>
        {item.productName} × {item.quantity}
      </Text>
      <Text style={styles.saleAmount}>{item.totalAmount.toLocaleString()} টাকা</Text>
      <Text style={styles.saleDate}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>
    </View>
  );

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="বিক্রয় রিপোর্ট"  leftIconName="arrow-back"
              onLeftPress={() => goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Date Filters */}
        <View style={styles.filtersContainer}>
          <CustomDatePicker
            name="fromDate"
            control={control as unknown as Control<any>}
            label="শুরুর তারিখ"
            containerStyle={{ flex: 1, marginRight: 8 }}
          />
          <CustomDatePicker
            name="toDate"
            control={control as unknown as Control<any>}
            label="শেষ তারিখ"
            containerStyle={{ flex: 1, marginRight: 8 }}
          />
          <TouchableOpacity style={styles.viewButton} onPress={onViewPress}>
            <Text style={styles.viewButtonText}>দেখুন</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Sales List */}
        <Text style={styles.sectionTitle}>সাম্প্রতিক বিক্রি</Text>
        <FlatList
          data={recentSales}
          keyExtractor={(item) => item._id}
          renderItem={renderSaleItem}
          contentContainerStyle={styles.salesList}
        />
      </ScrollView>
        <TouchableOpacity onPress={()=>navigate('BikroyReportCreate')} style={styles.fab} activeOpacity={0.7}>
      <Icon name="add" size={28} color={Colors.white} />
    </TouchableOpacity>
    </WrapperContainer>
  );
};

export default BikroyReportMainIndex;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  viewButton: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop:23
  },
  viewButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
  },
  salesList: {
    paddingBottom: 100,
  },
  saleCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  saleCustomer: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  iconButton: {
    marginLeft: 4,
    padding: 6,
    borderRadius: 6,
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saleProduct: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  saleAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 2,
  },
  saleDate: {
    fontSize: 12,
    color: Colors.lightText,
  },
   fab: {
    position: 'absolute',
    bottom:80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme,
    elevation: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
