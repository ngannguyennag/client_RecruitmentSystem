import React from "react";
import "./User.css";
import RouteUser from "./RouterUser";
import HeaderUser from "./component/HeaderUser/HeaderUser";
function User(props) {
  return (
    <section id="myorder">
      <div className="myorder">
        <HeaderUser></HeaderUser>
        <div className="myorder-content">
          <RouteUser></RouteUser>
        </div>
        </div>
    </section>
  );
}

export default User;