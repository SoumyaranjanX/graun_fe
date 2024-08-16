import React, { useEffect, useRef, useState } from 'react';
import '@/assets/scss/profile/SetupPage.css';
import '@/assets/scss/profile/SetUpStyle.css';
import leftArrow from '@/assets/icons/left-arrow.svg'; // Fixed import statement
import { SetUp } from '@/components/profile/setupComponent';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/profile/sidebarComponent';
import { useAuth } from '@/context/AuthContext';
import TermsAndConditions from '@/utils/auth/TermsAndConditions';
import PrivacyFooter from '@/components/privacyFooter';
import { Box } from '@mui/material';

const TermsConditions: React.FC = () => {
  const navigate = useNavigate();
  const { logout, pageTracker } = useAuth();
  const id = localStorage.getItem('id');
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleIsChecked = () => {
    const checkbox = document.getElementById('agreeCheckbox') as HTMLInputElement;
    if (checkbox.checked) {
      fetch(
        'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            currentTrack: 3,
          }),
        },
      );
      navigate('/payment');
    } else {
      alert('Please agree to the terms and conditions');
    }
  };

  useEffect(() => {
    if(pageTracker>=5){
      navigate('/orders');
    }
  },[])

  const [checkbox, setCheckbox] = useState({ checked: false });
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const termsRef = useRef(null);

  const handleScroll = () => {
    console.log('handleScroll');
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      console.log('scrollHeight', scrollHeight, scrollTop + clientHeight);

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setScrolledToBottom(true);
      }
    }
  };

  useEffect(() => {
    const termsElement = termsRef.current;
    if (termsElement) {
      termsElement.addEventListener('scroll', handleScroll);
      return () => {
        termsElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const currentYesr = new Date().getFullYear();

  return (
    <>
    <div className="bg-white flex main_page">
      <NavBar activeStep={1} />
      <div className="w-3/4 sec_page">
        {/* Contenido de la sección blanca */}
        <div className="text-[1.5rem] n_text">Terms and Conditions</div>
        {/* <textarea
          ref={termsRef}
          className="termsTextArea"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id blandit nulla. Etiam maximus finibus dignissim. Donec accumsan massa ipsum, ut mattis nunc commodo non. Sed ut pulvinar risus. Maecenas ut felis ut justo vulputate posuere ac a neque. Maecenas feugiat eleifend magna, sed ornare sapien laoreet id. Maecenas sit amet lacus lobortis tortor pretium bibendum. Integer a elit sed purus vehicula scelerisque. Sed at dolor vel velit posuere porttitor. Etiam est elit, dignissim nec risus ut, volutpat suscipit arcu. Fusce blandit commodo mi convallis posuere.
    
                        Curabitur in tempus velit, at vehicula sapien. Praesent ipsum tellus, lacinia ut diam ac, euismod mollis odio. Aenean vel nisi lorem. Maecenas placerat feugiat viverra. Quisque erat enim, rutrum et orci nec, varius tempor est. Nullam commodo commodo sapien, et gravida sem tincidunt sodales. Aliquam sit amet sem euismod, vestibulum nibh at, porta tortor. Nunc finibus sodales venenatis. Duis semper sed odio ac fermentum. Mauris eget sagittis nibh.
                        
                        Integer dolor sem, varius fermentum augue non, lobortis tincidunt nisi. Ut non turpis tellus. Sed ut ullamcorper eros. Cras suscipit sapien sed tincidunt interdum. Aliquam sit amet bibendum turpis. Integer ligula ligula, auctor tempor augue sed, ullamcorper tincidunt lacus. Phasellus vel felis arcu. Mauris at quam nec ex rhoncus elementum ac eget ex. Etiam magna nisl, efficitur ac auctor id, consequat vel leo. Cras a vehicula orci. Cras tincidunt, augue ac auctor sodales, ipsum leo ullamcorper eros, eget aliquam est justo vehicula diam. Vestibulum a molestie massa, ac congue ipsum.
                        
                        Aliquam id feugiat nunc. Phasellus lacinia gravida sapien vitae tempor. Proin luctus mattis tempus. Sed dapibus in purus a dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras egestas, elit at porta mattis, massa massa mollis magna, quis gravida erat mi eu mi. Etiam pulvinar commodo diam quis rhoncus. Proin mi mauris, laoreet in libero vitae, congue sodales urna. Curabitur tortor massa, rhoncus eu diam dapibus, varius volutpat lorem. Maecenas sodales id libero ac varius. Ut tempor dui at suscipit mattis. Phasellus nec ultricies dui, sit amet ultrices ipsum. Vivamus fermentum cursus luctus. Vivamus eget tortor velit. Nullam posuere orci ut pellentesque tempor. Pellentesque nisi orci, laoreet ut diam nec, dapibus finibus libero."
          disabled
          onScrollCapture={(event) => {
            const element = event.target as HTMLTextAreaElement;
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
              setShowCheckbox(true);
            }
          }}
        ></textarea> */}
        <div
          ref={termsRef}
          className="termsTextArea"
          style={{ overflowY: 'scroll', height: '400px', border: '1px solid black', padding: '10px' }}
          onScrollCapture={(event) => {
            const element = event.target as HTMLDivElement;
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
              setShowCheckbox(true);
            }
          }}
        >
          <TermsAndConditions />
        </div>
        <div className="checkboxContainer">
          <input
            type="checkbox"
            id="agreeCheckbox"
            className="checkboxStyle"
            disabled={!scrolledToBottom}
            onChange={(event) => setCheckbox({ checked: event.target.checked })}
          />
          <label htmlFor="agreeCheckbox">I agree to the terms and conditions</label>
        </div>
        <SetUp activeStep={2} />
        <div className="btns">
          <button
            id="logout"
            className="btn_2_3 btn-primary"
            type="button"
            onClick={() => {
              localStorage.clear();
              logout();
              window.location.reload();
            }}
          >
            Save & Exit
          </button>
          <button className="btn_back btn-primary" type="button" onClick={() => navigate('/working-hours')}>
            <img src={leftArrow} alt="leftArrow" className="leftArrow" />
            Back
          </button>
          <button
            className={`btn-primary ${checkbox.checked ? 'btn_2' : 'btn_2_start'}`}
            type="button"
            onClick={() => handleIsChecked()}
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
export default TermsConditions;
