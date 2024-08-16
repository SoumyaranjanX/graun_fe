import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Snackbar,
  Chip,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import '@/assets/scss/pages/help/formStyle.css';
import ProgressWithSegments from './ProgressWithSegments';
import ticketsAxios from '@/services/auth/API/ticketsAxios';
import axios from 'axios'; // Import axios

const userId: any = localStorage.getItem('id');

interface Ticket {
  id: number;
  username: string;
  phone_number: string;
  restaurant_name: string;
  location: string;
  email: string;
  reason: string;
  photo?: string;
  response?: string;
  status: 'submitted' | 'progress' | 'resolved';
  userId: any;
  createdAt?: any;
}

const fetchTickets = async (): Promise<Ticket[]> => {
  const { data } = await ticketsAxios.post<Ticket[]>('ticket/getTicket', { userId });
  return data;
};

const fetchRestaurantName = async (): Promise<string> => {
  const response = await ticketsAxios.post(`/profile/getRestaurantProfile`, { userId });
  console.log('restaurantName', response.data.restaurantName);
  return response.data.restaurantName;
};

const createTicket = async (formData: FormData): Promise<Ticket> => {
  const { data } = await ticketsAxios.post<Ticket>('/ticket/tickets', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const Help: React.FC = () => {
  // const email1: any = localStorage.getItem("email");
  // console.log("email1", email1)
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTickets, setShowTickets] = useState(false);

  const queryClient = useQueryClient();
  const { data: tickets } = useQuery<Ticket[]>('tickets', fetchTickets);
  console.log('restaurantName', restaurantName);
  useEffect(() => {
    if (tickets && tickets.length > 0) {
      setShowTickets(true);
    }
  }, [tickets]);

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
  });

  useEffect(() => {
    const fetchAndSetRestaurantName = async () => {
      try {
        const name = await fetchRestaurantName();
        console.log('name', name);
        localStorage.setItem('name', name);
        setRestaurantName(localStorage.getItem('name') || '');
        console.log('set rest', restaurantName);
      } catch (error) {
        console.error('Failed to fetch restaurant name', error);
      }
    };
    fetchAndSetRestaurantName();
  }, []);

  const createMutation = useMutation(createTicket, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('tickets');
      setCreatedTicket(data);
      setShowSnackbar(true);
      setShowTickets(true);
    },
  });

  const handleCreateTicket = async () => {
    if (!restaurantName || !email || !reason) {
      setShowSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('restaurant_name', restaurantName);
    formData.append('email', email);
    formData.append('reason', reason);
    formData.append('userId', userId);

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    createMutation.mutate(formData);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCloseModal = () => {
    setOpen(false);
    // setRestaurantName('');
    setEmail('');
    setReason('');
    setCreatedTicket(null);
    setSelectedFile(null);
    setShowTickets(false);
    setExpandedTicketId(null);
  };

  const handleCreateNewTicket = () => {
    //setRestaurantName('');
    setEmail('');
    setReason('');
    setCreatedTicket(null);
    setSelectedFile(null);
    setShowTickets(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleExpandTicket = (ticketId: number) => {
    if (expandedTicketId === ticketId) {
      setExpandedTicketId(null);
    } else {
      setExpandedTicketId(ticketId);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'in progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const questions = [
    {
      question: 'How does the food delivery app work?',
      answer: 'Assignment The app automatically assigns a delivery driver based on availability, proximity, and efficiency. Once assigned driver accepts the orders. Driver will then navigate to Pickup the order from the location.',
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We deliver to a wide range of areas across Banbury. To check if we deliver to your location, simply enter your address on our website during the sign up process, and we will confirm availability via email.',
    },
    {
      question: 'What should I do if my area is not covered by your delivery service?',
      answer: `If we currently don't deliver to your area, we recommend checking back periodically as we are constantly expanding our delivery zones. Alternatively, you can use our app to find the nearest available location.`,
    },
    {
      question: 'Is there a delivery fee for all areas?',
      answer: 'Delivery fees vary depending on the distance from your restaurant to your customers delivery address. The exact fee will be displayed after you have assigned the order ready to deliver.',
    },
    {
      question: 'What is your Delivery Fee Structure?',
      answer: `
        We charge Flat Rate Delivery Fees for the following distance tiers provided that if your ticket or order value is lower than £45;<br/><br/>
          1. We charge a set fee of £4.99 for a short distance range of 0 to 4 miles for any order amount lower than £45 or 12% of your order total for orders above £45.<br/><br/>
          2. We charge a set of fee of £5.99 for medium distance range 4 to 5 miles for any order amount lower then £45 or 12 % of your order total for order above £45.<br/><br/>
          3. We charge a set of fee of £6.99 for Long distance range 5 to 6 miles for any order amount lower then £45.
      `
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and mobile payment methods.',
    },
    {
      question: 'How do I sign up to become a Restaurant partner?',
      answer: `To sign up, visit our website and click on the become a Restaurant Partner. You'll need to fill out a registration form with details about your restaurant, including location, menu, and contact information. Our team will review your application and contact you within 2 business days.`,
    },
    {
      question: 'Delivery related issues',
      answer: 'For any delivery related issues, please contact our support team by simply clicking on the chat button and creating a ticket. Our support team will get back to you with in 24 hours.',
    },
    {
      question: 'How to connect Uber?',
      answer: 'Visit <a href="https://aws-nlb-prod.grauns.com/integrations" target="_blank">"Integrations Page"</a> and click "Connect Uber." You will be redirected to the Uber website, where you need to log in with your credentials. Wait for the approval process to complete, and you will be automatically redirected back. Verify that the connection status is highlighted in green, indicating a successful integration.',
    },
    {
      question: 'How to disconnect Uber?',
      answer: `Visit <a href="https://aws-nlb-prod.grauns.com/integrations" target="_blank">"Integrations Page"</a> and click the "Connected" button, which indicates a successful connection in green. You will be asked for confirmation to disconnect. Click "Yes," and your connection will be disconnected. <br><br>
                <i>Please note: This will only remove the store provision, but Grauns will still remain an authorized application for a seamless connection when you connect again. You can remove the authorization by visiting the "Third-party apps with account access" section in your <a href="https://account.uber.com" target="_blank">Uber Account dashboard</a>.</i>`
    }
  ];
  console.log('restaurantName', restaurantName);

  console.log('email', email);
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Box
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          height: '10rem',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom display="flex" justifyContent="center" style={{ fontWeight: 'bold' }}>
          Hello, how can we help?
        </Typography>
      </Box>
      <Box mt={2} sx={{ width: '80%' }}>
        {questions.map((q, index) => (
          <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <strong>{q.question}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: q.answer }}
            />
          </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={60} sx={{ position: 'fixed', left: '90%' }}>
        <Button
          variant="contained"
          style={{ color: 'black', backgroundColor: 'black', borderRadius: '50%', width: '50px', height: '53px' }}
          onClick={() => {
            setOpen(true);
            setShowTickets(!showTickets);
          }}
        >
          {/* {createdTicket ? 'Create New Ticket' : ''} */}
          <ChatRoundedIcon style={{ width: '30px', height: '30px', borderColor: 'white', color: 'white' }} />
        </Button>
      </Box>

      <Modal open={open} onClose={handleCloseModal} hideBackdrop>
        <Box
          sx={{
            background: '#fff',
            position: 'absolute',
            left: '74%',
            transform: 'translateX(-50%)',
            top: '16%',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: { xs: '90%', md: '400px' },
            maxHeight: { xs: '90%', md: '465px' },
          }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: 'black', textTransform: 'none' }} gutterBottom>
              {createdTicket ? 'Ticket Details' : 'Help & Support'}
            </Typography>
            <Box display="flex" alignItems="center">
              {showTickets && (
                <Button variant="text" sx={{ color: 'black', textTransform: 'none' }} onClick={handleCreateNewTicket}>
                  Create New Ticket
                </Button>
              )}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />

          {!showTickets ? (
            <Box display="flex" flexDirection="column">
              <TextField
                className="inputRounded"
                // label="Restaurant Name"
                // variant="outlined"
                value={restaurantName}
                margin="dense"
                size="small"
                //onChange={(e) => setRestaurantName(e.target.value)}
                disabled
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                  },
                  '& .MuiInputLabel-root.Mui-disabled': {
                    color: 'black',
                  },
                }}
              />

              <TextField
                className="inputRounded"
                // label="Email"
                // variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="dense"
                size="small"
                disabled
                sx={{
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                  },
                  '& .MuiInputLabel-root.Mui-disabled': {
                    color: 'black',
                  },
                }}
              />

              <TextField
                className="inputCustom, inputRounded1"
                //label="Reason*"
                placeholder="Please write your reason here..."
                variant="outlined"
                fullWidth
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                margin="dense"
                multiline
                rows={3}
              />
              <TextField
                id="file"
                className="inputRounded"
                type="file"
                fullWidth
                onChange={handleFileChange}
                margin="dense"
                size="small"
              />

              <Button
                variant="contained"
                style={{
                  color: '#fff',
                  backgroundColor: !restaurantName || !email || !reason ? '#ccc' : '#333',
                }}
                onClick={handleCreateTicket}
                disabled={!restaurantName || !email || !reason}
              >
                Create Ticket
                <ConfirmationNumberIcon style={{ marginLeft: '8px' }} />
              </Button>
            </Box>
          ) : (
            <Box overflow="auto" maxHeight="350px">
              {expandedTicketId === null
                ? tickets?.map((ticket) => (
                    <Box
                      key={ticket.id}
                      mt={2}
                      p={1}
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                      bgcolor="#f5f5f5"
                      borderRadius="8px"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleExpandTicket(ticket.id)}
                    >
                      <Box display="flex" justifyContent="center" flexDirection="column">
                        <Typography variant="subtitle1">Ticket ID : #{ticket.id}</Typography>
                      </Box>

                      <Typography variant="subtitle2" display="flex" justifyContent="center" alignItems="center">
                        <Chip
                          variant="outlined"
                          label={ticket.status}
                          size="small"
                          style={{
                            borderRadius: 6,
                            color: ticket.status === 'resolved' ? '#00B612' : 'black',
                            borderColor: ticket.status === 'resolved' ? '#00B612' : 'black',
                            backgroundColor: ticket.status === 'resolved' ? '#E7F9E7' : '#D9D9D9',
                          }}
                        />
                      </Typography>
                    </Box>
                  ))
                : tickets?.map(
                    (ticket) =>
                      ticket.id === expandedTicketId && (
                        <Box mt={2} p={1} width="100%">
                          <ProgressWithSegments status={ticket.status} />
                          <Box
                            bgcolor="#f5f5f5"
                            p={2}
                            mt={2}
                            borderRadius={2}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box>
                              <Typography variant="body2">You will be notified here and by email</Typography>
                              <Typography variant="body1">{ticket.email}</Typography>
                            </Box>
                            <NotificationsNoneRoundedIcon />
                          </Box>
                          <Box mt={2}>
                            <Typography variant="subtitle2">Ticket ID : #{ticket.id}</Typography>
                            <Typography variant="subtitle2">Restaurant Name : {ticket.restaurant_name}</Typography>
                            <Typography variant="subtitle2">
                              <span style={{ color: 'red' }}>Reason </span>
                              <br /> {ticket.reason}
                            </Typography>
                            <Typography variant="subtitle2">
                              <span style={{ color: 'Green' }}>Response </span> {ticket.response}
                            </Typography>

                            {ticket.photo && (
                              <img
                                src={ticket.photo}
                                alt="Ticket Photo"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '200px',
                                  marginBottom: '8px',
                                  marginTop: '20px',
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      ),
                  )}
            </Box>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Ticket created successfully"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Help;
