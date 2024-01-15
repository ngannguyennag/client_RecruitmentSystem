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
          <li>
            <Link to="/career"> Nghề nghiệp </Link>
          </li>
          <li>
            <Link to="/myjobs"> Việc của tôi </Link>
          </li>
        </ul>
        <div className="create-account">
          <i className="account-icon" onClick={handleIconClick}>
            <img src={company?.companyLogo} alt='company-logo'></img>
          </i>
          {/* {showAccount2 && (
            <ul className="account-menu">
                <li className="file">
                    <i className="account-icon-menu"><FileOutlined/></i>
                    <Link className='fileText' to="/userfile">
                        <i >Hồ sơ của tôi</i>
                    </Link>
                </li>
                <li className="file">
                    <i className="account-icon-menu"><SettingOutlined/></i>
                    <Link className='fileText' to="/usermanage">
                        <i>Quản lý tài khoản</i>
                    </Link>
                </li>
                <li className="file">
                    <i className="account-icon-menu"><BellOutlined/></i>
                    <Link className='fileText' to="/usernotification">
                        <i>Thông báo việc làm</i>
                    </Link>
                </li>
                <li className ="file" onClick={handleSignout}>
                    <i className="account-icon-menu"><LogoutOutlined/></i>
                    <Link className='fileText' to="/">
                        <i>Đăng xuất</i>
                    </Link>
                </li>
            </ul>
          )} */}
        </div>
      </section>
    </div>
  );
}

export default HeaderHR;
