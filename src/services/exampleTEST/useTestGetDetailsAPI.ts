import { useQuery } from 'react-query';
import requests from '@/config/api';
import { API_URLS } from '@/utils/endPoints';
import { TestItemType } from './types';
import { REACT_QUERY_KEYS } from '@/utils/queryKeys';

export const getTestDetailsAPIRequest = async () => {
  const { TEST_API_GET } = API_URLS;
  // IMPORTANT NOTE: THIS CAN BE EITHER POST OR GET API.
  return requests.dispatchGet(TEST_API_GET);
};

const useTestGetDetailsAPI = () => {
  return useQuery(
    REACT_QUERY_KEYS.TEST_API_GET,
    async (): Promise<TestItemType[] | null> => {
      const response = await getTestDetailsAPIRequest();
      if (response?.data) return response.data;
      else return null; // NOTE: just for demo , normal case handle accordingly
    },
    {
      // NOTE: ADDING THESE KEYS AS EXAMPLES FOR FUTURE REFERENCE
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000,
      retry: 3,
    },
  );
};
export default useTestGetDetailsAPI;
