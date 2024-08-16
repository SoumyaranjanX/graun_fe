import { PageLoader } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
// import { TestAPIResponseType } from '@/services/exampleTEST/types';
// import useTestGetDetailsAPI from '@/services/exampleTEST/useTestGetDetailsAPI';
// import useTestPostApi from '@/services/exampleTEST/useTestPostApi';
// import { REACT_QUERY_KEYS } from '@/utils/queryKeys';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

const Dashboard = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'pages.Dashboard' });
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // const onSuccess = () => {
  //   // NOTE : This will automatically refetch the api.
  //   queryClient.invalidateQueries();
  // };

  // const { data: testList, isLoading, refetch: refetchTheAPI } = useTestGetDetailsAPI();
  // const { mutate: mutateTestApi } = useTestPostApi({ onSuccess: onSuccess });

  // NOTE : This is for getting the data from other api's that have already been loaded. eg: if orders have already been fetched. It can be retrieved from the store
  // const retrieveData: TestAPIResponseType | undefined = queryClient.getQueryData(REACT_QUERY_KEYS.TEST_API_GET);
  // console.log('retrieveData', retrieveData);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  return (
    <Box className="app-l-content__wrap">
      <Box
        className="app-l-content__box"
        sx={{ padding: '1.875rem', minHeight: '100%', display: 'block', flexDirection: 'column' }}
      >
        {t('title')}

        <Button
          onClick={() => {
            logout();
          }}
        >
          LogOut
        </Button>

        <Button
          onClick={() => {
            // refetchTheAPI();
          }}
        >
          Manual Refetch The API
        </Button>
        <Box>
          <Button
            onClick={() => {
              // mutateTestApi({
              //   routeType: 'Test Route',
              // });
            }}
          >
            POST API TEST DATA
          </Button>
        </Box>
        {isLoading ? (
          <PageLoader />
        ) : (
          <Box>
            {/* LIST the data
            {testList?.map((item: { routeTypeId: number; routeType: string }) => (
              <li key={item.routeTypeId}>{item.routeType}</li>
            ))} */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
