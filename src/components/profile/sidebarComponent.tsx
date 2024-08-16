import React from 'react';
import '@/assets/scss/profile/SetupPage.css';
import rightArrow from '@/assets/icons/right-ancle.svg';
// import Tickicon from '../assets/icons/TickIcon.svg';

const NavBar = ({ activeStep }: { activeStep: number }) => {
    return (
        <div className="w-1/4 bg-gray-200 h-screen nav_menu" style={{
            height:'auto'
        }}>
            <div className="text-[1.5rem] logo">GRAUN</div>
            <div className="text-[1.5rem] wel_text">Welcome to GRAUN</div>
            <div className="text-[1.5rem] wel_text_1">Set up your account</div>
            <div className="list">
                <div className={activeStep === 1 ? 'active' : ''}>
                    <img
                        src={rightArrow}
                        alt="rightArrow"
                        className="rightArrow"
                        style={{ display: activeStep === 1 ? 'block' : 'none' }}
                    />
                    <div className={activeStep === 1 ? 'wel_text_2_actual' : 'wel_text_2'}>
                        Profile
                    </div>
                </div>
                <div className={activeStep === 2 ? 'active' : ''}>
                    <img
                        src={rightArrow}
                        alt="rightArrow"
                        className="rightArrow"
                        style={{ display: activeStep === 2 ? 'block' : 'none' }}
                    />
                    <div className={activeStep === 2 ? 'wel_text_2_actual' : 'wel_text_2'}>
                        Payment method
                    </div>
                </div>
                <div className={activeStep === 3 ? 'active' : ''}>
                    <img
                        src={rightArrow}
                        alt="rightArrow"
                        className="rightArrow"
                        style={{
                            display: activeStep === 3 ? 'block' : 'none',
                        }}
                    />
                    <div className={activeStep === 3 ? 'wel_text_2_actual' : 'wel_text_2'}>
                        Integrations
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
