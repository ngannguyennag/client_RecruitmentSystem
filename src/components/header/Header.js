import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { signOut } from "../../actions/AuthenticationAction";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(true);
  const handleSignout = () => {
    dispatch(signOut());
  };
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
            <img src="/img/J.png"></img>
            <Link to="/"> ANJWork </Link>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li>
            <Link to="/jobs"> Việc Làm </Link>
          </li>
          <li>
            <Link to="/companies"> Công ty </Link>
          </li>
        </ul>
        <div className="create-account">
            <Link to="register"> Đăng kí </Link>
            <Link to="login"> Đăng nhập </Link>
        </div>
      </section>
    </div>
  );
}
export default Header;
