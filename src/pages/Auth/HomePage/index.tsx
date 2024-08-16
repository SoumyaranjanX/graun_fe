import React, { useEffect, useState } from 'react';
import { Button, Divider, Typography, Box, Grid, Link } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import styled from '@emotion/styled';
import "@/assets/scss/homePage/homePage.css";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routingConstants';
import AuthFooterSignIn from '@/pages/Auth/Footer';
import '@/utils/auth/index.css';

const Circle = styled(Box)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &.zoom-enter {
    transform: translate(-50%, -50%) scale(1);
  }
  &.zoom-enter-active {
    transform: translate(-50%, -50%) scale(50);
    transition: transform 2s;
  }
  &.zoom-exit {
    transform: translate(-50%, -50%) scale(50);
  }
  &.zoom-exit-active {
    transform: translate(-50%, -50%) scale(1);
    transition: transform 2s;
  }
`;

const HalfCircle = styled(Box)`
  width: 100%;
  height: 50%;
  
  background-color: #F5F5F5;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-100%) rotate(180deg);
  &.slide-enter {
    transform: translateX(-50%) translateY(-100%);
  }
  &.slide-enter-active {
    transform: translateX(-50%) translateY(0);
    transition: transform 2s;
  }
  &.slide-exit {
    transform: translateX(-50%) translateY(0);
  }
  &.slide-exit-active {
    transform: translateX(-50%) translateY(-100%);
    transition: transform 2s;
  }
`;

const Home: React.FC = () => {
  const [stage, setStage] = useState(1);
  const [animateOut, setAnimateOut] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const navigate = useNavigate();
  const { PUBLIC } = ROUTES;
  

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(2), 2000), // Zoom out circle
      setTimeout(() => setStage(3), 3000), // Display text "GRAUN"
      setTimeout(() => setStage(4), 8000), // Display gray background
      setTimeout(() => setStage(5), 9000), // Slide in semicircle
      setTimeout(() => setStage(6), 10000), // Drop Graun 
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleButtonClick = (path: string) => {
    setRedirectPath(path);
    setAnimateOut(true);
  };

  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        navigate(redirectPath);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [animateOut, redirectPath, navigate]);
  const currentYear = new Date().getFullYear();
  return (
    <Box position="relative" height="100vh" width="100vw" bgcolor={stage <= 3 ? "#f5f5f5" : "#f5f5f5"}>
      <CSSTransition
        in={stage === 1 && !animateOut}
        timeout={2000}
        classNames="zoom"
        unmountOnExit
      >
        <Circle />
      </CSSTransition>
      <CSSTransition
        in={stage === 2 && !animateOut}
        timeout={2000}
        classNames="zoom"
        unmountOnExit
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)', color: 'black' }}
        >
          <Typography variant="h4" sx={{fontFamily: "'CircularStdBold', Arial, sans-serif"}}>
            GRAUN
          </Typography>
        </Box>
      </CSSTransition>
      {stage >= 4 && (
        <Box textAlign="center" mt={30} pt={4} px={2}>
          <Typography variant="h4" gutterBottom>
            Welcome to Your
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Restaurant App
          </Typography>
          <Box p={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              onClick={() => handleButtonClick(PUBLIC.CREATE_ACCOUNT)}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: "white",
                width: "80%",
                maxWidth: "300px",
                borderRadius: "50px",
                height: "3rem",
                textTransform: 'none',
                transition: 'background-color 0.3s', 
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
            >
              Create a new account
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontSize: '1.2rem' }}>
            I already have an account { ' '}
            <Typography
              variant="body2"
              component="span"
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.2rem',
                textTransform: 'capitalize',
                color: 'black',
              }}
              onClick={() => handleButtonClick(PUBLIC.LOGIN)}
            >
              Sign in 
            </Typography>
          </Typography>
          <Box mt={1} display="flex" flexDirection="column" alignItems="center">
            <Grid container alignItems="center">
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item>
                <Box mx={1}>
                  <Typography variant="h6" color="text.secondary">
                    Or Sign up with
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
            <Box sx={{width:'20%'}}>
            <AuthFooterSignIn style={{ width: '25%', borderRadius:'1px',height:'30px' }} />
            </Box>
            <Box mt={35} display="flex" justifyContent="center">
            <Box style={
            {
              position: 'absolute',
              
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px',
              color: '#b3b3b3',
            }
          }
          sx={{ 'span:hover': { color: '#000' } }}
          >Copyright @ {currentYear} GRAUN. All rights reserved.
           <span
          className="privacyPolicy"
          style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '15px', fontWeight: 'bolder', fontSize: '15px' }}
          onClick={() => navigate('/privacyPolicy')}
        >
          Privacy Policy
        </span>
        <span> {'|'}</span>
        <span
          style={{ cursor: 'pointer', marginLeft: '15px', fontWeight: 'bolder', fontSize: '15px' }}
          onClick={() => navigate('/TermsofUse')}
        >
          Terms of Use
        </span>
          </Box>
            </Box>
          </Box>
        </Box>
      )}
      <CSSTransition
        in={stage === 5 && !animateOut}
       
        unmountOnExit
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
      >
        <HalfCircle />
      </CSSTransition>
      <CSSTransition
        in={stage === 6 && !animateOut}
        timeout={2000}
        classNames="slide"
        unmountOnExit
        addEndListener={(node, done) => {
          node.addEventListener("transitionend", done, false);
        }}
      >
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'absolute', top: '-10rem', left: '50%', transform: 'translate(-50%, -50%)'}}
      >
        <Typography className='beta-container' variant="h6" fontWeight="bold" gutterBottom style={{ fontFamily: "'CircularStdBold', Arial, sans-serif", fontSize: '2.2rem' }}>
            GRAUN
            <div className='beta-label'>Beta</div>
          </Typography>
        </Box>
      </CSSTransition>
    </Box>
  );
};

export default Home;
