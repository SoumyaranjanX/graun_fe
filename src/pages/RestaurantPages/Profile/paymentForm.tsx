import React, { useState, useEffect } from 'react';
import '@/assets/scss/profile/SetupPage.css';
import '@/assets/scss/profile/stripeFormStyle.css';
import { SetUp } from '@/components/profile/setupComponent';
import leftArrow from '@/assets/icons/left-arrow.svg';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import '@/assets/scss/profile/SetUpStyle.css';
import NavBar from '@/components/profile/sidebarComponent';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import '@/assets/scss/profile/cardStyle.css';

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const { logout, pageTracker } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [exp_month, setExp_month] = useState('');
  const [exp_year, setExp_year] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [type, setType] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    console.log('useEffect test');
    const id = localStorage.getItem('id');
    const fetchCardDetails = async () => {
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
      if (!restaurantId) {
        console.error('Restaurant ID not found in local storage');
        return;
      }
  
      try {
        const response = await fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getCardDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        
        if (data) {
          setCardNumber(data.paymentLast4);
          setExp_month(data.paymentExpMonth);
          setExp_year(data.paymentExpYear);
          setType(data.paymentBrand);
          localStorage.setItem('last4', data.paymentLast4);
          localStorage.setItem('exp_month', data.paymentExpMonth);
          localStorage.setItem('exp_year', data.paymentExpYear);
          localStorage.setItem('brand', data.paymentBrand);
          localStorage.setItem('ShowCard', 'true');
          setShowForm(false);
          setShowDetails(true);
          console.log('data', data);
        }
      } catch (error) {
        console.error('Failed to fetch card details:', error);
      }
    };
  
    fetchCardDetails();
  }, []);

  useEffect(() => {
    if(pageTracker>=5){
      navigate('/orders');
    }
  },[])
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      'https://aws-nlb-prod.grauns.com/restaurant_backend/profile/create-payment-intent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        const id = data.id;
        localStorage.setItem('clientSecret', data.clientSecret);
        localStorage.setItem('paymentIntent', id);
      });
  }, []);

  const options = {
    clientSecret,
  };

  const stripePromise = loadStripe(
    'pk_live_51OBIaBAFdYSyupX9n9e2HuGDxlFYNKPt9ipX27Ne8xCVcYRLvmOVPxRRocNs0v9qztj9Eq8RWdxNfNoua1SakTO900Rfqekrlg',
  );

  useEffect(() => {
    if(!showDetails){
      const interval = setInterval(() => {
        const ShowCard = localStorage.getItem('ShowCard');
        setCardNumber(localStorage.getItem('last4') || '');
        setExp_month(localStorage.getItem('exp_month') || '');
        setExp_year(localStorage.getItem('exp_year') || '');
        setType(localStorage.getItem('brand') || '');
        if (ShowCard === 'true' && exp_month && exp_year && cardNumber && type) {
          setShowForm(false);
          setShowDetails(true);
          setIsButtonEnabled(true);
        }
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  useEffect(() => {
    if(showDetails){
      setShowForm(false);
      setIsButtonEnabled(true);
    }
  }
  , [showDetails]);

  return (
    <div className="bg-white flex main_page">
      <NavBar activeStep={2} />
      <div className="w-3/4 sec_page">
        {/* Contenido de la sección blanca */}
        <div className="text-[1.5rem] n_text">Payment method</div>
        <div className="App">
          {clientSecret && showForm && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm setShowDetails={setShowDetails} />
            </Elements>
          )}
          {showDetails && (
            <div className="flip-card" style={{ marginTop: '30px' }}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  {/* <p className="heading_8264">{type}</p> */}
                  {type === 'visa' && (
                    <div>
                    <svg
                    className='logo1'
                      fill="#ffffff"
                      width={36}
                      height={36}
                      viewBox="0 0 24 24"
                      y="0px"
                      x="0px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" />
                    </svg>
                    </div>
                  )}
                  {type === 'mastercard' && (
                    <svg
                      className="logo1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={36}
                      height={36}
                      viewBox="0 0 48 48"
                    >
                      <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                      <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                      <path
                        fill="#ff3d00"
                        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                      />
                    </svg>
                  )}

                  <svg
                    version="1.1"
                    className="chip"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="30px"
                    height="30px"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                  >
                    {' '}
                    <image
                      id="image0"
                      width={50}
                      height={50}
                      x={0}
                      y={0}
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
        fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
        ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
        e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
        ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
        u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
        fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
        lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
        tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
        g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
        /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
        orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
        GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
        OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
        I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
        lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
        JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
        qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
        1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
        BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
        amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
        S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
        cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
        MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
        LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                    />
                  </svg>
                  <svg
                    version="1.1"
                    className="contactless"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="20px"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                  >
                    {' '}
                    <image
                      id="image0"
                      width={50}
                      height={50}
                      x={0}
                      y={0}
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
        cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
        lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
        fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
        GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
        VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
        HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
        bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
        DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
        qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
        sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
        Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
        XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
        cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
        nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
        xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
        MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
        OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
        MDowMIXeN6gAAAAASUVORK5CYII="
                    />
                  </svg>
                  <p className="number">**** **** **** {cardNumber}</p>
                  <p className="valid_thru">VALID THRU</p>
                  <p className="date_8264">
                    {exp_month} / {exp_year}
                  </p>
                </div>
                <div className="flip-card-back">
                  <div className="strip" />
                  <div className="mstrip" />
                  <div className="sstrip">
                    <p className="code">***</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <SetUp activeStep={3} />
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
          <button className="btn_back btn-primary" type="button" onClick={() => navigate('/terms-and-conditions')}>
            <img src={leftArrow} alt="leftArrow" className="leftArrow" />
            Back
          </button>
          <button
            className="btn_2 btn-primary"
            style={{
              backgroundColor: isButtonEnabled ? 'black' : '#C4C4C4',
              cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
            }}
            type="button"
            onClick={() => navigate('/integrations')}
            disabled={!isButtonEnabled}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaymentForm;
