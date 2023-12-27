import React from "react";
import User from "../components/UserDashboard/UserDashboard";
import HeaderUser from "../components/UserDashboard/components/HeaderUser/HeaderUser"
function UserPage(props) {
  return (
    <div>
        <HeaderUser></HeaderUser>
      <User></User>
    </div>
  );
}
export default UserPage;
