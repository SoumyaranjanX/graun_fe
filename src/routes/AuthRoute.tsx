import { useAuth } from '@/context/AuthContext';
import { DEFAULT_PAGE, ROUTES } from '@/routes/routingConstants';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AuthRouteProps = { requireAuth: boolean };

const AuthRoute: FC<AuthRouteProps> = (props) => {
  const { requireAuth } = props;
  // TODO: change according to auth flow
  const { token: isUserLoggedIn } = useAuth();

  if (requireAuth) {
    return isUserLoggedIn ? <Outlet /> : <Navigate to={ROUTES.PUBLIC.LOGIN} state={{ from: location }} replace />;
  } else {
    return isUserLoggedIn ? <Navigate to={DEFAULT_PAGE} state={{ from: location }} replace /> : <Outlet />;
  }
};

export default AuthRoute;
