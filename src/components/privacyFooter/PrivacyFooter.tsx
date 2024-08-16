import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import './privacy.css';

const PrivacyFooter1: React.FC = () => {
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
    <div style={{display:'flex', paddingBottom:10, paddingTop:10}}>
      <div>
        Copyright @ {currentYear} GRAUN. All rights reserved.
      </div>
        <div
          className="privacyPolicy"
          style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '15px', fontWeight: 'bolder', fontSize: '11px', color:'black' }}
          onClick={() => window.location.href = '/privacyPolicy'}
        >
          Privacy Policy
        </div>
        <div> {'|'}</div>
        <div
          style={{ cursor: 'pointer', marginLeft: '15px', fontWeight: 'bolder', fontSize: '11px' }}
          onClick={() => window.location.href = '/TermsOfUse'}
        >
          Terms of Use
        </div>

    </div>
  );
};

export default PrivacyFooter1;
