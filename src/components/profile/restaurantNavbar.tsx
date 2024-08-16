import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import '../assets/styles/SideNavBar.css';
import { FiHelpCircle } from 'react-icons/fi';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import { AiOutlineBell } from 'react-icons/ai';

const NavBar = ({ activePage }: { activePage: string }) => {
    useEffect(() => {
        handlePageChange(activePage);
    }, [activePage]);

    const handlePageChange = (page: string) => {
        const pageName = document.getElementsByClassName('pageName')[0] as HTMLElement;

        if (page === 'order') {
            pageName.textContent = 'Order /';
        } else if (page === 'delivery') {
            pageName.textContent = 'Delivery /';
        }
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                }}
            >
                Order /
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
                    onClick={() => alert('Help')}
                    size={20}
                    className="helpIcon"
                    style={{
                        position: 'absolute',
                        right: '170px',
                        top: '30px',
                        fontSize: '1.5rem',
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
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AiOutlineBell />
                    </IconButton>
                </div>

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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
            </Box>
        </Box>
    );
};

export default NavBar;
