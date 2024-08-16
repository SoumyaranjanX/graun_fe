import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WidthFull } from '@mui/icons-material';
 
const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
 
    const handleBackToHome = () => {
        navigate('/order');
    };
 
    return (
        <Container maxWidth="sm" style={{ marginTop: '5%', marginBottom: '5%' }}>
 
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    minWidth: '50vh',
                    textAlign: 'center',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
            ><Typography className='beta-container' variant="h6" sx={{ fontFamily: "'CircularStdBold', Arial, sans-serif", fontWeight: "bold", marginBottom: '20px' }}>
                    GRAUN
                </Typography>
                <Typography variant="h4" gutterBottom style={{ color: '#333', paddingBottom: '10px' }}>
                    Payment Method Setup Successful
                </Typography>
 
                <Typography variant="body1" gutterBottom style={{ marginBottom: '20px' }}>
                    Graun admin have received your request and your Subscription request will be activated within 24 hours.
                </Typography>
                <Typography variant="body1" gutterBottom style={{ marginBottom: '20px' }}>
                    After you email your menu at <a href="mailto:info@grauns.com"><span style={{ color: 'black', fontWeight: 'bold' }}>info@grauns.com</span></a> for seamless integration.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackToHome}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#333',
                        color: '#fff',
                        borderRadius: '30px',
                        transition: 'background-color 0.3s',
                        textTransform: 'capitalize'
                    }}
                >
                    go home
                </Button>
            </Box>
        </Container>
    );
};
 
export default PaymentSuccess;