import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { Platform, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeMainIndex from '../screens/home/HomeMainIndex';
import MenuMainIndex from '../screens/menus/MenuMainIndex';
import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import SettingsMainIndex from '../screens/settings/SettingsMainIndex';

import { Colors } from '../constants/colors';

type TabParamList = {
  Dashboard: undefined;
  Menu: undefined;
  Attendance: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type ScreenOptionsProps = {
  route: RouteProp<TabParamList, keyof TabParamList>;
};

const TabBarIcon = ({
  routeName,
  color,
  size,
}: {
  routeName: keyof TabParamList;
  color: string;
  size: number;
}) => {
  let iconName: string;

  switch (routeName) {
    case 'Dashboard':
      iconName = 'speedometer-outline';
      break;
    case 'Menu':
      iconName = 'grid-outline';
      break;
    case 'Attendance':
      iconName = 'calendar-outline';
      break;
    case 'Profile':
      iconName = 'person-outline';
      break;
    default:
      iconName = 'ellipse-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

const screenOptions = ({
  route,
}: ScreenOptionsProps): BottomTabNavigationOptions => ({
  headerShown: false,

  tabBarIcon: ({ color, size }) => (
    <TabBarIcon routeName={route.name} color={color} size={size} />
  ),

  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.inactive,

  tabBarLabelStyle: styles.label,
  tabBarStyle: styles.tabBar,
});

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Dashboard"
        component={HomeMainIndex}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuMainIndex}
        options={{ tabBarLabel: 'Menu' }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceMainIndex}
        options={{ tabBarLabel: 'Attendance' }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsMainIndex}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 8,
    backgroundColor: Colors.white,
    borderTopWidth: 0,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
