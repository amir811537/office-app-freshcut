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
      const firstDay = dayjs().startOf('month').format('YYYY-MM-DD');
      const lastDay = dayjs().endOf('month').format('YYYY-MM-DD');
      const res = await getSalesSummary(
        { startDate: firstDay, endDate: lastDay },
        setLoading,
      );

      if (res?.statusCode === 200) setSummary(res.data);
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={Colors.theme} />
        </View>
      </WrapperContainer>
    );
  }

  const overview = summary?.overview || {};
  const recentSales = summary?.recentSales || [];
  const topProducts = summary?.topProducts || [];

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="ড্যাশবোর্ড" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <CustomCard
            style={[
              styles.overviewCard,
              { backgroundColor: Colors.orangeAccent },
            ]}
          >
            <Icon
              name="cart-outline"
              size={28}
              color={Colors.white}
              style={styles.icon}
            />
            <Text style={styles.overviewTitle}>মোট বিক্রয়</Text>
            <Text style={styles.overviewValue}>{overview.totalSales ?? 0}</Text>
          </CustomCard>

          <CustomCard
            style={[styles.overviewCard, { backgroundColor: Colors.theme }]}
          >
            <Icon
              name="cash-outline"
              size={28}
              color={Colors.white}
              style={styles.icon}
            />
            <Text style={styles.overviewTitle}>মোট রাজস্ব</Text>
            <Text style={styles.overviewValue}>
              ৳ {overview.totalRevenue ?? 0}
            </Text>
          </CustomCard>

          {/* <CustomCard
            style={[
              styles.overviewCard,
              { backgroundColor: Colors.greenFresh },
            ]}
          >
            <Icon
              name="wallet-outline"
              size={28}
              color={Colors.white}
              style={styles.icon}
            />
            <Text style={styles.overviewTitle}>মোট আদায়</Text>
            <Text style={styles.overviewValue}>
              ৳ {overview.totalCollected ?? 0}
            </Text>
          </CustomCard>

          <CustomCard
            style={[styles.overviewCard, { backgroundColor: Colors.fbColor }]}
          >
            <Icon
              name="alert-circle-outline"
              size={28}
              color={Colors.white}
              style={styles.icon}
            />
            <Text style={styles.overviewTitle}>মোট বাকি</Text>
            <Text style={styles.overviewValue}>৳ {overview.totalDue ?? 0}</Text>
          </CustomCard> */}
        </View>

        {/* Recent Sales */}
        <Text style={styles.sectionTitle}>সাম্প্রতিক বিক্রয়</Text>
        {recentSales.length > 0 ? (
          recentSales.map((sale: any, index: number) => (
            <CustomCard key={index} style={styles.listCard}>
              <View style={styles.listRow}>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name="cube-outline"
                    size={18}
                    color={Colors.theme}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.listText}>
                    {sale?.productName ?? sale?._id ?? '-'}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>{sale?.quantity ?? 0} pcs</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>
                    ৳ {sale?.totalAmount ?? 0}
                  </Text>
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
            কোনো সাম্প্রতিক বিক্রয় নেই
          </Text>
        )}

        {/* Top Products */}
        <Text style={styles.sectionTitle}>শীর্ষ প্রোডাক্ট</Text>
        {topProducts.length > 0 ? (
          topProducts.map((prod: any, index: number) => (
            <CustomCard key={index} style={styles.listCard}>
              <View style={styles.listRow}>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    name="pricetag-outline"
                    size={18}
                    color={Colors.orangeAccent}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.listText}>{prod?._id ?? '-'}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>
                    {prod?.totalQuantity ?? 0} pcs
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.listText}>
                    ৳ {prod?.totalAmount ?? 0}
                  </Text>
                </View>
              </View>
            </CustomCard>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>
            কোনো শীর্ষ প্রোডাক্ট নেই
          </Text>
        )}
      </ScrollView>
    </WrapperContainer>
  );
};

export default HomeMainIndex;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 30 },
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
