import { ShowErrorAlertType } from './commonTypes';
import { REGEX } from './regex';

export const parseString = (string: string) => JSON.parse(string);

export const acceptNumberOnly = (string: string): string => string.replace(REGEX.DIGITS_ONLY, '');

// Generates an array of times from 12:00 AM to 11:00 PM
export const generateHours = (): { value: number; label: string }[] => {
  return Array.from({ length: 24 }, (_, index) => {
    const hour = index % 12 || 12;
    const meridian = index < 12 ? 'AM' : 'PM';
    const label = `${hour}:00 ${meridian}`;
    return { value: index, label };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringify = (value: any) => JSON.stringify(value);

export const showErrorAlert = ({ data, error, i18n, t, showAlert }: ShowErrorAlertType) => {
  if (!data?.success) {
    let message = t('apiErrors.SOMETHING_WENT_WRONG');
    if (error) {
      message = t('apiErrors.SOMETHING_WENT_WRONG');
      if (error.data?.errorCode) {
        if (i18n.exists(`apiErrors.${error.data.errorCode}`)) {
          message = t(`apiErrors.${error.data.errorCode}`);
        }
      } else if (error.data?.message) {
        message = error.data.message;
      }
    }
    showAlert({
      message,
      type: 'error',
    });
  }
};
