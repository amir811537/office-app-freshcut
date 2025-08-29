import AttendanceMainIndex from '../screens/attendance/AttendanceMainIndex';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import BikroyReportCreate from '../screens/bikroy-report/BikroyReportCreate';
import BikroyReportMainIndex from '../screens/bikroy-report/BikroyReportMainIndex';
import HomeMainIndex from '../screens/home/HomeMainIndex';
import MenuMainIndex from '../screens/menus/MenuMainIndex';
import SettingsMainIndex from '../screens/settings/SettingsMainIndex';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTab from './BottomTab';



export const authStack = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: SignUpScreen,
  },

];

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
   {
    name: 'MenuMainIndex',
    component: MenuMainIndex,
  },
];
export const mergedStacks = [...dashboardStack, ...authStack];
