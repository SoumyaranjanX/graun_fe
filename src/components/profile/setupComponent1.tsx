import React from 'react';
import '@/assets/scss/profile/SetupPage.css';
import tick from '@/assets/icons/tick.svg';
import CircularProgress from '@mui/material/CircularProgress';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { FaRegCircle } from 'react-icons/fa';

const SetUp1 = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="container navbar-container">
      <div className="progress">
        <div className="prog_bar">
          <CircularProgress
            variant="determinate"
            value={activeStep === 0 ? 10 : activeStep * 20}
            size="80px"
            sx={{
              color: 'black',
              position: 'absolute',
              top: '-10',
              left: '15',
            }}
          />
          {`${activeStep}/5`}
        </div>
        <div className="completed">Completed</div>
      </div>
      <div className={`step${activeStep >= 1 ? ' actual' : ''}`}>
        1. Organization Details{' '}
        {activeStep >= 1 ? (
          <IoCheckmarkCircleOutline
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'green',
            }}
          />
        ) : (
          <FaRegCircle
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'grey',
            }}
          />
        )}
      </div>
      <div className={`step${activeStep >= 2 ? ' actual' : ''}`}>
        2. Set-up Operating hours{' '}
        {activeStep >= 2 ? (
          <IoCheckmarkCircleOutline
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'green',
            }}
          />
        ) : (
          <FaRegCircle
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'grey',
            }}
          />
        )}
      </div>
      <div className={`step${activeStep >= 3 ? ' actual' : ''}`}>
        3. Terms and Conditions{' '}
        {activeStep >= 3 ? (
          <IoCheckmarkCircleOutline
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'green',
            }}
          />
        ) : (
          <FaRegCircle
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'grey',
            }}
          />
        )}
      </div>
      <div className={`step${activeStep >= 4 ? ' actual' : ''}`}>
        4. Payment Setup{' '}
        {activeStep >= 4 ? (
          <IoCheckmarkCircleOutline
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'green',
            }}
          />
        ) : (
          <FaRegCircle
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'grey',
            }}
          />
        )}
      </div>
      <div className={`step${activeStep >= 5 ? ' actual' : ''}`}>
        5. Integration{' '}
        {activeStep >= 5 ? (
          <IoCheckmarkCircleOutline
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'green',
            }}
          />
        ) : (
          <FaRegCircle
            style={{
              fontSize: '20px',
              position: 'absolute',
              left: '80%',
              color: 'grey',
            }}
          />
        )}
      </div>
    </div>
  );
};

export { SetUp1 };
