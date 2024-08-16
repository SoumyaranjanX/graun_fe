import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import uberAuthCallbackAPI from "@/services/auth/API/uberAuthCallback";
import restaurantUberIntegration from "@/services/restaurant/API/restaurantUberIntegration";


const UberAuthCallback: React.FC= () => {
  const location = useLocation();
  const [authCode, setAuthCode] = useState<any>('')

  const { mutate: uberAuthCallbackAPICall } = uberAuthCallbackAPI();
  const { mutate: restaurantUberIntegrationCall } = restaurantUberIntegration();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setAuthCode(params.get('code'))
  },[])

  useEffect(() => {

    if(authCode != ''){
      const payload = {
        auth_code: authCode
      }
      uberAuthCallbackAPICall(payload, {
        onSuccess: (data) => {
          restaurantUberIntegrationCall(payload, {
            onSuccess: (data) => {
              window.location.href = '/integrations';
            }
          });
        }
      });
    }

  },[authCode])



  return (
    <div style={{padding: 10}}>
      Redirecting ....
    </div>
  );
};

export default UberAuthCallback;
