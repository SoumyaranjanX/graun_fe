export const REGEX = {
  EMAIL: /^[\w][-.\w]*@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  DIGITS_ONLY: /\D/g,
  ONLY_NUMBERS: /^[0-9]*$/,
  URL: /^((http|https|ftp):\/\/)/,
};
