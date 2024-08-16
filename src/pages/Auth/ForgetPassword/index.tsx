import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputComponent from "../../../utils/auth/InputComponent/inputComponent";
import AuthHeader from "../Header";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query"; 
import axios from "axios";
import tick from "../../../assets/icons/check.png";
import toast from "react-hot-toast";
import PrivacyFooter from "@/components/privacyFooter";

const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [emailSend, setEmailSend] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const forgotPasswordMutation = useMutation<void, unknown, object>(
    async (data) => {
      try {
        await axios.post(`${VITE_AUTH_API_URL}/api/auth/forgotPassword`, data); 
        console.log("Forget password request successfully");
        setEmailSend(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          toast.error("User not Found");
        } else {
          console.error("Forget password request failed :", error);
        }
      }
    }
  );

  const onSubmit = (data: object) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <>
    <Container maxWidth="xs">
      <Box mt={4}>
        <AuthHeader />
        {!emailSend ? (
          <Box mt={3} p={4} bgcolor="#FFFFFF" borderRadius={3}>
            <>
              <Box textAlign="center" fontSize="1.2rem" fontWeight="500">
                Forgot your password?
                <Typography mt={1} variant="body2" fontWeight="500">
                  No worries, we'll send you reset instructions.
                </Typography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Box>
                  <InputComponent
                    label=""
                    placeholder="Email *"
                    type="text"
                    name="email"
                    icon={false}
                    register={register}
                    isRequiredFailed={true}
                    errorMessage="Enter your email"
                    item={'item'}
                    errors={errors}
                    validationEnabled={{
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    }}
                    inputWidth="100%"
                    mainInputStyle={{ borderRadius: '50px', width: '100%' }}
                  />
                </Box>

                {forgotPasswordMutation.isError && (
                  <Box fontSize="0.6rem" color="red" textAlign="center" mt={2}>
                    {forgotPasswordMutation.error as string}
                  </Box>
                )}

                <Box width="100%">
                  <Button
                    variant="contained"
                    size='large'
                    style={{
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                      borderRadius: '50px',
                      textTransform: 'none',
                    }}
                    type="submit"
                    disabled={forgotPasswordMutation.isLoading}
                  >
                    {forgotPasswordMutation.isLoading ? "Sending..." : "Reset Password"}
                  </Button>
                </Box>
              </form>
              <Box mt={2} textAlign="center">
              <Button onClick={() => navigate("/")} variant="text"
              style={{
                fontSize: '0.5rem',
                fontWeight: 'bold',
                textTransform: 'none',
                color: 'black',
              
              }}
              >
                ← Back to sign in
              </Button>
            </Box>
            </>
          </Box>
        ) : (
          <Box bgcolor="white" borderRadius={3} marginTop="5" height="15rem" width="100%">
            <Box mt={4}>
              <Box mt={4} p={4}>
                <Box display="flex" justifyContent="center" alignItems="center">
                <img src={tick} alt="tick" width={40} /> 
                </Box>
                <Box textAlign="center" marginTop="4">
                  <Typography variant="h6">Check your mail</Typography>
                  <Typography variant="body2">We have sent the reset instructions to your mail.</Typography>
                </Box>
                <Button
                  variant="text"
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    width: '100%',
                    mt: 8,
                  }}
                  onClick={() => {
                    setEmailSend(false);
                    navigate('/');
                  }}
                >
                  ← Back to sign in
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
    <PrivacyFooter />
    </>
  );
};

export default ForgotPasswordPage;
