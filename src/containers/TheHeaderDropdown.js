import React, { useState, useEffect } from 'react';
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
          audience: '<auth0_audience>',
          scope: 'openid email profile',
        });
        setToken(accessToken);

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        API.get(`User/Me`)
        .then(response => {
            //console.log(response.data);
            var result = response.data;
            if ((result.succeeded === true) && (result.object) && (result.object.picture)) {
              document.getElementById("imgAvatar").src = result.object.picture;          
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
            src={'avatars/logo_unops.png'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
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
