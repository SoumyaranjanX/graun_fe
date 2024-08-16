import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import './privacy.css';

const PrivacyFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      const footer = document.querySelector('.privacyFooter');
      if (footer) {
        document.body.style.paddingBottom = `${footer.clientHeight}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('focus', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('focus', handleResize);
    };
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        className="privacyFooter"
      >
        Copyright @ {currentYear} GRAUN. All rights reserved.
        <span
          className="privacyPolicy"
          style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '15px', fontWeight: 'bolder', fontSize: '11px', color:'black' }}
          onClick={() => window.location.href = '/privacyPolicy'}
        >
          Privacy Policy
        </span>
        <span> {'|'}</span>
        <span
          style={{ cursor: 'pointer', marginLeft: '15px', fontWeight: 'bolder', fontSize: '11px' }}
          onClick={() => window.location.href = '/TermsOfUse'}
        >
          Terms of Use
        </span>
      </Box>
    </Box>
  );
};

export default PrivacyFooter;
