/**
 * To get the value from local storage
 * @param {string} key
 * @returns The value of key
 */
export const getFromLocalStorage = (key: string): string | null => {
  //  Handling non string values with JSON.parse
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch {
    return localStorage.getItem(key);
  }
};

/**
 * Set the key-value pair to local storage
 * @param {string} key
 * @param {any} value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setToLocalStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export const removeFromLocalStorage = (key: string) => localStorage.removeItem(key);
