import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import MenuMainIndex from '../screens/menus/MenuMainIndex';
import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import SettingsMainIndex from '../screens/settings/SettingsMainIndex'; // Will be used as Profile
import { Colors } from '../constants/colors';
import HomeMainIndex from '../screens/home/HomeMainIndex';

type TabParamList = {
  Dashboard: undefined;
  Menu: undefined;
  Attendance: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type ScreenOptionsProps = {
  route: RouteProp<TabParamList, keyof TabParamList>;
  navigation: any;
};

const TabBarIcon: React.FC<{
  routeName: keyof TabParamList;
  color: string;
  size: number;
}> = ({ routeName, color, size }) => {
  let iconName: string;

  switch (routeName) {
    case 'Dashboard':
      iconName = 'speedometer-outline';
      break;
    case 'Menu':
      iconName = 'grid-outline';
      break;
    case 'Attendance':
      iconName = 'checkmark-done-outline';
      break;
    case 'Profile':
      iconName = 'person-circle-outline'; // New profile icon
      break;
    default:
      iconName = 'help-circle-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const screenOptions = ({
  route,
}: ScreenOptionsProps): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.theme,
  tabBarInactiveTintColor: Colors.inactive,
  tabBarStyle: {
    backgroundColor: Colors.background,
    borderTopWidth: 0,
    elevation: 10,
    height: 65,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.text,
  },
  tabBarIcon: ({ color, size }) => (
    <TabBarIcon routeName={route.name} color={color} size={size} />
  ),
});

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Dashboard"
        component={HomeMainIndex}
        options={{ tabBarLabel: 'ড্যাশবোর্ড' }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuMainIndex}
        options={{ tabBarLabel: 'মেনু' }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceMainIndex}
        options={{ tabBarLabel: 'হাজিরা' }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsMainIndex} // Component remains same
        options={{ tabBarLabel: 'প্রোফাইল' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
