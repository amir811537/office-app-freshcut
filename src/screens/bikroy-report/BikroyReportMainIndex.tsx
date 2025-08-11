import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCard from '../../components/CustomCard';
import dayjs from 'dayjs';
import { navigate, goBack } from '../../utils/navigationRef';
import CustomButton from '../../components/CustomButton';

type ReportItem = {
  id: string;
  name: string;
  address: string;
  sale: string;
  deposit: string;
  balance: string;
  phone: string;
  date: string;
};

const dummyData: ReportItem[] = [
  {
    id: '1',
    name: 'সোহাগ মামা',
    address: 'চট্টগ্রাম, বাংলাদেশ',
    sale: 'বয়লার ৪০০ পিস (৩০০.৫ কেজি × ১৪) = ৪৩,৮৭৩',
    deposit: '১৫,০০০',
    balance: '৪৫৬,০০০',
    phone: '0182248347',
    date: dayjs().format('DD MMMM YYYY'),
  },
  {
    id: '2',
    name: 'রহিম ভাই',
    address: 'ঢাকা, বাংলাদেশ',
    sale: 'কোকেন ২০০ পিস (১৫০ কেজি × ১২) = ১৮,০০০',
    deposit: '২০,০০০',
    balance: '১২,০০০',
    phone: '0198765432',
    date: dayjs().subtract(1, 'day').format('DD MMMM YYYY'),
  },
  {
    id: '3',
    name: 'জামাল কাকু',
    address: 'রাজশাহী, বাংলাদেশ',
    sale: 'ডিম ৫০০ পিস (২০০ কেজি × ১০) = ৫০,০০০',
    deposit: '৩০,০০০',
    balance: '২০,০০০',
    phone: '0171234567',
    date: dayjs().subtract(2, 'day').format('DD MMMM YYYY'),
  },
];

const BikroyReportMainIndex = () => {
  const onPressFab = () => {
    navigate('BikroyReportCreate');
  };

  const onBackPress = () => {
    goBack();
  };

  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderItem: ListRenderItem<ReportItem> = ({ item }) => (
    <CustomCard style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{item.date}</Text>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>ঠিকানা</Text>
        <Text style={styles.value}>{item.address}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>আজকের বিক্রি</Text>
        <Text style={styles.value}>{item.sale}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>আজকের জমা</Text>
        <Text style={styles.value}>{item.deposit}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>ইজ্জা/বাকি আছে</Text>
        <Text style={styles.value}>{item.balance}</Text>
      </View>

      <CustomButton
        title={`কল করুন: ${item.phone}`}
        onPress={() => callNumber(item.phone)}
        style={styles.callButton}
        textStyle={styles.callText}
        type="primary"
      >
        <Icon name="call" size={18} color={Colors.white} />
      </CustomButton>
    </CustomCard>
  );

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="বিক্রয় রিপোর্ট"
        leftIconName="arrow-back"
        onLeftPress={onBackPress}
      />

      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={onPressFab}
        activeOpacity={0.7}
      >
        <Icon name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </WrapperContainer>
  );
};

export default BikroyReportMainIndex;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // space for FAB
  },
  card: {
    backgroundColor: Colors.card,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: Colors.lightText,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: '700',
    color: Colors.theme,
    width: 120,
    fontSize: 14,
  },
  value: {
    flex: 1,
    color: Colors.black,
    fontSize: 14,
  },
  callButton: {
    marginTop: 10,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: Colors.theme,
  },
  fabText: {
    fontSize: 32,
    lineHeight: 32,
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});
