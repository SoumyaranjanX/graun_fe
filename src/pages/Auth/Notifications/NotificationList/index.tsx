import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { fetchNotifications } from '@/services/auth/API/notifAxios';
import '@/assets/scss/pages/notification/noti.css';

interface Notification {
  id: string;
  orderId: string;
  status: string;
  message: string;
}

const NotificationList: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [previousNotifications, setPreviousNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        if (data.length === 0) {
          setNotifications(previousNotifications);
        } else {
          setNotifications(data);
          setPreviousNotifications(data);
          setUnreadCount(data.length);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications(previousNotifications);
      }
    };

    loadNotifications();
  }, [previousNotifications]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0);
    console.log('marked as read');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='notifications'>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="notification-menu"
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} className="notification-item">
            <div className="notification-content">
              <div className="notification-icon">&#x2714;</div>
              <div>
                <strong>{notification.message}</strong>
                <p>{`Order ID: ${notification.orderId}`}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NotificationList;
