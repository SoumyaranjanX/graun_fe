import { Badge, Box, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { AiOutlineBell } from 'react-icons/ai';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks';
import '@/assets/scss/order/SideNavBar.css';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';
import { RxCross1 } from 'react-icons/rx';
import { CiUnread } from 'react-icons/ci';
import { CiRead } from 'react-icons/ci';
import { use } from 'i18next';
import { set } from 'react-hook-form';
import updateMenu from '@/services/restaurant/API/updateMenu';
import checkDeliverooIntegrationAPI from '@/services/auth/API/checkDeliverooIntegration';
import NotificationList from '@/pages/Auth/Notifications/NotificationList';
import { ROUTES } from '@/routes/routingConstants';
import io from 'socket.io-client';

interface navBarProps {
  activePage: string; // Assuming activePage is of type string, adjust as needed
  setActivePage: React.Dispatch<React.SetStateAction<string>>; // Assuming setActivePage is a state setter function
}
const NavBar = ({ activePage, setActivePage }: navBarProps) => {
  const navigate = useNavigate();
  const { PUBLIC, PRIVATE } = ROUTES;
  const { logout } = useAuth();
  const { showAlert } = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorNotifi, setAnchorNotifi] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([] as string[]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isDeliverooConnected, setIsDeliverooConnected] = useState<any>(true);
  const [isMenuUpdated, setIsMenuUpdated] = useState<any>(false);

  const id = localStorage.getItem('id');

  const { mutate: updateMenuCall } = updateMenu();
  const { mutate: checkDeliverooIntegrationAPICall } = checkDeliverooIntegrationAPI();

  
  const socket = io('https://aws-nlb-prod.grauns.com',{
    path: '/order/socket.io',
    transports: ['websocket', 'polling'] 
  });

  const restaurantId = localStorage.getItem('restaurantId')

  useEffect(() => {

    console.log("joining room")
    // join the room
    socket.emit('join_room', restaurantId, (response: any) => {
      if (response.success) {
          console.log('Successfully joined the room:', restaurantId);
      } else {
          console.log('Failed to join the room:', response.error);
      }
    });

    //lister to new order event
    socket.on('new_notification', async (data) => {
      console.log("new notification ...")
      try {
        await Promise.all([getNotifications()]);
        // showAlert({ message: 'New Order Received!!!', type: 'success' });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    });

    return () => {
      // leave the room
      socket.emit('leave_room', restaurantId);
      socket.disconnect();
    };

  }, []);


  const setNextCallTime = () => {
    const nextCallTime: any = new Date().getTime() + 6 * 60 * 60 * 1000;
    localStorage.setItem('nextCallTime', nextCallTime);
  };

  const checkAndCallMenuAPI = () => {
    const nextCallTime: any = localStorage.getItem('nextCallTime');
    console.log(nextCallTime);
    const currentTime = new Date().getTime();

    if (!nextCallTime || currentTime >= nextCallTime) {
      updateMenuCall(
        {},
        {
          onSuccess: (data) => {
            setNextCallTime();
          },
          onError: (error) => {
            console.error('Error:', error);
            throw new Error('Failed to Update Menu');
          },
        },
      );
    }
  };

  useEffect(() => {
    checkAndCallMenuAPI();
    getNotifications();
  }, []);

  useEffect(() => {
    if (!isMenuUpdated && isDeliverooConnected) {
      checkDeliverooIntegrationAPICall(
        {},
        {
          onSuccess: (data) => {
            console.log(data);
            setIsMenuUpdated(data.data.is_menu_fetched);
            setIsDeliverooConnected(data.data.is_active);
          },
          onError: (error) => {
            console.error('Error:', error);
            throw new Error('Failed to Update Menu');
          },
        },
      );
      const intervalId = setInterval(() => {
        updateMenuCall(
          {},
          {
            onSuccess: (data) => {
              setIsMenuUpdated(true);
            },
            onError: (error) => {
              console.error('Error:', error);
              throw new Error('Failed to Update Menu');
            },
          },
        );
      }, 10 * 1000); // 10 seconds
      return () => clearInterval(intervalId);
    }
  }, [isMenuUpdated, isDeliverooConnected]);

  const getNotifications = () => {
    fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/noti/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        restaurantId: restaurantId,
        noOfNotifications: 5
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setUnreadCount(data.length);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNotifi(event.currentTarget);
    getNotifications();
    // setUnreadCount(0);
    // printTicket();
  };

  const handleNotifiClose = () => {
    setAnchorNotifi(null);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: '10vh',
        width: '100%',
        border: '1px solid #0000001A',
        borderBottomRightRadius: '15px',
        borderBottomLeftRadius: '15px',
      }}
    >
      <div
        className="pageName"
        style={{
          marginLeft: '30px',
          marginTop: '20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      >
        {activePage} /
      </div>

      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          top: '-50px',
          padding: '20px',
        }}
      >
        <FiHelpCircle
          onClick={() => {
            setActivePage('helpSupport');
            navigate(PRIVATE.HELP_SUPPORT);
          }}
          size={20}
          className="helpIcon"
          style={{
            position: 'absolute',
            right: '170px',
            top: '30px',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        />

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '19px',
            right: '123px',
          }}
        >
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="notifications-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorNotifi) ? 'true' : undefined}
            onClick={(event) => {
              handleNotifiClick(event);
              getNotifications();
              // printTicket();
            }}
            color="inherit"
          >
            <Badge badgeContent={unreadCount} color="error">
              <AiOutlineBell />
            </Badge>
          </IconButton>
        </div>

        {/* to get real time notification */}
        <Menu
          id="notifications-menu"
          anchorEl={anchorNotifi}
          open={Boolean(anchorNotifi)}
          onClose={handleNotifiClose}
          MenuListProps={{
            'aria-labelledby': 'notifications-button',
          }}
          sx={{
            '& .MuiMenu-paper': {
              width: '400px',
              height: 'auto',
              borderRadius: '20px',
              padding: '10px',
              position: 'absolute',
              top: '50px',
              right: '30px',
              overflow: 'auto',
              backgroundColor: '#F5F5F5',
            },
          }}
        >
        <List>
          {notifications.length > 0 ? (
            notifications.map((notification: any, index) => (
            <MenuItem
            key={index}
            onClick={handleNotifiClose}
            sx={{ borderRadius: '20px', marginTop: '10px', marginBottom: '10px', backgroundColor: 'white' }}
          >
            <div
              style={{
                width: '220px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                {
                (notification.notificationCategory == 'new_order' ||
                notification.notificationCategory == 'driver_assigned' ||
                notification.notificationCategory == 'order_intransit' ||
                notification.notificationCategory == 'order_delivered' ||
                notification.notificationCategory == 'store_provisioned' ) ?
                
                <IoIosCheckmarkCircleOutline
                  style={{
                    color: 'green',
                    fontSize: '2rem',
                    gap: '10px',
                    marginRight: '10px',
                    marginTop: '5px',
                  }}
                />
                :
                <RxCrossCircled
                  style={{
                    color: 'red',
                    fontSize: '2rem',
                    gap: '10px',
                    marginRight: '10px',
                    marginTop: '5px',
                  }}
                />
                }
                <div style={{ marginTop: '10px' }}>{
                        notification.notificationCategory == 'new_order' ? "New Order" 
                        : notification.notificationCategory == 'cancel_order' ? "Order Canceled" 
                        : notification.notificationCategory == 'driver_assigned' ? "Driver Assigned" 
                        : notification.notificationCategory == 'order_intransit' ? "Order Intrasit" 
                        : notification.notificationCategory == 'order_delivered' ? "Order Delivered" 
                        : notification.notificationCategory == 'store_provisioned' ? "Store Integrated" 
                        : notification.notificationCategory == 'store_deprovisioned' ? "Store Disintegrated" 
                        : notification.notificationCategory == 'payment_failed' ? "Payment Failed" 
                        : notification.notificationCategory 
                }</div>
                {/* <RxCross1
                  style={{
                    color: 'black',
                    fontSize: '1.2rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '40',
                  }}
                /> */}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  color: 'gray',
                  marginLeft: '44px',
                }}
              >
               {notification.message}
              </div>
            </div>
          </MenuItem>
          
            ))
          ) : (
            <MenuItem>No new notifications</MenuItem>
          )}
        </List>
      </Menu>

        {/* <Menu
          id="notifications-menu"
          anchorEl={anchorNotifi}
          open={Boolean(anchorNotifi)}
          onClose={handleNotifiClose}
          MenuListProps={{
            'aria-labelledby': 'notifications-button',
          }}
          sx={{
            '& .MuiMenu-paper': {
              width: '400px',
              height: 'auto',
              borderRadius: '20px',
              padding: '10px',
              position: 'absolute',
              top: '50px',
              right: '30px',
              overflow: 'auto',
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          <MenuItem
            onClick={handleNotifiClose}
            sx={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '50%',
              }}
            >
              <div style={{ display: 'flex', gap: '5px', fontWeight: 'bold' }}>
                Notifications: <p>3</p>
              </div>
            </div>
          </MenuItem>

          <MenuItem
            onClick={handleNotifiClose}
            sx={{ borderRadius: '20px', marginTop: '10px', marginBottom: '10px', backgroundColor: 'white' }}
          >
            <div
              style={{
                width: '220px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                <IoIosCheckmarkCircleOutline
                  style={{
                    color: 'green',
                    fontSize: '2rem',
                    gap: '10px',
                    marginRight: '10px',
                    marginTop: '5px',
                  }}
                />
                <div style={{ marginTop: '10px' }}>Order accepted</div>
                <RxCross1
                  style={{
                    color: 'black',
                    fontSize: '1.2rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '40',
                  }}
                />
                <CiUnread
                  style={{
                    color: 'black',
                    fontSize: '1.3rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '5',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  color: 'gray',
                  marginLeft: '44px',
                }}
              >
                ID# 1234
              </div>
            </div>
          </MenuItem>
          <MenuItem
            onClick={handleNotifiClose}
            sx={{ backgroundColor: '#DFDFDF', borderRadius: '20px', marginTop: '10px', marginBottom: '10px' }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                <IoIosCheckmarkCircleOutline
                  style={{
                    color: 'green',
                    fontSize: '2rem',
                    gap: '10px',
                    marginRight: '10px',
                    marginTop: '5px',
                  }}
                />
                <div style={{ marginTop: '10px' }}>Order accepted</div>
                <RxCross1
                  style={{
                    color: 'black',
                    fontSize: '1.2rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '30',
                  }}
                />
                <CiRead
                  style={{
                    color: 'black',
                    fontSize: '1.3rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '5',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  color: 'gray',
                  marginLeft: '44px',
                }}
              >
                ID# 6652
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={handleNotifiClose} sx={{ borderRadius: '20px', backgroundColor: 'white' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                <RxCrossCircled
                  style={{
                    color: 'red',
                    fontSize: '2rem',
                    gap: '10px',
                    marginRight: '10px',
                    marginTop: '5px',
                  }}
                />
                <div style={{ marginTop: '10px' }}>Order Rejected</div>
                <RxCross1
                  style={{
                    color: 'black',
                    fontSize: '1.2rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '30',
                  }}
                />
                <CiUnread
                  style={{
                    color: 'black',
                    fontSize: '1.3rem',
                    gap: '10px',
                    marginRight: '100px',
                    marginTop: '5px',
                    position: 'absolute',
                    left: '330',
                    bottom: '5',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  color: 'gray',
                  marginLeft: '44px',
                }}
              >
                ID# 5473
              </div>
            </div>
          </MenuItem>
        </Menu> */}

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '16px',
            right: '30px',
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
            <p
              style={{
                fontSize: '1rem',
                marginLeft: '5px',
              }}
            >
              Admin
            </p>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default NavBar;
