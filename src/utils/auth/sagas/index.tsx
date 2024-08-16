import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastProvider } from 'react-toast-notifications';

import SignUpForm from '../../../pages/Auth/CreateAccount';
import VerifyEmailForm from '../../../pages/Auth/EmailVerify';
import LogInForm from '../../../pages/Auth/Login';
import ForgotPasswordForm from '../../../pages/Auth/ForgetPassword';
import ResetPasswordForm from '../../../pages/Auth/ResetPassword';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SignUpForm />
        <VerifyEmailForm verifyEmailState={undefined} />
        <LogInForm />
        <ForgotPasswordForm />
        <ResetPasswordForm />
        <ReactQueryDevtools initialIsOpen={false} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
