import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { PaletteOptions, Theme, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';
import { createContext, useMemo, useState } from 'react';
import colors from '@/assets/scss/theme-variables.module.scss';
import { PaletteMode } from '@mui/material';
import { useLocalStorage, usePreferDarkMode } from '@/hooks';

type ThemeType = 'light' | 'dark';

type Props = {
  children?: React.ReactNode;
};

type InitialType = {
  mode: ThemeType;
  toggleTheme: () => void;
};

type InitialTheme = {
  mode: PaletteMode;
  toggleTheme: () => void;
  globalAlert: AlertState;
  toggleAlert: (alertState: AlertState) => void;
  showAlert: (alertState: AlertState) => void;
};
export interface AlertState {
  open?: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout?: number;
}

export const initialAlertState: AlertState = {
  open: false,
  type: 'success',
  message: '',
  timeout: 2000,
};

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 767,
    md: 991,
    lg: 1200,
    xl: 1536,
  },
});

export const ThemeContext = createContext<InitialTheme>({
  mode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  globalAlert: initialAlertState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleAlert: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showAlert: () => {},
});

// children with ReactNode type
// eslint-disable-next-line react/prop-types
export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const prefersDarkMode = usePreferDarkMode();
  const [savedTheme, setSavedTheme] = useLocalStorage('default-theme');
  const getDefaultTheme = (): PaletteMode => {
    const browserDefault: PaletteMode = prefersDarkMode ? 'light' : 'dark';
    return savedTheme || browserDefault;
  };
  const [mode, setMode] = useState<ThemeType>(getDefaultTheme());
  const [globalAlert, setGlobalAlert] = useState(initialAlertState);
  const colorMode = useMemo<InitialType>(
    () => ({
      toggleTheme: () => {
        const nextThemeMode: ThemeType = mode === 'dark' ? 'light' : 'dark';
        setMode(nextThemeMode);
        setSavedTheme(nextThemeMode);
      },
      mode,
    }),
    [mode],
  );
  const alertState = useMemo(
    () => ({
      globalAlert,
      toggleAlert: (alertState: AlertState) => {
        setGlobalAlert({ ...initialAlertState, ...alertState });
      },
      showAlert: (alertState: AlertState) => {
        setGlobalAlert({ ...initialAlertState, open: true, ...alertState });
      },
    }),
    [globalAlert],
  );
  // NOTE: CHANGE OR REMOVE IT ACCORDINGLY ****************************

  // color configuration for light mode
  const lightPalette = useMemo<PaletteOptions>(
    () => ({
      primary: {
        main: colors.colorPrimarylight,
      },
      secondary: {
        main: colors.colorSecondarylight,
      },
      background: {
        default: '#FAFAFA',
        paper: '#fcfcfc',
        lightGrey: colors.colorLightGreylight,
        darkGrey: colors.colorBackgroundlight,
      },
      text: {
        primary: colors.colorTextPrimarylight,
        disabled: '#C3C1BD',
        secondary: colors.colorTextSecondarylight,
        tertiary: colors.colorTextTertiarylight,
      },
    }),
    [],
  );

  const theme = useMemo<Theme>(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: lightPalette,
          typography: {
            fontFamily: 'Metropolis',
            body1: {
              lineHeight: '20px',
            },
            body2: {
              lineHeight: '18px',
            },
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 767,
              md: 991,
              lg: 1200,
              xl: 1536,
            },
          },
        }),
      ),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ ...colorMode, ...alertState }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
