import { TFunction, i18n } from 'i18next';
import { AlertState } from '@/themes/AppThemeProvider';

export type ResponseDataType = {
  success?: boolean;
  data: any;
  message: string;
  errorCode?: string;
};

export type ShowErrorAlertType = {
  data: ResponseDataType;
  error: any;
  i18n: i18n;
  t: TFunction<'translation', undefined, 'translation'>;
  showAlert: (alertState: AlertState) => void;
};

export type HandlerType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (errorMsg: any) => void;
};
