import React, { useState, useEffect } from 'react';
import '@/assets/scss/profile/SetupPage.css';
import leftArrow from '@/assets/icons/left-arrow.svg';
import { SetUp } from '@/components/profile/setupComponent';
import Switch from '@mui/material/Switch';
import Hours from '@/components/profile/hoursComponent';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/profile/sidebarComponent';
import set_restaurant_tier_pricing from '@/services/dispatch/api/set-restaurant-tier-pricing';
import { useAuth } from '@/context/AuthContext';
import '@/assets/scss/profile/SetUpStyle.css';
import PrivacyFooter from '@/components/privacyFooter';

const WorkingHours: React.FC = () => {
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { mutate: setPrice } = set_restaurant_tier_pricing();
  const { logout, pageTracker } = useAuth();
  const id = localStorage.getItem('id');
 
  const handlerestaurant = (day: string) => {
    const closedDiv = document.querySelector(`#${day}`);
 
    if (closedDiv?.textContent === 'Open') {
      closedDiv.textContent = 'Close';
    } else if (closedDiv?.textContent === 'Close') {
      closedDiv.textContent = 'Open';
    }
  };

  // useEffect(() => {
  //   if(pageTracker>=5){
  //     navigate('/orders');
  //   }
  // },[])
 
  const [switchValues, setSwitchValues] = useState<SwitchValues>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
 
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    mondayOpen: '09:00',
    mondayClose: '17:00',
    tuesdayOpen: '09:00',
    tuesdayClose: '17:00',
    wednesdayOpen: '09:00',
    wednesdayClose: '17:00',
    thursdayOpen: '09:00',
    thursdayClose: '17:00',
    fridayOpen: '09:00',
    fridayClose: '17:00',
    saturdayOpen: '09:00',
    saturdayClose: '17:00',
    sundayOpen: '09:00',
    sundayClose: '17:00',
  });
 
  interface SwitchValues {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    [key: string]: boolean;
  }
  interface WorkingHours {
    mondayOpen: string;
    mondayClose: string;
    tuesdayOpen: string;
    tuesdayClose: string;
    wednesdayOpen: string;
    wednesdayClose: string;
    thursdayOpen: string;
    thursdayClose: string;
    fridayOpen: string;
    fridayClose: string;
    saturdayOpen: string;
    saturdayClose: string;
    sundayOpen: string;
    sundayClose: string;
  }
 
  const fetchWorkingHours = async () => {
    try {
      const res = await fetch(
        'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/get-restaurant',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      );
      const data = await res.json();
      const restaurantId = data.id;
      localStorage.setItem('restaurantId', restaurantId);
 
      const workingHoursRes = await fetch(
        'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getWorkingHours',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ restaurantId }),
        },
      );
 
      const workingHoursData = await workingHoursRes.json();
      const switchValues = workingHoursData.data.reduce((acc: SwitchValues, current: { day: string; switchValue: boolean }) => {
        acc[current.day.toLowerCase()] = current.switchValue;
        return acc;
      }, {});
 
      const hours = workingHoursData.data.reduce((acc: any, current: { day: string; startTime: string; endTime: string }) => {
        acc[`${current.day.toLowerCase()}Open`] = current.startTime;
        acc[`${current.day.toLowerCase()}Close`] = current.endTime;
        return acc;
      }, {});
 
      setSwitchValues(switchValues);
      setWorkingHours(hours);
    } catch (error) {
      console.error('Error fetching working hours:', error);
    }
  };
 
  useEffect(() => {
    fetchWorkingHours();
  }, [id]);
 
  const sendToServer = () => {
    const userId = localStorage.getItem('id');
    setPrice({});
    const restId = localStorage.getItem('restaurantId');
 
    fetch(
      'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/working-hours',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          monday: switchValues.monday,
          tuesday: switchValues.tuesday,
          wednesday: switchValues.wednesday,
          thursday: switchValues.thursday,
          friday: switchValues.friday,
          saturday: switchValues.saturday,
          sunday: switchValues.sunday,
          mondayOpen: workingHours.mondayOpen,
          mondayClose: workingHours.mondayClose,
          tuesdayOpen: workingHours.tuesdayOpen,
          tuesdayClose: workingHours.tuesdayClose,
          wednesdayOpen: workingHours.wednesdayOpen,
          wednesdayClose: workingHours.wednesdayClose,
          thursdayOpen: workingHours.thursdayOpen,
          thursdayClose: workingHours.thursdayClose,
          fridayOpen: workingHours.fridayOpen,
          fridayClose: workingHours.fridayClose,
          saturdayOpen: workingHours.saturdayOpen,
          saturdayClose: workingHours.saturdayClose,
          sundayOpen: workingHours.sundayOpen,
          sundayClose: workingHours.sundayClose,
          restaurantId: restId,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(
          'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: id,
              currentTrack: 2,
            }),
          },
        );
        navigate('/terms-and-conditions');
      })
      .catch((err) => {
        console.error('Error saving working hours:', err);
        navigate('/terms-and-conditions');
      });
  };
 
  const handleSwitchChange = (day: string) => {
    setSwitchValues((prevState: SwitchValues) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };
 
  const handleOpenTimeChange = (day: string, time: string) => {
    setWorkingHours((prevState) => ({
      ...prevState,
      [`${day}Open`]: time,
    }));
  };
 
  const handleCloseTimeChange = (day: string, time: string) => {
    setWorkingHours((prevState) => ({
      ...prevState,
      [`${day}Close`]: time,
    }));
  };
 
  useEffect(() => {
    const isAnySwitchOn = Object.values(switchValues).some((value) => value);
    setIsButtonEnabled(isAnySwitchOn);
  }, [switchValues]);
 

    return (
      <>
      <div className="bg-white flex main_page">
        <NavBar activeStep={1} />
        <div className="w-3/4 sec_page">
          <div className="text-[1.5rem] n_text">Set-up Operating hours</div>
          <div className="week_days">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day}>
                <div className='day1'>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </div>

                <div className="day">
                  <Switch
                    checked={switchValues[day]}
                    onChange={() => {
                      handlerestaurant(day);
                      handleSwitchChange(day);
                    }}
                    sx={{
                      positions: 'absolute',
                      left: '116px',
                      bottom: '10px',
                      color: 'primary',
                    }}
                  />

                  <div className="closed" id={day}>
                    {switchValues[day] ? 'Open' : 'Close'}
                  </div>
                  <div className="hours" id={`${day}-hours`}>
                    <Hours
                      openTime={workingHours[`${day}Open` as keyof WorkingHours]}
                      closeTime={workingHours[`${day}Close` as keyof WorkingHours]}
                      onChangeOpenTime={(time: string) => handleOpenTimeChange(day, time)}
                      onChangeCloseTime={(time: string) => handleCloseTimeChange(day, time)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <SetUp activeStep={1} />
          <div className="btns">
            <button
              id="logout"
              className="btn_2_3 btn-primary"
              type="button"
              onClick={() => {
                sendToServer();
                localStorage.clear();
                logout();
                window.location.reload();
              }}
            >
              Save & Exit
            </button>
            <button
              className="btn_back btn-primary"
              type="button"
              onClick={() => {
                fetchWorkingHours();
                navigate('/profile');
              }}
            >
              <img src={leftArrow} alt="leftArrow" className="leftArrow" />
              Back
            </button>
            <button
              className="btn_2 btn-primary"
              style={{
                backgroundColor: isButtonEnabled ? 'black' : '#E0E0E0',
              }}
              type="button"
              onClick={() => sendToServer()}
              disabled={!isButtonEnabled}
            >
              Save & Continue
            </button>
          </div>
        </div>
        
      </div>
      {/* <PrivacyFooter /> */}
      </>
    );
};

export default WorkingHours;
