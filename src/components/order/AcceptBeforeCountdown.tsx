import React, { useEffect, useState } from 'react';
import './AcceptBeforeCountdown.css';

// Countdown component
const AcceptBeforeCountdown = ({ acceptBefore, setIsAcceptTimeOut, orderId, cancelOrder }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(acceptBefore) - new Date();
    let timeLeft = {};

    if (difference >= 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    else {
      cancelOrder(orderId)
      setIsAcceptTimeOut(prevArray => {
        if (!prevArray.includes(orderId)) {
          return [...prevArray, orderId];
        }
        return prevArray; 
      });
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [acceptBefore]);

  return (
    <span className="countdown"> - 
      {timeLeft.hours ? `${timeLeft.hours}h ` : ''}
      {timeLeft.minutes ? `${timeLeft.minutes}m ` : ''}
      {timeLeft.seconds ? `${timeLeft.seconds}s` : '0s'}
    </span>
  );
};


export default AcceptBeforeCountdown;