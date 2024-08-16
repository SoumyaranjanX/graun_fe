import React, { useState, useEffect } from 'react';
import '@/assets/scss/profile/SetupPage.css';
import { SetUp } from '@/components/profile/setupComponent';
import '@/assets/scss/profile/SetUpStyle.css';
import NavBar from '@/components/profile/sidebarComponent';
import { useNavigate } from 'react-router-dom';
import '@/assets/scss/profile/formStyle.css';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import location from '@/assets/icons/location.svg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { set } from 'react-hook-form';
import set_restaurant_tier_pricing from '@/services/dispatch/api/set-restaurant-tier-pricing';
import { useAuth } from '@/context/AuthContext';
import PrivacyFooter from '@/components/privacyFooter';
import ProgressTracker from '@/components/profile/ProgressTracker';
import PrivacyFooter1 from '@/components/privacyFooter/PrivacyFooter';
interface Address {
  title: string;
  address: {
    label: string;
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    postalCode: string;
    state: string;
    stateCode: string;
    street: string;
    houseNumber: string;
  };
  position: {
    lat: number;
    lng: number;
  };
}

const restaurantTypeOptions = [
  {
    value: 'fastfood',
    label: 'Fast Food',
  },
  {
    value: 'fineDining',
    label: 'Fine Dining',
  },
  {
    value: 'casual_dining',
    label: 'Casual Dining',
  },
];

const regionsMap = [
  {
    value: '0-4 miles',
    label: '0-4 miles',
  },
  {
    value: '4-5 miles',
    label: '0-5 miles',
  },
  {
    value: '5-6 miles',
    label: '0-6 miles',
  },
];

