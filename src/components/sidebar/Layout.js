import React, { useState } from 'react';
import Aside from './Aside';
import Main from './Main';
import { isUserLogon } from "../auth/AuthManagement";
import Login from "../../pages/Login/Login";
import "./styles/sidebar.css";

function Layout() {
  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isLogon, setIsLogon] = useState(isUserLogon());


  // set sidebar to the right
  const handleRtlChange = (checked) => {
    setRtl(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };



  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      {
        isLogon === true ?
          <>
            <Aside
              image={false} // can set the background image for the sidebar here
              rtl={rtl}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
            />
            <Main
              image={false} // can set the background image for the sidebar here
              toggled={toggled}
              rtl={rtl}
              handleToggleSidebar={handleToggleSidebar}
              handleRtlChange={handleRtlChange}
            />
          </>
          :
          <Login />
      }
    </div >
  )
}

export default Layout;