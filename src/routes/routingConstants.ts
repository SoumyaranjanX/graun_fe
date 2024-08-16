export const ROUTES = {
  PRIVATE: {
    DASHBOARD: '/dashboard',
    ORDER: '/orders',
    DELIVERIES: '/deliveries',
    PAYMENT_METHOD: '/payment-method',
    PROFILE: '/profile',
    WORKING_HOURS: '/working-hours',
    TERMS_CONDITIONS: '/terms-and-conditions',
    PAYMENT: '/payment',
    INTEGRATIONS: '/integrations',
    HELP_SUPPORT: '/help',
    UBER_CALLBACK_URL: '/uber_auth_callback',
    ORDER_LIST: 'orders-list',
    RESTAURANT_PROFILE: '/restaurantProfile',
    PRIVACY_POLICY: '/privacyPolicy',
    TERMS_OF_USE: '/termsOfUse',
    SUBSCRIPTION: '/subscription',
    SUBSCRIPTION_SUCCESS: '/subscription_payment',
  },
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    CREATE_ACCOUNT: '/signUp',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword',
    EMAIL_VERIFY: '/verifyEmail',
    PRIVACY_POLICY: '/privacyPolicy',
    TERMS_OF_USE: '/termsOfUse',
  },
};

// navigate to DEFAULT_PAGE on login
export const DEFAULT_PAGE = ROUTES.PRIVATE.ORDER; // TODO: change to dashboard after dashboard integration
