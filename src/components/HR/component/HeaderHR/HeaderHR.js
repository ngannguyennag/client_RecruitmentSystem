import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./HeaderHR.css";
import { signOut } from "../../../../actions/AuthenticationAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {getCandidateInfo} from '../../../../actions/CandidateAction';
import { companyLogoUrl, getDetailCompany } from '../../../../actions/CompanyAction';

function HeaderHR(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  // const users = useSelector(state => state.getCandidateInfo.user);
  // const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    // useEffect(() => {
    //   if(!users)
    //   dispatch(getCandidateInfo(token));
    // }, [dispatch,token,users]);
  const company = useSelector((state) => state.getDetailCompany.company);

  const [menu, setMenu] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleSignout = () => {
    dispatch(signOut());
  };
  const handleMenuToggle = () => {
    setMenu(!menu);
  };
  const handleIconClick = () => {
    setShowAccount2(!showAccount2);
  };
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <img src="/img/J.png"></img>
          <Link to="/"> ANJWork </Link>
        </div>
        <ul className={`menu-list ${menu ? "hidden" : ""}`}>
          <li>
            <Link to="/jobs"> Việc Làm </Link>
          </li>
          <li>
            <Link to="/companies"> Công ty </Link>
          </li>
        </ul>
        <div className="create-account">
          {/* <i className="account-icon" onClick={handleIconClick}>
            <img src={company?.companyLogo} alt='company-logo'></img>
          </i> */}
        </div>
      </section>
    </div>
  );
}

export default HeaderHR;
