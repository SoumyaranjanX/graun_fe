import React, { useEffect, useState } from 'react';
import '@/assets/scss/profile/SetupPage.css';
import { SetUp } from '@/components/profile/setupComponent';
import leftArrow from '@/assets/icons/left-arrow.svg';
import Deliveroo from '@/assets/icons/Deliveroo.svg';
import Uber from '@/assets/icons/uber.svg';
import connect from '@/assets/icons/connect.svg';
import '@/assets/scss/profile/SetUpStyle.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/profile/sidebarComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TbPlugConnected } from 'react-icons/tb';
import setRestaurantPaymentOnboard from '@/services/dispatch/api/setRestaurantPaymentOnboard';
import checkUberIntegrationAPI from '@/services/auth/API/checkUberIntegration';
import checkDeliverooIntegrationAPI from '@/services/auth/API/checkDeliverooIntegration';
import removeUberIntegration from '@/services/restaurant/API/removeUberIntegration';
import restaurantDeliverooIntegration from '@/services/restaurant/API/restaurantDeliverooIntegration';
import { useAuth } from '@/context/AuthContext';
import { FaCopy } from 'react-icons/fa';
 
import { Dots } from "react-activity";
import "react-activity/dist/library.css";
 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import image1 from '@/assets/img/deliveroo/integration/image2.png'
import image3 from '@/assets/img/deliveroo/integration/image3.png'
import image4 from '@/assets/img/deliveroo/integration/image4.png'
import image5 from '@/assets/img/deliveroo/integration/image5.png'
import image6 from '@/assets/img/deliveroo/integration/image6.png'
import image7 from '@/assets/img/deliveroo/integration/image7.png'
import image8 from '@/assets/img/deliveroo/integration/image8.png'
import image9 from '@/assets/img/deliveroo/integration/image9.png'
import image10 from '@/assets/img/deliveroo/integration/image10.png'
 
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
 
