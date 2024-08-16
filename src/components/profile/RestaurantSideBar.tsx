import { Box } from '@mui/material';
import React from 'react';
import '../assets/styles/SideNavBar.css';
import dashboard from '../assets/icons/dashboard.svg';
import van from '../assets/icons/van.svg';
import analytics from '../assets/icons/analitics.svg';
import help from '../assets/icons/help.svg';
import settings from '../assets/icons/settings.svg';
import cap from '../assets/icons/cap.svg';
import notes from '../assets/icons/notes.svg';

const SideNavBar = ({ activePage }: { activePage: String }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                height: '110vh',
                width: '20%',
                border: '1px solid #0000001A',
                borderRadius: '10px',
            }}
        >
            <div className="text-[1.5rem] logo">GRAUN</div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: '40px',
                    marginTop: '40px',
                    marginLeft: '60px',
                    marginBottom: '40px',
                }}
            >
                <button className="side_nav_button">
                    <img
                        src={dashboard}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Dashboard
                </button>
                <button className="side_nav_button">
                    <img
                        src={notes}
                        style={{
                            marginRight: '10px',
                            fill: 'red',
                        }}
                    />
                    Orders
                </button>
                <button className="side_nav_button">
                    <img
                        src={van}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Deliveries
                </button>
                <button className="side_nav_button">
                    <img
                        src={analytics}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Analytics
                </button>
                <button className="side_nav_button">
                    <img
                        src={cap}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Profile
                </button>
            </Box>
            <div
                style={{
                    borderBottom: '1px solid #0000001A',
                    marginTop: '20px',
                }}
            ></div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    gap: '40px',
                    marginTop: '30px',
                    marginLeft: '60px',
                }}
            >
                <button className="side_nav_button">
                    <img
                        src={settings}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Settings
                </button>
                <button className="side_nav_button">
                    <img
                        src={help}
                        style={{
                            marginRight: '10px',
                        }}
                    />{' '}
                    Help & Support
                </button>
            </Box>
        </Box>
    );
};

export default SideNavBar;
