import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/routes/routingConstants';
import { PageLoader } from '@/components/ui';
import AuthRoute from './AuthRoute';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import VerifyEmail from '../pages/Auth/EmailVerify'
import ResetPassword from '../pages/Auth/ResetPassword';
import Home from '../pages/Auth/HomePage';
import PrivacyPolicy from '@/utils/auth/PrivacyPolicy';
import TermsOfUse from '@/utils/auth/TermsOfUse';

const CreateAccount = lazy(() => import('@/pages/Auth/CreateAccount'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const { PUBLIC } = ROUTES;

const Routing = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<AuthRoute requireAuth={false} />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
          <Route path={PUBLIC.LOGIN} element={<Login />} />
          <Route path={PUBLIC.CREATE_ACCOUNT} element={<CreateAccount />} />
          <Route path={PUBLIC.FORGOT_PASSWORD} element={<ForgetPassword/>} />
          <Route path={PUBLIC.RESET_PASSWORD} element={<ResetPassword resetPasswordRes={ResetPassword} />} />
          <Route path={PUBLIC.EMAIL_VERIFY} element={<VerifyEmail verifyEmailState={VerifyEmail} />} />
          <Route path="*" element={<Navigate to={PUBLIC.LOGIN} replace />} /> {/* handles 404 */}
          <Route path="" element={<Navigate to={PUBLIC.LOGIN} replace />} />
          <Route path={PUBLIC.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={PUBLIC.TERMS_OF_USE} element={<TermsOfUse />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
