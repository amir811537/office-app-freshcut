import React, { useEffect, useState } from 'react';
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
import { getReports } from '../../services/reportService';
import { CustomerReportTs } from '../../types/reportTypes';
import { toBanglaNumber } from '../../utils/numberUtils';
import CustomLoader from '../../components/CustomLoader';
import { useIsFocused } from '@react-navigation/native'; // ✅

const BikroyReportMainIndex = () => {
  const [landingData, setLandingData] = useState<CustomerReportTs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused(); // ✅ track screen focus

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await getReports();
      console.log(JSON.stringify(response[0], null, 2));
      setLandingData(response);
    } catch (error) {
      console.log('error is', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [isFocused]);

  // Calculate total sale
  const totalSale = landingData.reduce(
    (sum, item) => sum + Number(item.todaySell),
    0,
  );

  const onPressFab = () => {
    navigate('BikroyReportCreate');
  };

  const onBackPress = () => {
    goBack();
  };

  const callNumber = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderItem: ListRenderItem<CustomerReportTs> = ({ item }) => {
    const boilerCount = item.boilerQtypes || '0'; // number of boilers
    const qty = Number(item.boilerQtykg) || 0; // total kg
    const rate = Number(item.boilerRate) || 0; // rate per kg
    const totalSell = Number(item.todaySell) || 0;

    const calculationText = `বয়লার ${boilerCount}পিছ (${toBanglaNumber(
      qty,
    )} kg × ${toBanglaNumber(rate)}) = ${toBanglaNumber(totalSell)} টাকা`;

    const onEditPress = () => {
      navigate('BikroyReportCreate', { reportData: item });
    };

    return (
      <CustomCard style={styles.card}>
        {/* Top Row with Name and Edit Icon */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={onEditPress}>
            <Icon name="create-outline" size={22} color={Colors.theme} />
          </TouchableOpacity>
        </View>

        <Text style={styles.date}>{dayjs(item.date).format('DD/MM/YYYY')}</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>ঠিকানা</Text>
          <Text style={styles.value}>{item.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>আজকের বিক্রি</Text>
          <Text style={styles.value}>{calculationText}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>আজকের জমা</Text>
          <Text style={styles.value}>{toBanglaNumber(item.payment)} টাকা</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ইজা/বাকি আছে</Text>
          <Text style={styles.value}>{toBanglaNumber(item.due)} টাকা</Text>
        </View>

        <CustomButton
          title={`কল করুন: ${toBanglaNumber(item.phone)}`}
          onPress={() => callNumber(item.phone)}
          style={styles.callButton}
          textStyle={styles.callText}
          type="primary"
        >
          <Icon name="call" size={18} color={Colors.white} />
        </CustomButton>
      </CustomCard>
    );
  };

  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader
        title="বিক্রয় রিপোর্ট"
        leftIconName="arrow-back"
        onLeftPress={onBackPress}
      />

      {loading ? (
        <CustomLoader loading={loading} />
      ) : (
        <>
          <View style={styles.totalSaleContainer}>
            <Text style={styles.totalSaleText}>
              মোট বিক্রি: {toBanglaNumber(totalSale)}
            </Text>
          </View>

          <FlatList
            data={landingData}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

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
  totalSaleContainer: {
    padding: 16,
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
  },
  totalSaleText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.theme,
  },
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
    bottom: 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: Colors.theme,
  },
});
