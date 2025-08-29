import { create } from 'zustand';
import { storage, StorageKeys } from '../utils/storage';

export type User = {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  employeeCode: string;
  phone: string;
};

type AuthData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type UserStore = {
  auth: AuthData | null;
  setAuth: (auth: AuthData) => void;
  clearAuth: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  auth: null,
  setAuth: (auth) => {
    storage.setData(StorageKeys.USER_DATA, auth); // Save tokens + user
    set({ auth });
  },
  clearAuth: () => {
    storage.deleteData(StorageKeys.USER_DATA);
    set({ auth: null });
  },
}));

export const initUserFromStorage = () => {
  const savedAuth = storage.getData(StorageKeys.USER_DATA);
  if (savedAuth) {
    useUserStore.setState({ auth: savedAuth });
  }
};








