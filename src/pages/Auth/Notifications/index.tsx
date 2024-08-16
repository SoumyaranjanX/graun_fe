import React, { useEffect, useState } from 'react';
import { generateToken } from '@/pages/Auth/Notifications/Firebase/firebase';

interface Notification {
  id: string;
  title: string;
  body: string;
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await generateToken();
      if (token) {
        const uberNotifications: Notification[] = [
          { id: '1', title: 'Order Status', body: 'Your order is now delivered.' },
          { id: '2', title: 'Order Status', body: 'Your order is now in preparation.' }
        ];
        setNotifications(uberNotifications);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            <strong>{notif.title}</strong>
            <p>{notif.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
