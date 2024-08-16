import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Button, Container } from "@mui/material";
import InputComponent from "../../../utils/auth/InputComponent/inputComponent";
import { resetPassword } from "../../../utils/auth/InputComponent/inputComponentData";
import AuthHeader from "../Header";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { postApi } from '../../../utils/auth/services/apiinterface';
import tick from "../../../assets/icons/check.png";
import PrivacyFooter from "@/components/privacyFooter";

interface ResetPasswordProps {
  resetPasswordRes: any;
}

const ResetPasswordPage: React.FC<ResetPasswordProps> = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
  }, []);

  const resetPasswordMutation = useMutation((body: { password: string; token: string | null }) => {
    return postApi(`/api/auth/resetPassword?token=${body.token}`, { password: body.password });
  });

  const onSubmit = (data: any) => {
    const { password } = data;
    const body = { password, token };
    resetPasswordMutation.mutate(body);
  };

  return (
    <>
      {resetPasswordMutation.isSuccess && resetPasswordMutation.data?.statusCode === 200 ? (
        <Container maxWidth="xs">
        <Box bgcolor="white" borderRadius={3} mt={3} p={4} >
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={tick} alt="tick" width={40} />
          </Box>
          <Box mt={2} textAlign="center">
            <Typography variant="h6">Password Updated Successfully</Typography>
          </Box>
          <Box mt={3} textAlign="center">
            <Button onClick={() => navigate("/")} variant="text">
              ← Back to sign in
            </Button>
          </Box>
        </Box>
      </Container>
    ) : (
      <>
      <Container maxWidth="xs">
        <Box mt={2}>
        <AuthHeader />
          <Box bgcolor="white" borderRadius={3} p={4} mt={3}>
            <Box mt={2} textAlign="center">
              <Typography variant="body1" align="center" gutterBottom sx={{ fontWeight: "bold" }}>Change Your Password</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {resetPassword.map((item, index) => (
                  <Box key={index}>
                    <InputComponent
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
                <Box p={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    sx={{
                      backgroundColor:'rgba(0, 0, 0, 0.8)',
                      color: "white",
                      width: "100%",
                      borderRadius: "50px",
                      // height: "3rem",
                      transition: 'background-color 0.3s', 
                            '&:hover': {
                           backgroundColor: 'black',
                            },
                      textTransform: 'none',
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
      </Box>
      </Container>
      <PrivacyFooter />
      </>
      )}
      <PrivacyFooter />
    </>
  );
};

export default ResetPasswordPage;
