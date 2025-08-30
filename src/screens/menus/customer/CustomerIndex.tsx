import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WrapperContainer from '../../../components/WrapperContainer';
import CustomHeader from '../../../components/CustomHeader';
import { Colors } from '../../../constants/colors';
import { goBack, navigate } from '../../../utils/navigationRef';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;

const customers = [
  { id: '1', name: 'রহিম উদ্দিন', phone: '+8801712345678', previousDue: 1200, address: 'ঢাকা, বাংলাদেশ' },
  { id: '2', name: 'করিম মিয়া', phone: '+8801912345678', previousDue: 0, address: 'চট্টগ্রাম, বাংলাদেশ' },
  { id: '3', name: 'সুমাইয়া আক্তার', phone: '+8801512345678', previousDue: 500, address: 'সিলেট, বাংলাদেশ' },
];

const CustomerIndex = () => {
  const [customerList, setCustomerList] = useState(customers);

  const handleEdit = (item: typeof customers[0]) => {
    console.log('Edit customer:', item);
    // Navigate to edit customer screen
  };

  const handleDelete = (id: string) => {
    console.log('Delete customer id:', id);
    setCustomerList(prev => prev.filter(c => c.id !== id));
  };

  const renderCustomer = ({ item }: { item: typeof customers[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
            <Icon name="create-outline" size={20} color={Colors.theme} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconButton}>
            <Icon name="trash-outline" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.phone}>ফোন: {item.phone}</Text>
      <Text style={styles.address}>ঠিকানা: {item.address}</Text>
      <View style={styles.dueContainer}>
        <Text style={styles.dueLabel}>বকেয়া:</Text>
        <Text style={[styles.dueAmount, { color: item.previousDue > 0 ? Colors.error : Colors.greenFresh }]}>
          {item.previousDue > 0 ? `${item.previousDue} টাকা` : 'কোন বকেয়া নেই'}
        </Text>
      </View>
    </View>
  );

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="কাস্টমার তালিকা"   leftIconName="arrow-back"   onLeftPress={() => goBack()} />

      <FlatList
        data={customerList}
        keyExtractor={item => item.id}
        renderItem={renderCustomer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Customer Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigate('CustomerCreate')}
        activeOpacity={0.7}
      >
        <Icon name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </WrapperContainer>
  );
};

export default CustomerIndex;

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: CARD_MARGIN,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  phone: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
    color: Colors.lightText,
    marginBottom: 8,
  },
  dueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  dueAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
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
