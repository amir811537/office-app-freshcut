import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import WrapperContainer from '../../../components/WrapperContainer';
import CustomHeader from '../../../components/CustomHeader';
import { Colors } from '../../../constants/colors';
import { goBack, navigate } from '../../../utils/navigationRef';
import {
  getAllCustomers,
  deleteCustomer,
} from '../../../services/customerService';
import { showMessage } from 'react-native-flash-message';
import CustomLoader from '../../../components/CustomLoader';
import { useIsFocused } from '@react-navigation/native';

const CARD_MARGIN = 12;

const CustomerIndex: React.FC = () => {
  const isFoucsed = useIsFocused();
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomers({ page: 1, limit: 200 }, setLoading);
      if (res?.success && res.data?.customers) {
        setCustomerList(res.data.customers);
      } else {
        const message =
          res?.message || 'কাস্টমার তথ্য আনার সময় সমস্যা হয়েছে ❌';
        showMessage({
          message,
          type: 'danger',
          icon: 'danger',
          duration: 2000,
          floating: true,
        });
      }
    } catch (error: any) {
      const message =
        error?.message || 'কাস্টমার তথ্য আনার সময় সমস্যা হয়েছে ❌';
      showMessage({
        message,
        type: 'danger',
        icon: 'danger',
        duration: 2000,
        floating: true,
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [isFoucsed]);

  const handleEdit = (item: any) => {
    navigate('CustomerCreate', { customer: item });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'নিশ্চিত করুন',
      'আপনি কি নিশ্চিতভাবে কাস্টমারটি মুছতে চান?',
      [
        {
          text: 'বাতিল',
          style: 'cancel',
        },
        {
          text: 'মুছে ফেলুন',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const res = await deleteCustomer(id, setLoading);
              if (res?.success) {
                setCustomerList(prev => prev.filter(c => c._id !== id));
                showMessage({
                  message:
                    res.message || 'কাস্টমার সফলভাবে মুছে ফেলা হয়েছে ✅',
                  type: 'success',
                  icon: 'success',
                  duration: 2000,
                  floating: true,
                });
              } else {
                showMessage({
                  message: res?.message || 'কাস্টমার মুছতে সমস্যা হয়েছে ❌',
                  type: 'danger',
                  icon: 'danger',
                  duration: 2000,
                  floating: true,
                });
              }
            } catch (error: any) {
              showMessage({
                message: error?.message || 'কাস্টমার মুছতে সমস্যা হয়েছে ❌',
                type: 'danger',
                icon: 'danger',
                duration: 2000,
                floating: true,
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const renderCustomer = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            style={styles.iconButton}
          >
            <Icon name="create-outline" size={20} color={Colors.theme} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item._id)}
            style={styles.iconButton}
          >
            <Icon name="trash-outline" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.phone}>ফোন: {item.phone}</Text>
      <Text style={styles.address}>ঠিকানা: {item.address}</Text>
      <View style={styles.dueContainer}>
        <Text style={styles.dueLabel}>বকেয়া:</Text>
        <Text
          style={[
            styles.dueAmount,
            { color: item.previousDue > 0 ? Colors.error : Colors.greenFresh },
          ]}
        >
          {item.previousDue > 0 ? `${item.previousDue} টাকা` : 'কোন বকেয়া নেই'}
        </Text>
      </View>
    </View>
  );

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="কাস্টমার তালিকা"
        leftIconName="arrow-back"
        onLeftPress={() => goBack()}
      />

      <FlatList
        data={customerList}
        keyExtractor={item => item._id}
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

      {/* Loader */}
      <CustomLoader loading={loading} />
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
