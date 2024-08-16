/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_PAGE, ROUTES } from '@/routes/routingConstants';
import { LOCAL_STORAGE_KEYS } from '@/config/app';
import { dispatchInstance, orderInstance, restaurantInstance, setLogoutFunction } from '@/config/api';

// Define types for the auth context
type AuthContextType = {
  token: string | null;
  login: (token: string, redirect: string, trackNumber: any) => void;
  logout: () => void;
  pageTracker: any;
  isLoading: boolean;
  setIsLoading: (loadingState: boolean) => void;
};
const initialValue = {
  token: null,
  login: () => {},
  logout: () => {},
  pageTracker: null,
  isLoading: false,
  setIsLoading: () => {},
};
//Create context
const AuthContext = createContext<AuthContextType>(initialValue);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_KEYS.token) || null);
  const [pageTracker, setPageTracker] = useState<any>(localStorage.getItem('pageTracker') || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { PUBLIC, PRIVATE } = ROUTES;

  // Login function
  const login = (token: string, redirect: string = DEFAULT_PAGE, trackNumber: any) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
    localStorage.setItem('pageTracker', trackNumber);
    setToken(token);
    setPageTracker(trackNumber);
    dispatchInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    orderInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    restaurantInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate(redirect);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem('pageTracker');
    localStorage.removeItem('id');
    localStorage.removeItem('restaurantId');
    localStorage.removeItem('email');
    setToken(null);
    setPageTracker(null);
    delete dispatchInstance.defaults.headers.common['Authorization'];
    delete orderInstance.defaults.headers.common['Authorization'];
    delete restaurantInstance.defaults.headers.common['Authorization'];
    navigate(PUBLIC.LOGIN);
  };

  setLogoutFunction(logout);

  const authContextValue: AuthContextType = {
    token,
    login,
    logout,
    pageTracker,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
