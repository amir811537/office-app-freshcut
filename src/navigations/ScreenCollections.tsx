import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import HomeMainIndex from '../screens/home/HomeMainIndex';
import SettingsMainIndex from '../screens/settings/SettingsMainIndex';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTab from './BottomTab';

export const dashboardStack = [
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
  {
    name: 'BottomTab',
    component: BottomTab,
  },
  {
    name: 'Home',
    component: HomeMainIndex,
  },
  {
    name: 'Attandance',
    component: AttendanceMainIndex,
  },
  {
    name: 'Settings',
    component: SettingsMainIndex,
  },
];
export const mergedStacks = [...dashboardStack];
