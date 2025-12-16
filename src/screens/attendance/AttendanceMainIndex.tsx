import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import CustomHeader from '../../components/CustomHeader';
import { Colors } from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AttendanceMainIndex = ({ navigation }: any) => {
  return (
    <WrapperContainer style={styles.wrapper}>
      <CustomHeader title="Attendance" />

      <View style={styles.container}>
        {/* Daily Attendance */}
        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AttendanceDaily')}
        >
          <View style={styles.iconWrap}>
            <Ionicons
              name="calendar-outline"
              size={26}
              color={Colors.primary}
            />
          </View>

          <View style={styles.textWrap}>
            <Text style={styles.menuTitle}>Daily Attendance</Text>
            <Text style={styles.menuSubtitle}>
              Mark present, leave, or absent for each employee
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.inactive}
          />
        </TouchableOpacity>

        {/* Monthly Report */}
        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AttendanceMonthly')}
        >
          <View style={styles.iconWrap}>
            <Ionicons
              name="stats-chart-outline"
              size={26}
              color={Colors.primary}
            />
          </View>

          <View style={styles.textWrap}>
            <Text style={styles.menuTitle}>Monthly Report</Text>
            <Text style={styles.menuSubtitle}>
              View monthly attendance summary
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.inactive}
          />
        </TouchableOpacity>

        {/* Yearly Report */}
        <TouchableOpacity
          style={styles.menuCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AttendanceYearly')}
        >
          <View style={styles.iconWrap}>
            <Ionicons
              name="bar-chart-outline"
              size={26}
              color={Colors.primary}
            />
          </View>

          <View style={styles.textWrap}>
            <Text style={styles.menuTitle}>Yearly Report</Text>
            <Text style={styles.menuSubtitle}>
              Analyze yearly attendance performance
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.inactive}
          />
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default AttendanceMainIndex;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    padding: 20,
  },

  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  textWrap: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },

  menuSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
