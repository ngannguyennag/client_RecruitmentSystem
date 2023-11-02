import React from "react";
import { useSelector } from "react-redux";
import "./HR.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import SidebarHR from './component/SidebarHR/SidebarHR'
import Routes from './component/RouterHR'
import HeaderHR from './component/HeaderHR/HeaderHR'
function HR(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const history = useHistory();
  return (
    <Router>
      <Route
        render={(props) => (
          <div className={`layout`}>
            {/* <HeaderHR></HeaderHR> */}
            <SidebarHR />
            <div className="layout__content">
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      ></Route>
    </Router>
    
  );
}

export default HR;