import updateMenu from '@/services/restaurant/API/updateMenu';
import PrivacyFooter from '@/components/privacyFooter';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import checkGraunFoodIntegrationAPI from '@/services/auth/API/checkGraunFoodIntegration';
import removeGraunFoodIntegration from '@/services/restaurant/API/removeGraunFoodIntegration';
const Integrations: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [removeUberIntegrationModal, setRemoveUberIntegrationModal] = useState(false);
  const [removeGraunFoodIntegrationModal, setRemoveGraunFoodIntegrationModal] = useState(false);
  const [isUberConnected, setIsUberConnected] = useState(false);
  const [isDeliverooConnected, setIsDeliverooConnected] = useState(false);
  const [isGraunFoodConnected, setIsGraunFoodConnected] = useState(false);
  const [reIntigrate, setReIntigrate] = useState(false);
  const [activeStep, setActiveStep] = React.useState(4);
  const [locationId, setLocationId] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false); // State to track if location ID is copied
  const [loadingDeliveroo, setLoadingDeliveroo] = useState(true);
  const [loadingUber, setLoadingUber] = useState(true);
  const [loadingGraunFood, setLoadingGraunFood] = useState(true);
  const [firstCallMade, setFirstCallMade] = useState(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
 
  const { mutate: restaurantDeliverooIntegrationCall } = restaurantDeliverooIntegration();
  const { mutate: setPayment } = setRestaurantPaymentOnboard();
  const { mutate: updateMenuCall } = updateMenu();
  const { mutate: checkUberIntegrationCall } = checkUberIntegrationAPI();
  const { mutate: checkDeliverooIntegrationCall } = checkDeliverooIntegrationAPI();
  const { mutate: checkGraunFoodIntegrationCall } = checkGraunFoodIntegrationAPI();
  const { mutate: removeUberIntegrationCall } = removeUberIntegration();
  const { mutate: removeGraunFoodIntegrationCall } = removeGraunFoodIntegration();
  const { logout, pageTracker } = useAuth();
  const { token } = useAuth();
 
  useEffect(() => {
    const Intigrate = localStorage.getItem('intigration');
    if (Intigrate === 'true') {
      setReIntigrate(true);
      localStorage.removeItem('intigration');
    }
  }, []);
 
  const handleIsIntegrated = () => {
    setActiveStep(5);
    updateMenuCall(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error('Error:', error);
          throw new Error('Failed to Update Menu');
        },
      },
    );
 
    setIsButtonEnabled(true); // Enable the button after integration
  };
 
  const save_continue = () => {
    const id = localStorage.getItem('id');
    fetch(
      'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          currentTrack: 5,
        }),
      },
    );
    setReIntigrate(false);
    navigate('/orders');
  };
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isDeliverooConnected || isUberConnected) {
        setActiveStep(5);
        setIsButtonEnabled(true);
      } else {
        setActiveStep(4);
        setIsButtonEnabled(false);
      }
      checkUberIntegrationCall(
        {},
        {
          onSuccess: (data) => {
            setLoadingUber(false)
            setIsUberConnected(data.data);
            if (data.data == true) {
              setActiveStep(5);
              setIsButtonEnabled(true);
            }
          },
        },
      );
      checkDeliverooIntegrationCall(
        {},
        {
          onSuccess: (data) => {
            setLoadingDeliveroo(false)
            setIsDeliverooConnected(data.data.is_active);
            if (data.data.is_active == true) {
              setActiveStep(5);
              setIsButtonEnabled(true);
            }
          },
        },
      );
      checkGraunFoodIntegrationCall(
        {},
        {
          onSuccess: (data) => {
            setLoadingGraunFood(false)
            setIsGraunFoodConnected(data.data);
            if (data.data.is_active == true) {
              setActiveStep(5);
              setIsButtonEnabled(true);
            }
          },
        },
      );
    }, 3000);
 
    return () => clearInterval(intervalId);
  }, [isUberConnected, isDeliverooConnected]);
 
 
  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get(
          'https://aws-nlb-prod.grauns.com/charging/api/subscription-details',
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
 
        if (response.data.data.length > 0) {
          setHasSubscription(true);
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
 
  useEffect(() => {
    const id = localStorage.getItem('id');
    const payment = localStorage.getItem('paymentMethod');
 
    fetch(
      'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/get-restaurant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        const restaurantId = data.id;
 
        fetch(
          'https://aws-nlb-prod.grauns.com/restaurant_backend/restaurant/createLocationId',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              restaurant_id: restaurantId,
            }),
          },
        )
          .then((response) => response.json())
          .then((data) => {
            const locationId = data.data.location_id;
            setLocationId(locationId);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
 
  const handleUberIntegration = () => {
    const clientId = 'H88lcOdIFhztwfRl7oduu0binptKpZmg';
    const responseType = 'code';
    const scope = 'eats.pos_provisioning';
    const url = 'https://auth.uber.com/oauth/v2/authorize';
    const redirect_uri = 'https://aws-nlb-prod.grauns.com/uber_auth_callback';
 
    const authorizationUrl = `${url}?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirect_uri}`;
    window.location.href = authorizationUrl;
  };
 
  const handleCopyLocationId = () => {
    navigator.clipboard.writeText(locationId).then(() => {
      setCopiedLocation(true);
      setTimeout(() => setCopiedLocation(false), 1500); // Reset copy feedback after 1.5 seconds
    });
  };
 
  const handleRemoveUberintegration = () => {
    removeUberIntegrationCall(
      {},
      {
        onSuccess: (data) => {
          setIsUberConnected(false);
        },
      },
    );
  };

  const handleGraunFoodDisconnect = () => {
    removeGraunFoodIntegrationCall(
      {},
      {
        onSuccess: (data) => {
          setIsGraunFoodConnected(false);
        },
      },
    );
  }
 
  const handleDeliverooIntegration = () => {
    updateMenuCall(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          // Handle error
          console.error('Error:', error);
          throw new Error('Failed to Update Menu');
        },
      },
    );
    restaurantDeliverooIntegrationCall(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
          setIsDeliverooConnected(true);
          setIsButtonEnabled(true);
        },
        onError: (error) => {
          // Handle error
          console.error('Error:', error);
          throw new Error('Failed to Update Menu');
        },
      },
    );
  };
 
  const handleCloseUberIntegrationModal = (confirmed: any) => {
    if (confirmed) {
      handleRemoveUberintegration();
    }
    setRemoveUberIntegrationModal(false);
  };

  const handleCloseGraunFoodIntegrationModal = (confirmed: any) => {
    if (confirmed) {
      // handleRemoveUberintegration();
    }
    setRemoveGraunFoodIntegrationModal(false);
  };
 
  const handleOpenUberIntegrationModal = () => {
    setRemoveUberIntegrationModal(true);
  }; 

  const handleOpenGraunFoodIntegrationModal = () => {
    setRemoveGraunFoodIntegrationModal(true);
  };
  const handleDeliverooClick = () => {
    navigate('/subscription')
  }
  return (
    <>
    <div className="bg-white flex main_page">
      <NavBar activeStep={3} />
      <div className="w-3/4 sec_page">
        <div className="text-[1.5rem]">Integrations</div>
        <div className="integrations">
          <div className="integration">
            <div className="integration_img">
              <img src={Deliveroo} alt="Deliveroo" />
            </div>
            <button
              id="integrate"
              className="btn_connect btn-primary"
              type="button"
              onClick={!loadingDeliveroo ? (isDeliverooConnected ? () => { } : handleOpen) : () => { }}
              style={{
                backgroundColor: isDeliverooConnected ? '#06D6A01A' : '',
                color: isDeliverooConnected ? '#06D6A0' : '',
                border: isDeliverooConnected ? '1px solid #06D6A0' : '',
              }}
            >
              {!loadingDeliveroo ?
                <>
                  <TbPlugConnected
                    style={{
                      fontSize: '17px',
                      marginRight: '5px',
                    }}
                  />
                  {isDeliverooConnected ? 'Connected' : 'Connect'}
                </>
                : <Dots />}
            </button>
            <div className="integration_name">Deliveroo</div>
            <div className="intigration_desc">Connect the deliveroo databse to your project</div>
          </div>
          <div className="integration">
            <div className="integration_img">
              <img src={Uber} alt="Uber" />
            </div>
            <button
              id="integrate2"
              className="btn_connect btn-primary"
              type="button"
              // onClick={() => isUberConnected ? "" : handleUberIntegration()}
              onClick={!loadingUber ? () => (isUberConnected ? handleOpenUberIntegrationModal() : handleUberIntegration()) : () => { }}
              style={{
                backgroundColor: isUberConnected ? '#06D6A01A' : '',
                color: isUberConnected ? '#06D6A0' : '',
                border: isUberConnected ? '1px solid #06D6A0' : '',
              }}
            >
              {!loadingUber ?
                <>
                  <TbPlugConnected
                    style={{
                      fontSize: '17px',
                      marginRight: '5px',
                    }}
                  />
                  {isUberConnected ? 'Connected' : 'Connect'}
                </> : <Dots />}
            </button>
            <div className="integration_name">Uber Eats</div>
            <div className="intigration_desc">Connect the Uber Eats databse to your project</div>
          </div>
 
          <div className="integration">
 
 
            <div
              // className="integration_img"
              style={{
 
                borderRadius: '30px',
                color: 'black',
                padding: '5px',
                width: '60px',
                fontSize: 'small',
                fontWeight: 'bold'
              }}
            >
              GRAUN
            </div>
            {/* <Tooltip title="Feature Coming soon" placement="right" arrow> */}
 
              <button
                id="integrate"
                className="btn_connect btn-primary"
                type="button"
                onClick={!loadingGraunFood ? () => (isGraunFoodConnected ? handleOpenGraunFoodIntegrationModal() :  (hasSubscription? navigate('/subscription_payment') : navigate('/subscription')) ) : () => { }}
              // disabled={hasSubscription}
              // disabled={true}
              style={{
                backgroundColor: isGraunFoodConnected ? '#06D6A01A' : '',
                color: isGraunFoodConnected ? '#06D6A0' : '',
                border: isGraunFoodConnected ? '1px solid #06D6A0' : '',
              }}
              >
                {!loadingGraunFood ?
                  <>
                    <TbPlugConnected
                      style={{
                        fontSize: '17px',
                        marginRight: '5px',
                      }}
                    />
                    {isGraunFoodConnected ? 'Connected' : (hasSubscription ? 'Pending' : 'Connect')}
                    {/* Connect */}
                  </> : <Dots />}
              </button>
            {/* </Tooltip> */}
            <div className="integration_name">Grauns Foods</div>
            <div className="intigration_desc">Connect the Grauns Foods databse to your project</div>
          </div>
        </div>
 
        <SetUp activeStep={activeStep} />
        <div className="btns">
          {!reIntigrate && (
            <div>
              <button
                id="logout"
                className="btn_2_3 btn-primary"
                type="button"
                onClick={() => {
                  localStorage.clear();
                  logout();
                  window.location.reload();
                }}
              >
                Save & Exit
              </button>
              <button className="btn_back btn-primary" type="button" onClick={() => navigate('/payment')}>
                <img src={leftArrow} alt="Back" style={{ width: '16px', height: '16px' }} />
                Back
              </button>
            </div>
          )}
 
          <button
            className="btn_2 btn-primary"
            style={{ backgroundColor: isButtonEnabled ? 'black' : '#E0E0E0', marginLeft: '330px' }}
            type="button"
            onClick={save_continue}
            disabled={!isButtonEnabled}
          >
            Save & Continue
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          onClick: (e) => e.stopPropagation(),
        }}
      >
        <Box sx={style} borderRadius={5}>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '45px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            &times;
          </button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Integrate with Deliveroo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{
                display: 'flex',
              }}
            >
              Your Location ID:{' '}
              <p
                style={{
                  marginLeft: '10px',
                  position: 'relative',
                  top: '-10px',
                }}
              >
                {locationId}
              </p>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              style={{
                overflow: 'auto',
                height: '450px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                }}
              >
                Steps you have to follow:
              </p>
              <div
                style={{
                  display: 'flex',
                  marginTop: '10px',
                }}
              >
                <p>1.To start with, go to </p>
                <a
                  href="https://partner-hub.deliveroo.com/"
                  target="_blank"
                  style={{
                    color: '#00ccbc',
                    marginLeft: '5px',
                    marginRight: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  Deliveroo
                </a>
                <p> and log in to your Deliveroo account.</p>
              </div>
              <p>2. Select Integrations in the sidebar.</p>
              <img src={image1} alt="Step 2 Image" style={{ marginTop: '10px' }} />
              <p>3. Enter Graun in the Which POS system do you use? section and select Graun ltd.</p>
              <img src={image3} alt="Step 3 Image" style={{ marginTop: '10px' }} />
              <p>4. Find and check the site(s) you want to connect. (Grauns Allowes maximum of one site to connect)</p>
              <img src={image4} alt="Step 4 Image" style={{ marginTop: '10px' }} />
              <p>
                5. In the Site location ID field for each site, enter the Grauns Location ID <strong>"{locationId}"</strong>.
              </p>
              <img src={image5} alt="Step 5 Image" style={{ marginTop: '10px' }} />
              <p>
                6. Tick the "No – I want to keep updating my menus online" option in the Do you want to update your
                menus through your till, too? section.
              </p>
              <img src={image6} alt="Step 6 Image" style={{ marginTop: '10px' }} />
              <p>7. Follow the instructions in Add PLUs to your menu Section.</p>
              <img src={image7} alt="Step 7 Image" style={{ marginTop: '10px' }} />
              <p>8. After completing all the steps tick on the checkbox and click on "Connect your till(POS)".</p>
              <img src={image8} alt="Step 8 Image" style={{ marginTop: '10px' }} />
              <p>
                9. In the next page, select "Connect your menu". You are shown your Brand ID. Now click on "Connect"
              </p>
              <img src={image9} alt="Step 9 Image" style={{ marginTop: '10px' }} />
              <img src={image10} alt="Step 10 Image" style={{ marginTop: '10px' }} />
              <p>10. Go back to the integration page in Grauns App</p>
              <p>11. Wait for a minutes and click Done</p>
              <p>12. Your account is now successfully linked. All new orders will be received by Grauns App.</p>
            </div>
          </Typography>
          <button
            style={{
              backgroundColor: '#333',
              color: 'white',
              padding: '10px 20px',
              marginTop: '20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
            type="button"
            onClick={() => {
              handleClose();
              handleIsIntegrated();
              setIsButtonEnabled(true);
            }}
          >
            Done
          </button>
        </Box>
      </Modal>
 
      <Dialog
        open={removeUberIntegrationModal}
        onClose={() => handleCloseUberIntegrationModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Removal'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:17, textAlign:'justify'}}>
            <strong>Are you sure you want to remove the Uber integration?</strong><br /><br />
            <i>Please note: This will only remove the store provision, but Grauns will 
            still remain an authorized application for a seamless connection when 
            you connect again. You can remove the authorization by visiting the 
            "Third-party apps with account access" section in your <strong> <a href="https://account.uber.com/data-access" target="_blank">Uber Account dashboard</a> </strong>.</i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseUberIntegrationModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { handleCloseUberIntegrationModal(true); window.open("https://account.uber.com/data-access", "_blank");}} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
 
      <Dialog
        open={removeGraunFoodIntegrationModal}
        onClose={() => handleCloseGraunFoodIntegrationModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove Graun Foods Integration'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To Remove the Graun Foods Integration, Please contact Admin by creating a ticket.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseGraunFoodIntegrationModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => navigate('/help')} color="primary" autoFocus style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: 30,
            paddingLeft:20,
            paddingRight:20,
            fontSize:12
          }}>
            Conctact Admin
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
    {/* <PrivacyFooter /> */}
    </>
  );
};
 
export default Integrations;