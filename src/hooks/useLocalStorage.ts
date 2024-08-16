import { getFromLocalStorage, setToLocalStorage } from '@/utils/storageUtils';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLocalStorage(key: string, defaultValue?: any): [value: any, setValue: (key: any) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === typeof undefined) {
      return defaultValue;
    }

    try {
      const item = getFromLocalStorage(key);
      return item ?? defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      setToLocalStorage(key, value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