const Profile: React.FC = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [contact, setContact] = useState('');
  const [address_1, setAddress_1] = useState('');
  const [address_2, setAddress_2] = useState('');
  const [town_city, setTown_city] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');
  const [search_postCode, setSearch_postCode] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [addressList, setAddressList] = useState([] as string[]);
  const [addressData, setAddressData] = useState([] as Address[]);
  const navigate = useNavigate();
  const { logout, pageTracker } = useAuth();
  const [restaurantType, setRestaurantType] = useState('');
  const [errors, setErrors] = useState({
    restaurantName: '',
    restaurantType: '',
    contact: '',
    address_1: '',
    address_2: '',
    town_city: '',
    country: '',
    postcode: '',
  });

  // useEffect(() => {
  //   if(pageTracker>=5){
  //     navigate('/orders');
  //   }
  // },[])

  const handleRestaurantName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRestaurantName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      restaurantName: value.length < 2 ? 'Restaurant name must be at least 2 letters.' : '',
    }));
  };

  const handleContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContact(value);
    const contactPattern = /^[0-9]{10}$/; // Adjust pattern based on phone number requirements
    setErrors((prevErrors) => ({
      ...prevErrors,
      contact: !contactPattern.test(value) ? 'Invalid contact number. Must be 10 digits.' : '',
    }));
  };

  const handleAddress_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress_1(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address_1: value === '' ? 'Address 1 is required.' : '',
    }));
  };

  const handleAddress_2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress_2(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address_2: value === '' ? 'Address 2 is required.' : '',
    }));
  };

  const handleRegions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTown_city(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      town_city: value === '' ? 'Town/City is required.' : '',
    }));
  };

  const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCountry(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: value === '' ? 'Country is required.' : '',
    }));
  };

  const handlePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPostcode(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      postcode: value === '' ? 'Postcode is required.' : '',
    }));
  };

  const handleSearchPostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch_postCode(event.target.value);
    fetch('http://grauns-dev-nlb-2ebd5522b451f0c3.elb.eu-west-1.amazonaws.com/geolocation/searchAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.addressList && data.addressList.length > 0) {
          const titles = data.addressList.map((address: { title: any }) => address.title);
          const addressData = data.addressList;
          setAddressData(addressData);
          console.log('Titles:', titles);
          setAddressList(titles);
          setAnchorEl(document.getElementById('search_postCode'));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleResultClick = (result: string) => {
    setSearch_postCode(result);
    console.log('Result:', addressData);
    const selectedAddress = addressData.find((address: any) => address.title === result);
    if (selectedAddress) {
      const { address } = selectedAddress;
      setPostcode(address.postalCode);
      setCountry(address.countryName);
      setTown_city(address.city);
      setAddress_1(address.street);
      if (address.houseNumber) {
        const address2 = address.houseNumber + ' ' + address.state;
        setAddress_2(address2);
      } else {
        setAddress_2(address.state);
      }
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the dropdown
  };
  const id = localStorage.getItem('id');
  const sendToServer = () => {
    // Perform the second fetch request after the first one is successful
    fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/addRestaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantName,
        contact,
        address1: address_1,
        address2: address_2,
        townCity: town_city,
        country,
        postcode,
        id,
        delivery_distance: selectedRegion,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Error al enviar la solicitud');
        }
        const data = await response.json();
        localStorage.setItem('restaurantId', data.restaurantId);
        fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            currentTrack: 1,
          }),
        });
        navigate('/working-hours');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/getRestaurantProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurantName(data.restaurantName);
        setContact(data.number);
        setAddress_1(data.address.line1);
        setAddress_2(data.address.line2);
        setTown_city(data.address.city);
        setCountry('United Kingdom');
        setPostcode(data.address.postcode);
        setRestaurantType('fastfood');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    setIsButtonEnabled(
      !errors.restaurantName &&
        !errors.restaurantType &&
        !errors.contact &&
        !errors.address_1 &&
        !errors.address_2 &&
        !errors.town_city &&
        !errors.country &&
        !errors.postcode &&
        !!restaurantName &&
        !!restaurantType &&
        !!contact &&
        !!address_1 &&
        !!address_2 &&
        !!town_city &&
        !!country &&
        !!postcode &&
        !!selectedRegion,
    );
  }, [
    errors,
    restaurantName,
    restaurantType,
    contact,
    address_1,
    address_2,
    town_city,
    country,
    postcode,
    selectedRegion,
  ]);
  const handleRegionChange = (event: any) => {
    setSelectedRegion(event.target.value);
  };

  const save_exit = () => {
    // Perform the second fetch request after the first one is successful
    fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/addRestaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantName,
        contact,
        address1: address_1,
        address2: address_2,
        townCity: town_city,
        country,
        postcode,
        id,
        delivery_distance: selectedRegion,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar la solicitud');
        }
        fetch('https://aws-nlb-prod.grauns.com/restaurant_backend/profile/updateUserProgress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: id,
            currentTrack: 1,
          }),
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    localStorage.clear();
    logout();
    window.location.reload();
  };

  return (
    <>
      <div
        className="bg-white"
        style={{
          minHeight: '100vh',
          display: 'flex',
        }}
      >
        <NavBar activeStep={1} />
        <div
          className="w-3/4 sec_page"
          style={{
            marginLeft: 30,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 20,
          }}
        >
          <div style={{ display: 'flex', width: '90%', flex: 1 }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: 'fit-content',
              }}
            >
              <div
                style={{
                  height: '10%',
                }}
              >
                <ProgressTracker step={0} />
              </div>
              <div
                style={{
                  height: '90%',
                }}
              >
                <Box
                  component="form"
                  style={{
                    marginTop: 0,
                    width: '100%',
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div
                    className="n_text"
                    style={{
                      
                      fontWeight: 'bold',
                      marginBottom: 15,
                    }}
                  >
                    Organization Details
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <TextField
                      className="inputRounded MuiInputBase-input"
                      id="restaurantName"
                      label="Restaurant name*"
                      variant="outlined"
                      style={{
                        width: '50%',
                        margin: 10,
                        marginLeft: 0,
                      }}
                      size="small"
                      inputProps={{
                        className: "MuiInputBase-input",
                        style: { padding: '10px 10px 10px 15px' },
                      }}
                      type="text"
                      value={restaurantName}
                      onChange={handleRestaurantName}
                      error={!!errors.restaurantName}
                      helperText={errors.restaurantName}
                    />
                    <TextField
                      className="inputRounded"
                      id="outlined-select"
                      select
                      label="Restaurant Type*"
                      variant="outlined"
                      style={{
                        width: '50%',
                        margin: 10,
                        marginRight: 0,
                        
                      }}
                      size="small"
                      sx={{
                        '& .MuiSelect-select': {
                          padding: '10px 10px 10px 15px',
                          
                        },
                      }}
                      value={restaurantType}
                      onChange={(event) => {
                        const value = event.target.value;
                        setRestaurantType(value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          restaurantType: value === '' ? 'Restaurant type is required.' : '',
                        }));
                      }}
                      error={!!errors.restaurantType}
                      helperText={errors.restaurantType}
                    >
                      {restaurantTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <TextField
                      className="inputRounded"
                      id="contact"
                      label="Contact Number*"
                      variant="outlined"
                      type="text"
                      style={{
                        width: '50%',
                        margin: 10,
                        marginLeft: 0,
                      }}
                      size="small"
                      inputProps={{
                        style: { padding: '10px 10px 10px 15px',  },
                      }}
                      value={contact}
                      onChange={handleContact}
                      error={!!errors.contact}
                      helperText={errors.contact}
                    />
                  </div>

                  <Box
                    component="form"
                    style={{
                      marginTop: 10,
                      width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div
                      className="n_text"
                      style={{
                        
                        fontWeight: 'bold',
                      }}
                    >
                      Organization Address
                    </div>
                    <Autocomplete
                      id="search_postCode"
                      freeSolo
                      options={addressList}
                      onChange={(event, value) => {
                        if (value) {
                          handleResultClick(value);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="inputRounded"
                          label="Search by postcode"
                          variant="outlined"
                          style={{
                            width: '100%',
                            margin: 10,
                            marginLeft: 0,
                          }}
                          size="small"
                          inputProps={{
                            style: { padding: '0px 10px 10px 15px',  },
                          }}
                          value={search_postCode}
                          onChange={handleSearchPostcode}
                        />
                      )}
                    />
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <TextField
                        className="inputRounded"
                        id="address_1"
                        label="Address 1*"
                        variant="outlined"
                        type="text"
                        style={{
                          width: '50%',
                          margin: 10,
                          marginLeft: 0,
                        }}
                        size="small"
                        inputProps={{
                          style: { padding: '10px 10px 10px 15px',  },
                        }}
                        value={address_1}
                        onChange={handleAddress_1}
                        error={!!errors.address_1}
                        helperText={errors.address_1}
                      />
                      <TextField
                        className="inputRounded"
                        id="address_2"
                        label="Address 2*"
                        variant="outlined"
                        type="text"
                        style={{
                          width: '50%',
                          margin: 10,
                          marginLeft: 0,
                        }}
                        size="small"
                        inputProps={{
                          style: { padding: '10px 10px 10px 15px',  },
                        }}
                        value={address_2}
                        onChange={handleAddress_2}
                        error={!!errors.address_2}
                        helperText={errors.address_2}
                      />
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <TextField
                        className="inputRounded"
                        id="town_city"
                        label="Town/City*"
                        type="text"
                        variant="outlined"
                        style={{
                          width: '50%',
                          margin: 10,
                          marginLeft: 0,
                        }}
                        size="small"
                        inputProps={{
                          style: { padding: '10px 10px 10px 15px',  },
                        }}
                        value={town_city}
                        onChange={handleRegions}
                        error={!!errors.town_city}
                        helperText={errors.town_city}
                      />
                      <TextField
                        className="inputRounded"
                        id="country"
                        label="Country*"
                        type="text"
                        variant="outlined"
                        style={{
                          width: '50%',
                          margin: 10,
                          marginLeft: 0,
                        }}
                        size="small"
                        inputProps={{
                          style: { padding: '10px 10px 10px 15px',  },
                        }}
                        value={country}
                        onChange={handleCountry}
                        error={!!errors.country}
                        helperText={errors.country}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <TextField
                        className="inputRounded"
                        id="postcode"
                        type="text"
                        label="Postcode*"
                        variant="outlined"
                        style={{
                          width: '50%',
                          margin: 10,
                          marginLeft: 0,
                        }}
                        size="small"
                        inputProps={{
                          style: { padding: '10px 10px 10px 15px',  },
                        }}
                        value={postcode}
                        onChange={handlePostcode}
                        error={!!errors.postcode}
                        helperText={errors.postcode}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '15px',
                          border: '1px solid #E0E0E0',
                          padding: '5px',
                          borderRadius: '60px',
                          width: '100%',
                          boxSizing: 'border-box',
                          marginBottom: '10px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            width: '70%',
                            color: '#000000',
                            fontSize: '16px',
                            lineHeight: '10px',
                            letterSpacing: '0.15px',
                            marginLeft: '15px',
                          }}
                        >
                          Preferred Miles of Delivery
                        </Typography>

                        <TextField
                          id="outlined-select-regions"
                          select
                          variant="outlined"
                          value={selectedRegion}
                          onChange={handleRegionChange}
                          sx={{
                            width: '100%',
                            borderRadius: '60px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '60px',
                            },
                            '& .MuiSelect-select': {
                              padding: '10px 10px 10px 20px',
                              
                            },
                          }}
                          size="small"
                        >
                          {regionsMap.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                    </div>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
          <div style={{ width: '90%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <button
                id="logout"
                className="btn_2_3 btn-primary"
                style={{
                  marginTop: 0,
                  marginLeft: 0,
                  position: 'relative',
                  width: 'auto',
                  padding: '0px 25px 0px 25px',
                }}
                type="button"
                onClick={() => {
                  save_exit();
                }}
              >
                Save & Exit
              </button>
              <button
                id="save"
                className="btn_21 btn-primary"
                style={{
                  backgroundColor: isButtonEnabled ? 'black' : '#E0E0E0',
                  position: 'inherit',
                  margin: 0,
                  marginLeft: 20,
                  width: 'auto',
                  padding: '0px 25px 0px 25px',
                }}
                type="button"
                onClick={sendToServer}
                disabled={!isButtonEnabled}
              >
                Save & Continue
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <PrivacyFooter1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
