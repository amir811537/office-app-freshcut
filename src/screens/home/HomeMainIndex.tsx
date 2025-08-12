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
  { id: '1', title: 'বিক্রয় রিপোর্ট', icon: 'bar-chart' },
  { id: '2', title: 'বাকি রিপোর্ট', icon: 'document-text' },
  { id: '3', title: 'অর্ডার লিস্ট', icon: 'list' },
  { id: '4', title: 'কাস্টমার', icon: 'people' },
  { id: '5', title: 'প্রোডাক্ট', icon: 'cube' },
];

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 8;
const ITEM_WIDTH = (width - 32 - ITEM_MARGIN * 4) / 3; // 32 is total horizontal padding (16*2)

const HomeMainIndex = () => {
  const onMenuPress = (item: (typeof menuItems)[0]) => {
    if (item.title === 'বিক্রয় রিপোর্ট') {
      navigate('BikroyReport');
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
      <CustomHeader title="হোম" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuGrid}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => onMenuPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={32} color={Colors.theme} />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}

          {/* Add empty views to maintain grid structure if items count not divisible by 3 */}
          {menuItems.length % 3 !== 0 &&
            Array.from({ length: 3 - (menuItems.length % 3) }).map(
              (_, index) => (
                <View key={`empty-${index}`} style={styles.emptyItem} />
              ),
            )}
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default HomeMainIndex;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: ITEM_WIDTH,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: ITEM_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyItem: {
    width: ITEM_WIDTH,
    paddingVertical: 20,
    paddingHorizontal: 10,
    opacity: 0, // completely transparent
  },
  iconContainer: {
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
});
