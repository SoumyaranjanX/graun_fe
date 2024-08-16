import requests from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks';
import { showErrorAlert } from '@/utils';
import { HandlerType, ResponseDataType } from '@/utils/commonTypes';
import { RESTAURANT_API_URLS } from '@/utils/endpoints/restaurant.ep'
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

export const postApiRequest = async (payload: any): Promise<ResponseDataType> => {
  const { REMOVE_UBER_INTEGRATION } = RESTAURANT_API_URLS;
  return requests.orderPost(REMOVE_UBER_INTEGRATION, payload);
};
// NOTE: USE handler when you want to use logic from within the component. else defile the onSuccess, onError etc here
const removeUberIntegration = (handler?: HandlerType) => {
  const { showAlert } = useTheme();
  const { t, i18n } = useTranslation();
  return useMutation(
    async (payload: any): Promise<any> => {
      const response = await postApiRequest(payload);
      return response;
    },
    {
      // NOTE: ADDING THESE KEYS AS EXAMPLES FOR FUTURE REFERENCE
      onSettled: (data, error) => {
        if (error) showErrorAlert({ data: data as ResponseDataType, error, t, i18n, showAlert });
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

export default removeUberIntegration;
