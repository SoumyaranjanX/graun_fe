import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Grid, Box, Container, Divider } from "@mui/material";
import InputComponent from "../../../utils/auth/InputComponent/inputComponent";
import { logInData } from "../../../utils/auth/InputComponent/inputComponentData";
import AuthFooterSignIn from "../Footer";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import AuthHeader from "../Header";
import tick from "../../../assets/icons/check.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrivacyFooter from "@/components/privacyFooter";

interface SignUpFormData {
  user_name: string;
  email: string;
  password: string;
}

const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const SignUpPage: React.FC = () => {
  document.body.style.background = "#F5F5F5";
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [showEmailVerification, setShowEmailVerification] = useState<boolean>(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const signUpMutation = useMutation((data: SignUpFormData) =>
    fetchSignUpData(data)
  );

  const fetchSignUpData = async (data: SignUpFormData) => {
    try {
      const response = await axios.post(`${VITE_AUTH_API_URL}/api/auth/signUp`, data);
      console.log("signUP",response);
      return response.data;
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          throw new Error("Email already exists");
        }
      }
      throw new Error("Failed to sign up");
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    setEmail(data.email);

    try {
      const responseData = await signUpMutation.mutateAsync({
        user_name: data.user_name,
        email: data.email,
        password: data.password,
      });

      if (responseData?.statusCode === 200) {
        setShowEmailVerification(true); 
        return;
      } else {
        toast.error("Sign up failed");
      }
    } catch (error:any) {
      console.error("Error signing up:", error);
      if (error.message === "Email already exists") {
        toast.error("User already Exist.");
      } else {
        toast.error("An error occurred while signing up");
      }
    }
  };

  const resendVerificationEmail = () => {
    handleSubmit(onSubmit)();
    toast.success("Email has been sent");
  };

  return (
    <>
      {!showEmailVerification ? (
        <Container maxWidth="xs">
          <Box mt={4}>
            <AuthHeader />
            <Box mt={3} p={5} bgcolor="#FFFFFF" borderRadius={3} height="auto">
              <Typography variant="body2" align="center" mb={2} gutterBottom sx={{ fontWeight: 'bold' }}>
                Create your account
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {logInData.map((item, index) => (
                  <Box key={index}>
                    <InputComponent
                      variant="outlined"
                      label={item.label}
                      placeholder={item.placeholder}
                      type={item.type}
                      name={item.name}
                      icon={item.icon}
                      register={register}
                      isRequiredFailed={true}
                      errorMessage={item.errorMsg}
                      item={item}
                      errors={errors}
                      validationEnabled={item.validationEnabled}
                    />
                  </Box>
                ))}
                <Box p={1}>
                  <Button
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
                    Sign up
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
                        Or Sign up with
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Divider />
                  </Grid>
                </Grid>
                <AuthFooterSignIn />
              </Box>

              <Box mt={3} textAlign="center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize',
                      color: 'black',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Sign in instead
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="xs" style={{ height: '100vh' }}>
          <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '100%', width: '460px' }}>
            <Box p={5} bgcolor="white" borderRadius={3}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={tick} alt="tick" width={30} />
              </Box>
              <Box mt={2} textAlign="center">
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Please verify your email
                </Typography>
                <Typography variant="body2" mt={1}>
                  You're almost there! We sent an email to {signUpMutation.data?.data.email}
                </Typography>
                <Typography variant="body2">Just click on the link in that email to complete your SignUp.</Typography>
                <Typography variant="body2" mt={2}>
                  Still can't find the email?{' '}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      textDecoration: 'underline',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    onClick={resendVerificationEmail}
                  >
                    Resend Verification Email
                  </Typography>
                </Typography>
              </Box>
              <Box mt={2} textAlign="center">
                <Button onClick={() => navigate('/')} variant="text" sx={{ color: '#333', textTransform: 'none' }}>
                  ← Back to sign in
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
      )}
      <PrivacyFooter/>
    </>
  );
}
export default SignUpPage;
