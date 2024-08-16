import { useTheme } from '@/hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PageLoader } from './components/ui';
import Snackbar from './components/ui/alert';
import Routing from './routes/Routing';
import { CssBaseline } from '@mui/material';
import PrivateRoutes from './routes/PrivateRoutes';
import { useAuth } from './context/AuthContext';

function App() {
  const { mode } = useTheme();

  useLayoutEffect(() => {
    document.body.classList.add(`theme-${mode}`);
    return () => document.body.classList.remove(`theme-${mode}`);
  }, [mode]);

  const { token: isUserLoggedIn, pageTracker, isLoading } = useAuth();

  return (
    <>
      <CssBaseline />
      <Snackbar />
      {
        isUserLoggedIn ? (
          <>
            {isLoading && <PageLoader />}
            <PrivateRoutes />
          </>
        ) : (
          <>
            {isLoading && <PageLoader />}
            <Routing />
          </>
        )
      }
    </>
  );
}

export default App;
