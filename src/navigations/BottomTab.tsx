import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeMainIndex from '../screens/home/HomeMainIndex';
import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import SettingsMainIndex from '../screens/settings/SettingsMainIndex';
import { Colors } from '../constants/colors';

type TabParamList = {
  Home: undefined;
  Attendance: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type ScreenOptionsProps = {
  route: RouteProp<TabParamList, keyof TabParamList>;
  navigation: any; // you can type this properly if you want
  // theme?: Theme; // if you want to use theme
};

const TabBarIcon: React.FC<{
  routeName: keyof TabParamList;
  color: string;
  size: number;
}> = ({ routeName, color, size }) => {
  let iconName: string;

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Attendance':
      iconName = 'checkmark-done';
      break;
    case 'Settings':
      iconName = 'settings';
      break;
    default:
      iconName = 'help-circle';
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
      <Tab.Screen name="Home" component={HomeMainIndex} />
      <Tab.Screen name="Attendance" component={AttendanceMainIndex} />
      <Tab.Screen name="Settings" component={SettingsMainIndex} />
    </Tab.Navigator>
  );
};

export default BottomTab;
