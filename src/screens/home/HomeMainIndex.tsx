import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import CustomCard from '../../components/CustomCard';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeMainIndex = () => {
  const overview = {
    totalSales: 120,
    totalRevenue: 55000,
    totalCollected: 48000,
    totalDue: 7000,
  };

  const recentSales = [
    { productName: 'প্রোডাক্ট A', quantity: 2, totalAmount: 2000, status: 'Paid' },
    { productName: 'প্রোডাক্ট B', quantity: 1, totalAmount: 1500, status: 'Due' },
    { productName: 'প্রোডাক্ট C', quantity: 3, totalAmount: 4500, status: 'Paid' },
  ];

  const topProducts = [
    { productName: 'প্রোডাক্ট A', totalQuantity: 20, totalAmount: 20000 },
    { productName: 'প্রোডাক্ট C', totalQuantity: 15, totalAmount: 15000 },
    { productName: 'প্রোডাক্ট B', totalQuantity: 10, totalAmount: 10000 },
  ];

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
            <Icon name="cart-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট বিক্রয়</Text>
            <Text style={styles.overviewValue}>{overview.totalSales}</Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.theme }]}>
            <Icon name="cash-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট রাজস্ব</Text>
            <Text style={styles.overviewValue}>৳ {overview.totalRevenue}</Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.greenFresh }]}>
            <Icon name="wallet-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট আদায়</Text>
            <Text style={styles.overviewValue}>৳ {overview.totalCollected}</Text>
          </CustomCard>

          <CustomCard style={[styles.overviewCard, { backgroundColor: Colors.fbColor }]}>
            <Icon name="alert-circle-outline" size={28} color={Colors.white} style={styles.icon} />
            <Text style={styles.overviewTitle}>মোট বাকি</Text>
            <Text style={styles.overviewValue}>৳ {overview.totalDue}</Text>
          </CustomCard>
        </View>

        {/* Recent Sales */}
        <Text style={styles.sectionTitle}>সাম্প্রতিক বিক্রয়</Text>
        {recentSales.map((sale, index) => (
          <CustomCard key={index} style={styles.listCard}>
            <View style={styles.listRow}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="cube-outline" size={18} color={Colors.theme} style={{ marginRight: 8 }} />
                <Text style={styles.listText}>{sale.productName}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.listText}>{sale.quantity} pcs</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.listText}>৳ {sale.totalAmount}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: sale.status === 'Paid' ? Colors.greenFresh : Colors.orangeAccent }
              ]}>
                <Text style={styles.statusText}>{sale.status === 'Paid' ? 'পরিশোধিত' : 'বাকি'}</Text>
              </View>
            </View>
          </CustomCard>
        ))}

        {/* Top Products */}
        <Text style={styles.sectionTitle}>শীর্ষ প্রোডাক্ট</Text>
        {topProducts.map((prod, index) => (
          <CustomCard key={index} style={styles.listCard}>
            <View style={styles.listRow}>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="pricetag-outline" size={18} color={Colors.orangeAccent} style={{ marginRight: 8 }} />
                <Text style={styles.listText}>{prod.productName}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.listText}>{prod.totalQuantity} pcs</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.listText}>৳ {prod.totalAmount}</Text>
              </View>
            </View>
          </CustomCard>
        ))}

      </ScrollView>
    </WrapperContainer>
  );
};

export default HomeMainIndex;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
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
  },
  icon: {
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 6,
    fontWeight: '500',
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
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
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontSize: 14,
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
