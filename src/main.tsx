import '@/assets/scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import I18nProvider from '@/context/i18nProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AppThemeProvider } from '@/themes/AppThemeProvider';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './i18n';
import { Toaster } from 'react-hot-toast';
//import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60000 },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <BrowserRouter>
          <AuthProvider>
            <AppThemeProvider>
              <I18nProvider>
              <Toaster position="top-right" reverseOrder={false} />
                <App />
              </I18nProvider>
            </AppThemeProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
