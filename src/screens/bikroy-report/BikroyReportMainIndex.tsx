import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import CustomDatePicker from '../../components/CustomDatePicker';
import { useForm, Control } from 'react-hook-form';
import { goBack, navigate } from '../../utils/navigationRef';
import {
  getAllSales,
  GetSalesParams,
  deleteSale,
} from '../../services/salesService';
import { showMessage } from 'react-native-flash-message';
import CustomLoader from '../../components/CustomLoader';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;

interface SaleItem {
  _id: string;
  customer: { name: string; phone?: string };
  employee: { fullName: string; employeeCode?: string };
  productName: string;
  quantity: number;
  totalAmount: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'unpaid';
  date: string;
  notes?: string;
}

const BikroyReportMainIndex = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      fromDate: dayjs().startOf('month').toDate(),
      toDate: dayjs().endOf('month').toDate(),
    },
  });

  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔹 Fetch sales data
  const fetchSales = useCallback(async () => {
    try {
      setLoading(true);

      const params: GetSalesParams = {
        limit: 100, // Show 100 records by default
        startDate: dayjs(fromDate).startOf('day').toISOString(),
        endDate: dayjs(toDate).endOf('day').toISOString(),
      };

      const response = await getAllSales(params, setLoading);
      console.log(JSON.stringify(response, null, 2));

      if (response?.success) {
        setSales(response.data.sales || []);
      } else {
        showMessage({
          message: response?.message || 'Failed to fetch sales data',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Failed to fetch sales data',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate]);

  // 🔹 Load initial data
  useEffect(() => {
    fetchSales();
  }, []);

  // 🔹 Handle delete with confirmation
  const handleDelete = async (id: string, customerName: string) => {
    Alert.alert(
      'বিক্রয় মুছুন',
      `আপনি কি নিশ্চিত যে আপনি ${customerName}-এর বিক্রয়টি মুছতে চান?`,
      [
        {
          text: 'বাতিল',
          style: 'cancel',
        },
        {
          text: 'মুছুন',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeletingId(id);
              const response = await deleteSale(id, () => {});

              if (response?.success) {
                showMessage({
                  message: 'বিক্রয় সফলভাবে মুছে ফেলা হয়েছে',
                  type: 'success',
                });
                // Remove the deleted item from the list
                setSales(prev => prev.filter(item => item._id !== id));
              } else {
                showMessage({
                  message:
                    response?.message || 'বিক্রয় মুছে ফেলতে ব্যর্থ হয়েছে',
                  type: 'danger',
                });
              }
            } catch (error) {
              showMessage({
                message: 'বিক্রয় মুছে ফেলতে ব্যর্থ হয়েছে',
                type: 'danger',
              });
            } finally {
              setDeletingId(null);
            }
          },
        },
      ],
    );
  };

  // 🔹 Status Style Helper
  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'পরিশোধিত';
      case 'partial':
        return 'আংশিক';
      default:
        return 'বাকি';
    }
  };

  const handleEdit = (item: SaleItem) => {
    navigate('BikroyReportEdit', { saleId: item._id });
  };

  const onViewPress = () => {
    fetchSales();
  };

  // 🔹 Render Single Sale Card (Customer card design)
  const renderSaleItem = ({ item }: { item: SaleItem }) => {
    const paidAmount = item.paidAmount ?? 0;
    const dueAmount = Math.max(item.totalAmount - paidAmount, 0);
    const extraAmount =
      paidAmount > item.totalAmount ? paidAmount - item.totalAmount : 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.customer.name}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleEdit(item)}
            >
              <Icon name="create-outline" size={20} color={Colors.theme} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(item._id, item.customer.name)}
              disabled={deletingId === item._id}
            >
              {deletingId === item._id ? (
                <ActivityIndicator size="small" color={Colors.error} />
              ) : (
                <Icon name="trash-outline" size={20} color={Colors.error} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.product}>
          🛒 {item.productName}({item?.price}) × {item.quantity}={' '}
          {item.totalAmount.toLocaleString()} টাকা
        </Text>

        <Text style={styles.amount}>
          জমা: {paidAmount.toLocaleString()} টাকা
        </Text>

        {dueAmount > 0 && (
          <Text style={[styles.amount, { color: Colors.error }]}>
            বাকি: {dueAmount.toLocaleString()} টাকা
          </Text>
        )}

        {extraAmount > 0 && (
          <Text style={[styles.amount, { color: Colors.greenFresh }]}>
            অতিরিক্ত জমা: {extraAmount.toLocaleString()} টাকা
          </Text>
        )}

        <View style={styles.footerRow}>
          <Text style={styles.date}>
            📅 {dayjs(item.date).format('DD/MM/YYYY')}
          </Text>
          <Text
            style={[
              styles.status,
              {
                color:
                  item.status === 'paid'
                    ? Colors.greenFresh
                    : item.status === 'partial'
                    ? Colors.orangeAccent
                    : Colors.error,
              },
            ]}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer style={styles.pageBackground}>
      <CustomHeader
        title="বিক্রয় রিপোর্ট"
        leftIconName="arrow-back"
        onLeftPress={() => goBack()}
      />

      <View style={styles.container}>
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <CustomDatePicker
            name="fromDate"
            control={control as unknown as Control<any>}
            label="শুরুর তারিখ"
            containerStyle={styles.datePicker}
          />
          <CustomDatePicker
            name="toDate"
            control={control as unknown as Control<any>}
            label="শেষ তারিখ"
            containerStyle={styles.datePicker}
          />
          <TouchableOpacity style={styles.viewButton} onPress={onViewPress}>
            <Text style={styles.viewButtonText}>দেখুন</Text>
          </TouchableOpacity>
        </View>

        {/* Sales List */}
        <Text style={styles.sectionTitle}>সাম্প্রতিক বিক্রি</Text>
        <FlatList
          data={sales}
          keyExtractor={item => item._id}
          renderItem={renderSaleItem}
          contentContainerStyle={styles.salesList}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  কোন বিক্রয় তথ্য পাওয়া যায়নি
                </Text>
              </View>
            ) : null
          }
        />
      </View>

      {/* Custom Loader */}
      <CustomLoader loading={loading} />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => navigate('BikroyReportCreate')}
        style={styles.fab}
        activeOpacity={0.7}
      >
        <Icon name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </WrapperContainer>
  );
};

export default BikroyReportMainIndex;

const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  datePicker: {
    flex: 1,
    marginRight: 8,
  },
  viewButton: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: Colors.theme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  viewButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  salesList: {
    paddingBottom: 100,
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
  product: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  date: {
    fontSize: 12,
    color: Colors.lightText,
  },
  status: {
    fontSize: 13,
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
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.lightText,
    textAlign: 'center',
  },
});
