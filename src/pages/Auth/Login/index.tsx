import React, { useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Typography, Box, Container, Divider, Grid, Link } from '@mui/material';
import InputComponent from '../../../utils/auth/InputComponent/inputComponent';
import { SignInData } from '../../../utils/auth/InputComponent/inputComponentData';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthHeader from '../Header';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes/routingConstants';
import AuthFooterSignIn from '../Footer';
import PrivacyFooter from '@/components/privacyFooter';

interface LoginFormData {
  email: string;
  password: string;
}

const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

const LoginPage: React.FC = () => {
  document.body.style.background = '#F5F5F5';
  const navigate = useNavigate();
  const { t } = useTranslation(undefined, { keyPrefix: 'pages.Login' });
  const { login } = useAuth();
  const { PRIVATE } = ROUTES;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormData>();
  
  const logInMutation = useMutation(
    (payload: LoginFormData) => axios.post(`${VITE_AUTH_API_URL}/api/auth/logIn`, payload),
    {
      onSuccess: (response) => {
        const responseData = response.data;
        localStorage.setItem('id', responseData.data.id);
        localStorage.setItem('restaurantId',responseData.data.restaurant?.restaurantId || 0)
        localStorage.setItem("email", response.data.data.email);
        const accessToken = responseData.token.access.token;
        const refreshToken = responseData.token.refresh.token;

        if (localStorage.getItem('id')) {
          const id = localStorage.getItem('id');
          fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getUserProgress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              const trackNumber = data.currentTrack;
              let redirectPath = '/';

              switch (trackNumber) {
                case 1:
                  redirectPath = '/working-hours';
                  break;
                case 2:
                  redirectPath = '/terms-and-conditions';
                  break;
                case 3:
                  redirectPath = '/Payment';
                  break;
                case 4:
                  redirectPath = '/Integrations';
                  break;
                case 5:
                  redirectPath = '/orders';
                  break;
                default:
                  redirectPath = '/Profile';
              }

              login(accessToken, redirectPath, trackNumber);
              setTimeout(() => navigate(redirectPath), 1000);
              toast.success('Login Successful :)', {
                style: {
                  background: 'green',
                  color: '#ffffff',
                },
              });
            })
            .catch((error) => {
              if(responseData.status === 404){
                const redirectPath = '/Profile';
                login(accessToken, redirectPath, 0);
                setTimeout(() => navigate(redirectPath), 1000);
                toast.success('Login Successful :)', {
                  style: {
                    background: 'green',
                    color: '#ffffff',
                  },
                });
              }else{
              toast.error('Incorrect Email and Password :(');
              }
            });
        }
      },
      onError: (error: any) => {
        console.error('Login failed:', error);
        toast.error('Incorrect Email and Password :(');
      },
    }
  );

  const onSubmit = (formData: LoginFormData) => {
    logInMutation.mutate(formData);
  };

  const handleInputChange = (name: keyof LoginFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
  };

  useEffect(() => {
    // Establecer foco en el primer campo de texto o el botón de login
    const emailField = document.getElementById('email');
    if (emailField) {
      emailField.focus();
    }

    // Opcional: Deshabilitar el enlace "Forgot your password?" al presionar Enter
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('login-button')?.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Limpieza
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        <Box mt={4}>
          <AuthHeader />
          <Box mt={3} p={5} bgcolor="#FFFFFF" borderRadius={3}>
            <Typography variant="body2" align="center" mb={2} gutterBottom sx={{ fontWeight: 'bold' }}>
              Sign in to your account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {SignInData.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <InputComponent
                      label={item.label}
                      placeholder={item.placeholder}
                      type={item.type}
                      name={item.name}
                      id={item.name} // Añadir ID para enfocar
                      icon={item.icon}
                      register={register}
                      isRequiredFailed={true}
                      errorMessage={item.errorMsg}
                      item={item}
                      errors={errors}
                      validationEnabled={item.validationEnabled}
                      onChange={handleInputChange(item.name)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/forgotPassword')}
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: 'black',
                  }}
                  // Se asegura que no sea enfocado con "Enter"
                  tabIndex={-1}
                >
                  Forgot your password?
                </Link>
              </Box>
              <Box p={1}>
                <Button
                  id="login-button" // Añadir ID para referencia
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    width: '100%',
                    borderRadius: '50px',
                    textTransform: 'none',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </form>
            <Box mt={1} display="flex" flexDirection="column" alignItems="center">
              <Grid container alignItems="center">
                <Grid item xs>
                  <Divider />
                </Grid>
                <Grid item>
                  <Box mx={1}>
                    <Typography variant="body2" color="text.secondary">
                      Or Sign in with
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Divider />
                </Grid>
              </Grid>
              <AuthFooterSignIn />
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                New on our Platform?{' '}
                <Typography
                  variant="body2"
                  component="span"
                  fontWeight="bold"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/signUp')}
                >
                  Create an account
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <PrivacyFooter />
    </>
  );
};

export default LoginPage;
