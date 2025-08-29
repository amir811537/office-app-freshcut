// storage.ts
import { MMKV } from 'react-native-mmkv';

/**
 * Storage Keys Enum
 * Use this enum to avoid hardcoding keys
 */
export enum StorageKeys {
  USER_DATA = 'user_data',
}

/**
 * Supported data types
 */
export type DataType = 'string' | 'boolean' | 'number' | 'object';

/**
 * MMKV Instance
 * Add an encryptionKey if you want secure storage
 */
export const storageMmkv = new MMKV({
  id: 'app-storage',
  // encryptionKey: 'your-secure-key', // Optional: use for sensitive data
});

/**
 * Save data to MMKV
 */
export const setData = (key: StorageKeys, value: any) => {
  try {
    if (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number'
    ) {
      storageMmkv.set(key, value);
    } else {
      storageMmkv.set(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log('storage setData error', error);
  }
};

/**
 * Get data from MMKV
 */
export const getData = (key: StorageKeys, type?: DataType) => {
  try {
    switch (type) {
      case 'boolean':
        return storageMmkv.getBoolean(key) ?? null;
      case 'number':
        return storageMmkv.getNumber(key) ?? null;
      case 'string':
        return storageMmkv.getString(key) ?? null;
      default:
        const json = storageMmkv.getString(key);
        return json ? JSON.parse(json) : null;
    }
  } catch (error) {
    console.log('storage getData error', error);
    return null;
  }
};

/**
 * Check if a key exists
 */
export const hasKey = (key: StorageKeys) => {
  return storageMmkv.contains(key);
};

/**
 * Get all keys in storage
 */
export const getAllKeys = () => {
  return storageMmkv.getAllKeys();
};

/**
 * Delete a specific key
 */
export const deleteData = (key: StorageKeys) => {
  try {
    storageMmkv.delete(key);
  } catch (error) {
    console.log('storage deleteData error', error);
  }
};

/**
 * Clear entire storage
 */
export const clearStorage = () => {
  try {
    storageMmkv.clearAll();
  } catch (error) {
    console.log('storage clearStorage error', error);
  }
};

/**
 * Storage Helper Object
 * Use this for cleaner imports
 */
export const storage = {
  setData,
  getData,
  hasKey,
  getAllKeys,
  deleteData,
  clearStorage,
};

export type Storage = typeof storage;
