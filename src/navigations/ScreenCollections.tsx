import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import BikroyReportCreate from '../screens/bikroy-report/BikroyReportCreate';
import BikroyReportMainIndex from '../screens/bikroy-report/BikroyReportMainIndex';
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
  {
    name: 'BikroyReport',
    component: BikroyReportMainIndex,
  },
  {
    name: 'BikroyReportCreate',
    component: BikroyReportCreate,
  },
];
export const mergedStacks = [...dashboardStack];
