import React from "react";
import { useSelector } from "react-redux";
import "./UserDashboard.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar'
import Routes from './components/Routes'

function UserDashboard(props) {
  const userSignin = useSelector((state) => state.userSignin);
  return (
    <Router>
      <Route
        render={(props) => (
          <div className={`layout`}>
            <Sidebar />
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

export default UserDashboard;
