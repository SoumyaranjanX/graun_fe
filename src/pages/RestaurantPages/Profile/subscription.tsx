import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubscribeService from '@/services/dispatch/api/set-subscription';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PrivacyFooter from '@/components/privacyFooter'
Modal.setAppElement('#root');
 
const SubscriptionPlans = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [planPrice, setPlanPrice] = useState<string | null>(null);
    const [priceId, setPriceId] = useState<string | null>(null);
    const [plans, setPlans] = useState<any[]>([]);
    const [hasSubscription, setHasSubscription] = useState<boolean>(false);
    const [subscriptionTypeId, setSubscriptionTypeId] = useState<number | null>(null);
    const [subscriptionDate, setSubscriptionDate] = useState<Date | null>(null);
    const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
    const { mutate: subscribe } = SubscribeService();
 
    // Example feature constants
    interface FeaturesType {
        [key: string]: string[];
    }
    const FEATURES: FeaturesType = {
        FREE: ['Free to use for 14 day’s ', 'Free Email Support ', 'Free Full access to all the features ', ' Dispatch features not included', 'No onbording fees'],
        PREMIUM: ['Paid Monthly ', '24 Hour’s  Email Support ', 'Access to all the features ', 'Get Unlimited orders ', 'Weekly, Monthly Email Reports', 'Notification Reminders ', 'Exclusive Content ']
    };
 
    useEffect(() => {
        const id = localStorage.getItem('id');
        const fetchCardDetails = async () => {
            const res = await fetch(
                'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/get-restaurant',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                },
            );
            const data = await res.json();
            const restaurantId = data.id;
            localStorage.setItem('restaurantId', restaurantId);
            if (!restaurantId) {
                console.error('Restaurant ID not found in local storage');
                return;
            }
 
            try {
                const response = await fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getCardDetails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ restaurantId }),
                });
 
                if (!response.ok) {
                    navigate('/payment');
                }
            } catch (error) {
                console.error('Failed to fetch card details:', error);
            }
        };
 
        fetchCardDetails();
    }, []);
 
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(
                    'https://aws-nlb-prod.grauns.com/charging/api/get-subscriptions'
                );
                if (response.data.success) {
                    setPlans(response.data.data);
                } else {
                    alert(response.data.message || 'Failed to fetch plans.');
                }
            } catch (error) {
                console.error('Error fetching subscription plans:', error);
                alert('An error occurred while fetching subscription plans.');
            }
        };
 
        fetchPlans();
    }, []);
 
    useEffect(() => {
        const fetchSubscriptionDetails = async () => {
            try {
                const response = await axios.get(
                    'https://aws-nlb-prod.grauns.com/charging/api/subscription-details',
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                console.log(response.data.data)
 
 
                if (response.data.data.length > 0) {
                    setHasSubscription(true);
                    setSubscriptionTypeId(response.data.data[0].subscriptionTypeId);
                    // setSubscriptionTypeId(1)
                } else {
                    setHasSubscription(false);
                }
            } catch (error) {
                console.error('Error fetching subscription details:', error);
                alert('An error occurred while fetching subscription details.');
            }
        };
 
        fetchSubscriptionDetails();
    }, [token]);
 
    const handleConfirmSubscription = async () => {
        if (!selectedPlan || !priceId) return;
        try {
            subscribe({ priceId }, {
                onSuccess: () => {
                    closeModal();
                    navigate('/subscription_payment');
                },
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your subscription.');
        }
    };
    const calculateTrialEndDate = () => {
        const today = new Date();
        const trialEnd = new Date(today);
        trialEnd.setDate(today.getDate() + 14);
        return trialEnd;
    };
 
    const formatDate = (date: Date | null) => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };
 
    const openModal = (plan: string, price: string, priceId: string) => {
        setSelectedPlan(plan);
        setPlanPrice(price);
        setModalIsOpen(true);
        setPriceId(priceId);
        if (plan === 'Free Trial') {
            setTrialEndDate(calculateTrialEndDate());
        }
    };
 
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedPlan(null);
        setPlanPrice(null);
    };
 
    const handleBackButtonClick = () => {
        navigate('/integrations');
    };
    // setSubscriptionDate(new Date());
    return (
        <>
            <div style={{ fontFamily: 'Arial, sans-serif', margin: '40px', textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={handleBackButtonClick}
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        borderRadius: '30px',
                        borderColor: 'black',
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        '&:hover': {
                            borderColor: 'black',
                            color: 'black'
                        }
                    }}
                >
                    <ArrowBackIcon sx={{ width: 16, height: 16 }} />
                    Back
                </Button>
                <h1 style={{ color: '#333', marginBottom: '50px', fontWeight: 'bold', fontSize: '36px' }}>
                    Choose your subscription plan
                </h1>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {/* Free Plan Card */}
                    <Card
                        variant="outlined"
                        sx={{
                            width: 300,
                            height: 450,
                            margin: 2,
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                    >
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                        Free Trial
                                    </Typography>
                                </Box>
                                <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: 600 }}>
                                    FREE
                                </Typography>
 
                                <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0', textAlign: 'left' }}>
                                    {FEATURES.FREE.map((feature, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: 'inline-block',
                                                    width: '6px',
                                                    height: '6px',
                                                    backgroundColor: 'black',
                                                    borderRadius: '50%',
                                                    marginRight: '8px'
                                                }}
                                            ></Box>
                                            <Typography component="span">{feature}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </CardContent>
                        <Box
                            textAlign="center"
                            sx={{
                                padding: 2,
                                flexShrink: 0
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'black',
                                    borderRadius: '30px',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'gray' }
                                }}
                                onClick={() => openModal('Free Trial', 'FREE', 'free')}
                                disabled={subscriptionTypeId === 1 && hasSubscription}
                            >
                                GET STARTED
                            </Button>
 
                        </Box>
                        <p style={{ marginBottom: '5px', fontSize: '12px', fontStyle: 'italic' }}>Terms and Conditions Apply</p>
                    </Card>
 
                    {/* Other Subscription Plans */}
                    {plans.map(plan => (
                        <Card
                            key={plan.id}
                            variant="outlined"
                            sx={{
                                width: 300,
                                height: 450,
                                margin: 2,
                                borderRadius: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                }
                            }}
                        >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                            {plan.name}
                                        </Typography>
                                        {plan.id === 3 && <StarIcon color="primary" sx={{ ml: 2 }} />}
                                    </Box>
                                    <Typography variant="h4" component="div" sx={{ my: 2, fontWeight: 600 }}>
                                        {plan.amount === '0' ? 'FREE' : `£${plan.amount / 100} / month`}
                                    </Typography>
 
                                    <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0', textAlign: 'left' }}>
                                        {FEATURES[plan.name.toUpperCase()].map((feature: any, index: any) => (
                                            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        display: 'inline-block',
                                                        width: '6px',
                                                        height: '6px',
                                                        backgroundColor: 'black',
                                                        borderRadius: '50%',
                                                        marginRight: '8px'
                                                    }}
                                                ></Box>
                                                <Typography component="span">{feature}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            </CardContent>
                            <Box
                                textAlign="center"
                                sx={{
                                    padding: 2,
                                    flexShrink: 0
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'black',
                                        borderRadius: '30px',
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'gray' }
                                    }}
                                    onClick={() => openModal(plan.name, `£${plan.amount / 100} per month`, plan.priceId)}
                                    disabled={subscriptionTypeId === 2 && hasSubscription} // Disable button if user has a subscription
                                >
                                    GET STARTED
                                </Button>
 
                            </Box>
                            <p style={{ marginBottom: '5px', fontSize: '12px', fontStyle: 'italic' }}>Terms and Conditions Apply</p>
                        </Card>
                    ))}
                </Box>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Subscription Confirmation"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1000
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '80%',
                            maxWidth: '500px',
                            textAlign: 'center'
                        }
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                        Confirm Subscription
                    </Typography>
                    {selectedPlan && (
                        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                            {selectedPlan === 'Free Trial'
                                ? ` You will be charged £199 after the 14-day's trial period end on ${formatDate(trialEndDate)}`
                                : `You will be charged ${planPrice}.`}
                        </Typography>
                    )}
                    <Button variant="outlined" sx={{ marginRight: '10px' }} onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
 
                        onClick={handleConfirmSubscription}
                    >
                        Confirm
                    </Button>
 
                </Modal>
            </div >
            <PrivacyFooter />
        </>
    );
};
 
export default SubscriptionPlans;