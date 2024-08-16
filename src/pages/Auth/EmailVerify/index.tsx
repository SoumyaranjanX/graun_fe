import React, { useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import tick from "../../../assets/icons/check.png";
//import { getEmailVerificationRequest } from "@/utils/auth/actions/verifyEmailActions"; 
import useVerifyEmailMutation from "@/utils/auth/sagas/verifyEmailSaga";
//import { query } from "firebase/database";

interface VerifyEmailProps {
  verifyEmailState: any; 
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ verifyEmailState }) => {
  document.body.style.background = "#F5F5F5";
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const verifyEmailMutation = useVerifyEmailMutation();

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // console.log("Token from URL:", token);
    if (token) {
      verifyEmailMutation.mutate(token); 
      queryClient.setQueryData("verifyEmail", token);
    }
  }, []);

  const handleBackToSignIn = () => {
    navigate("/"); 
  };

  return (
    <Container maxWidth="xs">
      <Box mt={6} p={4} bgcolor="#FFFFFF" borderRadius={3}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <img src={tick} alt="tick" width={30} />
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            {verifyEmailState.error
            ? "Email Verification Failed"
            : verifyEmailState.loading
            ? "Verifying Your Email. Please Wait."
            : "Email Verification Successful"}
            </Typography>
          </Grid>
          {verifyEmailState.error && (
            <Grid item>
              <Typography variant="body2" sx={{ color: "#red700" }}>
                There was an issue verifying your email. Please try again.
              </Typography>
            </Grid>
          )}
        <Grid item>
        <Button
          variant="text"
          onClick={handleBackToSignIn}
          className="mt-8"
          sx={{ color:'#333', textTransform:'none'}}
        >
          ← Back to sign in
        </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
