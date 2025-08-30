import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { navigate } from '../../utils/navigationRef';

const menuItems = [
  { id: '1', title: 'বিক্রয়', icon: 'bar-chart-outline', color: Colors.orangeAccent },
  { id: '2', title: 'কাস্টমার', icon: 'people-outline', color: Colors.greenFresh },
  { id: '3', title: 'কর্মচারী', icon: 'person-outline', color: Colors.theme },
];

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 12;
const ITEM_WIDTH = (width - 32 - ITEM_MARGIN * 2) / 3; // compact 3-column layout
const CIRCLE_SIZE = ITEM_WIDTH * 0.75; // smaller circle

const MenuMainIndex = () => {
const onMenuPress = (item: (typeof menuItems)[0]) => {
  if (item.title === 'বিক্রয়') {
    navigate('BikroyReport');
  } else if (item.title === 'কাস্টমার') {
    navigate('CustomerIndex'); // ✅ Go to Customer Landing Page
  } else {
    showMessage({
      message: 'শীঘ্রই আসছে',
      type: 'info',
      icon: 'info',
      duration: 2000,
      floating: true,
    });
  }
};


  return (
    <WrapperContainer style={{ backgroundColor: Colors.background }}>
      <CustomHeader title="মেনু" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuGrid}>
          {menuItems.map(item => (
            <View key={item.id} style={styles.menuWrapper}>
              <TouchableOpacity
                style={[styles.menuCircle, { backgroundColor: item.color }]}
                onPress={() => onMenuPress(item)}
                activeOpacity={0.8}
              >
                <Icon name={item.icon} size={24} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default MenuMainIndex;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical:10
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  menuWrapper: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 20,
  },
  menuCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
