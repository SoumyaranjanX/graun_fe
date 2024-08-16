import requests from '@/config/api';
import { useTheme } from '@/hooks';
import { showErrorAlert } from '@/utils';
import { HandlerType, ResponseDataType } from '@/utils/commonTypes';
import { API_URLS } from '@/utils/endPoints';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { TestAPIPostPayload } from './types';

export const testPostApiRequest = async (payload: TestAPIPostPayload): Promise<ResponseDataType> => {
  const { TEST_API_POST } = API_URLS;
  return requests.dispatchPost(TEST_API_POST, payload);
};
// NOTE: USE handler when you want to use logic from within the component. else defile the onSuccess, onError etc here
const useTestPostApi = (handler?: HandlerType) => {
  const { showAlert } = useTheme();
  const { t, i18n } = useTranslation();
  return useMutation(
    async (payload: TestAPIPostPayload): Promise<ResponseDataType> => {
      const response = await testPostApiRequest(payload);
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

export default useTestPostApi;
