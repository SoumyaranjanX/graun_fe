import { PageLoader } from '@/components/ui';
import { DEFAULT_PAGE, ROUTES } from '@/routes/routingConstants';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Layout from '@/components/ui/Layout';
import UberAuthCallback from '@/pages/Auth/uber/UberCallback';
import Profile1 from '@/pages/RestaurantPages/Profile/Profile1';

const Deliveries = lazy(() => import('@/pages/RestaurantPages/Deliveries'));
const Orders = lazy(() => import('@/pages/RestaurantPages/Orders'));
const Dashboard = lazy(() => import('@/pages/RestaurantPages/Dashboard'));
const PaymentMethod = lazy(() => import('@/pages/Profile/PaymentMethod'));
// const Profile = lazy(() => import('@/pages/RestaurantPages/Profile/profile'));
const WorkingHours = lazy(() => import('@/pages/RestaurantPages/Profile/workingHours'));
const TermsConditions = lazy(() => import('@/pages/RestaurantPages/Profile/termsCondition'));
const Payment = lazy(() => import('@/pages/RestaurantPages/Profile/paymentForm'));
const Integrations = lazy(() => import('@/pages/RestaurantPages/Profile/integration'));
const Profile = lazy(() => import('@/pages/RestaurantPages/Profile/profile'));
const Help = lazy(() => import('@/pages/RestaurantPages/Help'));
const RestProfile = lazy(() => import('@/pages/RestaurantPages/RestaurantProfile/index'));
const PrivacyPolicy = lazy(() => import('@/utils/auth/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('@/utils/auth/TermsOfUse'));
const Subscription = lazy(() => import('@/pages/RestaurantPages/Profile/subscription'));
const Subscription_payment = lazy(() => import('@/pages/RestaurantPages/Profile/subscriptionPayment'));

const { PRIVATE } = ROUTES;

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<AuthRoute requireAuth />}>
          <Route index element={<Navigate to={DEFAULT_PAGE} replace />} />
          <Route
            path={PRIVATE.DASHBOARD}
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path={PRIVATE.ORDER}
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route
            path={PRIVATE.ORDER_LIST}
            element={
              <Layout>
                <Orders />
              </Layout>
            }
          />
          <Route path={PRIVATE.PROFILE} element={<Profile />} />
          <Route path='/profile1' element={<Profile1 />} />
          <Route path={PRIVATE.WORKING_HOURS} element={<WorkingHours />} />
          <Route path={PRIVATE.TERMS_CONDITIONS} element={<TermsConditions />} />
          <Route path={PRIVATE.PAYMENT} element={<Payment />} />
          <Route path={PRIVATE.INTEGRATIONS} element={<Integrations />} />
          <Route path={PRIVATE.SUBSCRIPTION} element={<Subscription />} />
          <Route
            path={PRIVATE.DELIVERIES}
            element={
              <Layout>
                <Deliveries />
              </Layout>
            }
          />
          <Route
            path={PRIVATE.RESTAURANT_PROFILE}
            element={
              <Layout>
                <RestProfile />
              </Layout>
            }
          />
          <Route
            path={PRIVATE.HELP_SUPPORT}
            element={
              <Layout>
                <Help />
              </Layout>
            }
          />
          <Route path={PRIVATE.TERMS_OF_USE} element={<TermsOfUse />} />
          <Route path={PRIVATE.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path={PRIVATE.PAYMENT_METHOD} element={<PaymentMethod />} />
          <Route path={PRIVATE.UBER_CALLBACK_URL} element={<UberAuthCallback />} />
        </Route>
        <Route path="*" element={<Navigate to={DEFAULT_PAGE} replace />} />
        <Route path="" element={<Navigate to={DEFAULT_PAGE} replace />} />
        <Route path={PRIVATE.SUBSCRIPTION_SUCCESS} element={<Subscription_payment />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
