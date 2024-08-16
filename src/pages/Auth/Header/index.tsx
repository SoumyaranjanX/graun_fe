import React from "react";
import { Typography, Box } from "@mui/material";
import "@/utils/auth/index.css";

const AuthHeader: React.FC = () => {
  return (
    <Box textAlign="center">
      <Typography className='beta-container' variant="h6" sx={{ fontFamily: "'CircularStdBold', Arial, sans-serif", fontWeight:"bold" }}>
        GRAUN
        <div className='beta-label'>Beta</div>
      </Typography>
      <Typography variant="body1" sx={{  color: 'rgba(0, 0, 0, 0.8)' }}>
        Make your restaurant management{" "}
        <Typography variant="body1" component="span" sx={{ fontWeight: "bolder" }}>
          Easy and fun!
        </Typography>
      </Typography>
    </Box>
  );
};

export default AuthHeader;
