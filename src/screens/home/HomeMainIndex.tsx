import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import dayjs from 'dayjs';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import CustomCard from '../../components/CustomCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import { getSalesSummary } from '../../services/salesService';
import { useIsFocused } from '@react-navigation/native';

const HomeMainIndex = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchSummary();
  }, [isFocused]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const today = dayjs().format('YYYY-MM-DD');

      const res = await getSalesSummary(
        { startDate: today, endDate: today },
        setLoading,
      );

      console.log('response from sales summary:', JSON.stringify(res,null,2));

      if (res?.statusCode === 200) {
        setSummary(res?.data);
      }
    } catch (error) {
      console.error('Error fetching sales summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <WrapperContainer style={{ backgroundColor: Colors.background }}>
        <CustomHeader title="ড্যাশবোর্ড" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.theme} />
        </View>
      </WrapperContainer>
    );
  }

  const overview = summary?.overview ?? {};
  const recentSales = summary?.recentSales ?? [];

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="ড্যাশবোর্ড" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.orangeAccent }]}>
            <Icon name="barbell-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট বিক্রয় (কেজি)</Text>
            <Text style={styles.overviewValue}>
              {overview?.totalQuantity ?? 0} kg
            </Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.fbColor }]}>
            <Icon name="cube-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট পিস</Text>
            <Text style={styles.overviewValue}>
              {overview?.totalPcs ?? 0}
            </Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.theme }]}>
            <Icon name="cash-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট বিক্রয় টাকা</Text>
            <Text style={styles.overviewValue}>
              ৳ {overview?.totalSalesAmount ?? 0}
            </Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.greenFresh }]}>
            <Icon name="wallet-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট প্রাপ্ত টাকা</Text>
            <Text style={styles.overviewValue}>
              ৳ {overview?.totalReceivedAmount ?? 0}
            </Text>
          </CustomCard>
        </View>

        {/* Recent Sales */}
        <Text style={styles.sectionTitle}>আজকের সাম্প্রতিক বিক্রয়</Text>
        {recentSales?.length > 0 ? (
          recentSales.map((sale: any, index: number) => (
            <CustomCard key={index} style={styles.listCard}>
              <View style={styles.listRow}>
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    name="cube-outline"
                    size={18}
                    color={Colors.theme}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.listText}>
                    {sale?.productName ?? '-'}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>
                    {sale?.quantity ?? 0} kg
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>৳ {sale?.totalAmount ?? 0}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        sale?.status?.toLowerCase() === 'paid'
                          ? Colors.greenFresh
                          : Colors.orangeAccent,
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {sale?.status?.toLowerCase() === 'paid'
                      ? 'পরিশোধিত'
                      : 'বাকি'}
                  </Text>
                </View>
              </View>
            </CustomCard>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>
            আজ কোনো বিক্রয় নেই
          </Text>
        )}
      </ScrollView>
    </WrapperContainer>
  );
};

export default HomeMainIndex;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 30 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  overviewCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 12,
  },
  icon: { marginBottom: 12 },
  overviewTitle: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 6,
    fontWeight: '500',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '90%',
  },
  overviewValue: { fontSize: 20, fontWeight: '700', color: Colors.white },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    marginTop: 15,
  },
  listCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: Colors.surfaceLight,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  listRow: { flexDirection: 'row', alignItems: 'center' },
  listText: { fontSize: 14, color: Colors.text },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: { color: Colors.white, fontSize: 12, fontWeight: '600' },
});
