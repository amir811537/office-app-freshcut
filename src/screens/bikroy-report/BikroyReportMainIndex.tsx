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
  Modal,
  Share,
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
  getSaleById,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [sales, setSales] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saleDetail, setSaleDetail] = useState<any | null>(null);
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
    showMessage({
      message: 'শীঘ্রই আসছে',
      type: 'info',
      icon: 'info',
      duration: 2000,
      floating: true,
    });
    // navigate('BikroyReportEdit', { saleId: item._id });
  };

  const onViewPress = () => {
    fetchSales();
  };
  const handleView = async (id: string) => {
    try {
      const response = await getSaleById(id, setLoading); // 👈 API call

      if (response?.success) {
        setSaleDetail(response.data);
        setModalVisible(true);
      } else {
        showMessage({ message: 'ডাটা লোড করা যায়নি', type: 'danger' });
      }
    } catch (error) {
      showMessage({ message: 'Failed to load sale details', type: 'danger' });
    }
  };

  const handleShare = async () => {
    if (!saleDetail) return;

    const shareText = `
  ==============================
         🧾 বিক্রয় রসিদ       
  ==============================
  
  👤 গ্রাহক তথ্য
  নাম     : ${saleDetail.customer.name}
  ফোন     : ${saleDetail.customer.phone}
  ঠিকানা  : ${saleDetail.customer.address}
  
  📦 পণ্যের তথ্য
  --------------------------------
  ${saleDetail.productName} (${saleDetail.uom})
  পরিমাণ : ${saleDetail.quantity} × ${saleDetail.price} = ${
      saleDetail.totalAmount
    } টাকা
  
  💰 পেমেন্ট তথ্য
  --------------------------------
  মোট     : ${saleDetail.totalAmount} টাকা
  জমা     : ${saleDetail.paidAmount} টাকা
  বাকি    : ${saleDetail.dueAmount} টাকা
  
  🧑‍💼 বিক্রেতা: ${saleDetail.employee.fullName} (${
      saleDetail.employee.employeeCode
    })
  
  📅 তারিখ: ${dayjs(saleDetail.date).format('DD/MM/YYYY')}
  ✍️ নোট: ${saleDetail.notes || 'কোনো নোট নেই'}
  
  ==============================
  ধন্যবাদ আমাদের সাথে কেনাকাটার জন্য
  ==============================
    `;

    try {
      await Share.share({ message: shareText });
    } catch (error) {
      showMessage({ message: 'Share failed', type: 'danger' });
    }
  };

  // 🔹 Render Single Sale Card (Customer card design)
  const renderSaleItem = ({ item }: { item: SaleItem }) => {
    const paidAmount = item.paidAmount ?? 0;
    const dueAmount = Math.max(item.totalAmount - paidAmount, 0);
    // const extraAmount =
    //   paidAmount > item.totalAmount ? paidAmount - item.totalAmount : 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.customer.name}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleView(item._id)}
            >
              <Icon name="eye-outline" size={20} color={Colors.error} />
            </TouchableOpacity>
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
          🛒 {item?.productName}({item?.price}) × {item.quantity}={' '}
          {item?.totalAmount?.toLocaleString()} টাকা
        </Text>

        <Text style={styles.amount}>
          জমা: {paidAmount?.toLocaleString()} টাকা
        </Text>

        {dueAmount > 0 && (
          <Text style={[styles.amount, { color: Colors.orangeAccent }]}>
            আজকের বাকি:: {dueAmount?.toLocaleString()} টাকা
          </Text>
        )}
        <Text style={[styles.amount, { color: Colors.error }]}>
          আগের বাকি: {item?.customer?.previousDue?.toLocaleString()} টাকা
        </Text>
        {/* {extraAmount > 0 && (
          <Text style={[styles.amount, { color: Colors.greenFresh }]}>
            অতিরিক্ত জমা: {extraAmount.toLocaleString()} টাকা
          </Text>
        )} */}

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {saleDetail ? (
              <>
                {/* Header */}
                <Text style={styles.modalTitle}>🧾 বিক্রয় তথ্য</Text>
                <View style={styles.divider} />

                {/* Customer Info */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>👤 ক্রেতার তথ্য</Text>
                  <Text style={styles.modalText}>
                    নাম: {saleDetail.customer.name}
                  </Text>
                  <Text style={styles.modalText}>
                    ফোন: {saleDetail.customer.phone}
                  </Text>
                  <Text style={styles.modalText}>
                    ঠিকানা: {saleDetail.customer.address}
                  </Text>
                </View>

                {/* Product Info */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>📦 পণ্যের তথ্য</Text>
                  <Text style={styles.modalText}>
                    {saleDetail.productName} ({saleDetail.uom})
                  </Text>
                  <Text style={styles.modalText}>
                    পরিমাণ: {saleDetail.quantity} × {saleDetail.price} টাকা
                  </Text>
                  <View style={styles.amountRow}>
                    <Text style={styles.modalText}>মোট</Text>
                    <Text style={styles.amountValue}>
                      {saleDetail.totalAmount.toLocaleString()} টাকা
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.modalText}>জমা</Text>
                    <Text
                      style={[styles.amountValue, { color: Colors.greenFresh }]}
                    >
                      {saleDetail.paidAmount.toLocaleString()} টাকা
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.modalText}>বাকি</Text>
                    <Text style={[styles.amountValue, { color: Colors.error }]}>
                      {saleDetail.dueAmount.toLocaleString()} টাকা
                    </Text>
                  </View>
                </View>

                {/* Employee Info */}
                {/* <View style={styles.section}>
                  <Text style={styles.sectionTitle}>🧑‍💼 কর্মচারী</Text>
                  <Text style={styles.modalText}>
                    {saleDetail.employee.fullName}
                  </Text>
                  <Text style={styles.modalText}>
                    Code: {saleDetail.employee.employeeCode}
                  </Text>
                </View> */}

                {/* Notes */}
                {saleDetail.notes ? (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>✍️ নোট</Text>
                    <Text style={styles.modalText}>{saleDetail.notes}</Text>
                  </View>
                ) : null}

                {/* Footer */}
                <View style={styles.section}>
                  <Text style={styles.modalText}>
                    📅 {dayjs(saleDetail.date).format('DD/MM/YYYY')}
                  </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: Colors.theme },
                    ]}
                    onPress={handleShare}
                  >
                    <Icon
                      name="share-social-outline"
                      size={18}
                      color={Colors.white}
                    />
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: Colors.error },
                    ]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Icon name="close-outline" size={18} color={Colors.white} />
                    <Text style={styles.actionButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <ActivityIndicator size="large" color={Colors.theme} />
            )}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  section: {
    marginBottom: 12,
  },

  modalText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});
