import requests from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks';
import { showErrorAlert } from '@/utils';
import { HandlerType, ResponseDataType } from '@/utils/commonTypes';
import { ORDER_API_URLS } from '@/utils/endpoints/order.ep';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

export const postApiRequest = async (payload: any): Promise<ResponseDataType> => {
  const { CANCEL_TEMP_ORDER } = ORDER_API_URLS;
  return requests.orderPost(CANCEL_TEMP_ORDER, payload);
};
// NOTE: USE handler when you want to use logic from within the component. else defile the onSuccess, onError etc here
const cancelTempOrderAPI = (handler?: HandlerType) => {
  const { showAlert } = useTheme();
  useTranslation();
  return useMutation(
    async (payload: any): Promise<any> => {
      const response = await postApiRequest(payload);
      return response;
    },
    {
      // NOTE: ADDING THESE KEYS AS EXAMPLES FOR FUTURE REFERENCE
      onSettled: (data, error) => {
        console.log('data:', data, "error:", error)
        // if (error) showErrorAlert({ data: data as ResponseDataType, error, t, i18n, showAlert });
      },
      // NOTE: ADDING THESE KEYS AS EXAMPLES FOR FUTURE REFERENCE

      onSuccess: (res) => {
        if (res.success) {
          handler?.onSuccess?.();
        }
      },
    },
  );
};

export default cancelTempOrderAPI;
