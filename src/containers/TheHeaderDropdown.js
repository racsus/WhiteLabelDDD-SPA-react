import React, { useState, useEffect } from 'react';
import config from "../auth_config.json";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useAuth0 } from "../react-auth0-spa";
import API from "../utils/API.js";

const TheHeaderDropdown = () => {  
  const { auth0Client } = useAuth0();
  const [token, setToken] = useState('');
  const [avatar, setAvatar] = useState('avatars/logo_company.png');
  const [email, setEmail] = useState('');

  const LogOut = function() {  
    auth0Client.logout({
      returnTo: window.location.origin
    });
  };

  useEffect(() => {
    if (!token) {
      // Get user icon
      const getToken = async () => {    
        const accessToken = await auth0Client.getTokenSilently({
          audience: config.audience,
          scope: 'openid email profile',
        });
        setToken(accessToken);

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        API.get(`User/Me`)
        .then(response => {
            var result = response.data;
            if ((result.succeeded === true) && (result.object) && (result.object.picture)) {
              //console.log(result.object);
              setAvatar(result.object.picture);      
              setEmail(result.object.email);  
            }        
        }).finally(e => { 
        }); 
      };

      getToken();
    }
  }, [token, auth0Client]);

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
      <div className="c-avatar">
          <CImg
            id='imgAvatar'
            src={avatar}
            className="c-avatar-img"
            alt={email}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem onClick={LogOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
