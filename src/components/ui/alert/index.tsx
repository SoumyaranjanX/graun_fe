import { useTheme } from '@/hooks';
import { initialAlertState } from '@/themes/AppThemeProvider';
import { Alert, Snackbar as MuiSnackbar, SnackbarCloseReason } from '@mui/material';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';

const Snackbar = () => {
  const { globalAlert, toggleAlert } = useTheme();

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason !== 'clickaway' && toggleAlert({ ...initialAlertState, open: false });

  

  return (
    <MuiSnackbar
      open={globalAlert.open}
      autoHideDuration={globalAlert.timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={globalAlert.type}
        icon={false}
        sx={{
          //el el saverity es succes aplicamos todos estos estilos
          width: '100%',
          height: '10%',
          backgroundColor: globalAlert.type === 'success' ? 'white' : 'white',
          border: '1px solid #0000001A',
          borderRadius: '15px',
          color: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          {globalAlert.type === 'error' && (
            <RxCrossCircled
              style={{
                color: 'red',
                fontSize: '2rem',
                gap: '10px',
                marginRight: '10px',
              }}
            />
          )}
          {globalAlert.type === 'success' && (
            <IoIosCheckmarkCircleOutline
              style={{
                color: 'green',
                fontSize: '2rem',
                gap: '10px',
                marginRight: '10px',
              }}
            />
          )}
          <div
            style={{
              marginTop: '7px',
            }}
          >
            {globalAlert.message}
          </div>
        </div>
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
