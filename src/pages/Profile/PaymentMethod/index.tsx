import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PaymentMethod = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'pages.PaymentMethod' });

  return (
    <Box className="app-l-content__wrap">
      <Box
        className="app-l-content__box"
        sx={{ padding: '1.875rem', minHeight: '100%', display: 'block', flexDirection: 'column' }}
      >
        {t('title')}
      </Box>
    </Box>
  );
};

export default PaymentMethod;
