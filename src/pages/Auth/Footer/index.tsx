import React, { useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import google from "../../../assets/icons/google.svg";
import facebook from "../../../assets/icons/facebook.svg";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../../config/firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routingConstants";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

const AuthFooterSignIn: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [userDetails, setUserDetails] = useState<{ idToken: string; displayName: string } | null>(null);

  const fetchUserProgress = async (id: string, idToken: string) => {
    try {
      const response = await fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getUserProgress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
        }),
      });
      const data = await response.json();
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

      login(idToken, redirectPath);
      setTimeout(() => navigate(redirectPath), 1000);
      toast.success('Login Successful :)', {
        style: {
          background: 'green',
          color: '#ffffff',
        },
      });
    } catch (error) {
      const redirectPath = '/Profile';
      login(idToken, redirectPath);
      setTimeout(() => navigate(redirectPath), 1000);
      toast.success('Login Successful :)', {
        style: {
          background: 'green',
          color: '#ffffff',
        },
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      console.log("result",result)
      const idToken = await result.user.getIdToken();
      const user = result.user;
      const email = user.providerData[0].email;
      const displayName = user.providerData[0].displayName;
      localStorage.setItem('email', email);
      const emailVerified = user.emailVerified;

      const response = await fetch(`${VITE_AUTH_API_URL}/api/auth/googleAuth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken, email, displayName, emailVerified: true }),
      });

      const data = await response.json();

      if (response.ok) {
        const responseData = data;
        localStorage.setItem('id', responseData.data.id);
        console.log("resposne: ", responseData.data)
        localStorage.setItem('restaurantId',responseData.data.restaurant?.restaurantId || 0)
        console.log("restaurantId: ", localStorage.getItem('restaurantId'))
        const accessToken = responseData.token.access.token;
        const refreshToken = responseData.token.refresh.token;

       
        await fetchUserProgress(data.data.id, accessToken);
      } else {
        toast.error("Login Failed: " + data.message);
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const user = result.user;
      const email = user.email;
      const displayName = user.displayName;

      if (!email) {
        setUserDetails({ idToken, displayName: displayName ?? "Unknown" });
        setOpen(true);
      } else {
        await signInWithFacebook(idToken, email, displayName ?? "Unknown");
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  const signInWithFacebook = async (idToken: string, email: string, displayName: string) => {
    try {
      const response = await fetch(`${VITE_AUTH_API_URL}/api/auth/facebookAuth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken, email, displayName }),
      });

      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("id", data.data.id);
        // localStorage.setItem("accessToken", idToken);
        // localStorage.setItem("userEmail", data.data.email);
        // localStorage.setItem("userName", data.data.user_name);

        const responseData = data;
        localStorage.setItem('id', responseData.data.id);
        console.log("resposne: ", responseData.data)
        localStorage.setItem('restaurantId',responseData.data.restaurant?.restaurantId || 0)
        console.log("restaurantId: ", localStorage.getItem('restaurantId'))
        const accessToken = responseData.token.access.token;
        const refreshToken = responseData.token.refresh.token;

        await fetchUserProgress(data.data.id, accessToken);
      } else {
        toast.error("Login Failed: " + data.message);
      }
    } catch (error:any) {
      toast.error("Login Failed: " + error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (userDetails) {
      await signInWithFacebook(userDetails.idToken, email, userDetails.displayName);
      setOpen(false);
    }
  };

  const signButtons = [
    { name: "Google", img: google, onClick: handleGoogleSignIn },
    // TODO: Add later
    // { name: "Facebook", img: facebook, onClick: handleFacebookSignIn },
  ];

  return (
    <Box display="flex" justifyContent="space-evenly" width="100%" mt={2}>
      {signButtons.map((item, index) => (
        <Box
          key={index}
          borderRadius="30px"
          border="1px solid"
          width="45%"
          height="2rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={item.onClick}
        >
          <img src={item.img} alt={item.name} height={5} style={{ height: "20px", marginRight: "5px" }} />
          {item.name}
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To continue with Facebook sign-in, please provide your email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthFooterSignIn;
