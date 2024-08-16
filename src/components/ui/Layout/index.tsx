import { Box, Button } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Sidebar, NavBar } from '..';
import '@/assets/scss/order/orderView.css';
import { ROUTES } from '@/routes/routingConstants';
import { useNavigate } from 'react-router-dom';
import '@/assets/scss/privacyPolicy/index.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  const { PUBLIC, PRIVATE } = ROUTES;
  const { children } = props;
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState('');

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (activePage === '') {
      const path = window.location.pathname;
      console.log('activePage', path);
      let activePage = '';
      if (path === PRIVATE.ORDER) {
        activePage = 'order';
      } else if (path === PRIVATE.DELIVERIES) {
        activePage = 'deliveries';
      } else if (path === PRIVATE.DASHBOARD) {
        activePage = 'dashboard';
      } else if (path === PRIVATE.HELP_SUPPORT) {
        activePage = 'helpSupport';
      }
      setActivePage(activePage);
    }
    console.log(activePage);
  }, [activePage]);

  return (
    <>
      <div className="order_view">
        <div className="top_nav">
          <NavBar activePage={activePage} setActivePage={setActivePage} />
        </div>

        <div className="body">
          <div className="nav">
            <Box sx={{ display: 'flex' }}>
              <div className="sidebar">
                <Sidebar activePage={activePage} setActivePage={setActivePage} />
              </div>
              <Box component="main" sx={{ flexGrow: 1, p: 0, marginLeft: '20px' }}>
                {children}
              </Box>
            </Box>
          </div>
        </div>

        <footer>
          <Box className="footer-content" sx={{ 'span:hover': { color: '#000' } }}>
            <p>Copyright © {currentYear} GRAUN. All rights reserved.</p>
            <span className="privacyPolicy" onClick={() => navigate('/privacyPolicy')} style={{ marginLeft: '10px', marginRight: '11px', fontWeight: 'bolder', fontSize: '12px'  }}>
              Privacy Policy
            </span>
            <span>|</span>
            <span className="termsOfUse" onClick={() => navigate('/termsOfUse')} style={{marginLeft: '10px', marginRight: '11px', fontWeight: 'bolder', fontSize: '12px' }}>
              Terms of Use
            </span>
          </Box>
        </footer>
      </div>
    </>
  );
};

export default Layout;
