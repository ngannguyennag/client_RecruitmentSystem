import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./HeaderUser.css";
import { Link } from "react-router-dom";
import {getCandidateInfo} from '../../../../actions/CandidateAction';
import { DownOutlined } from "@ant-design/icons";

function HeaderUser(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.getCandidateInfo.user);
  const userSignin = useSelector((state) => state.userSignIn.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  useEffect(() => {
    if (!users && token) {
      dispatch(getCandidateInfo(token));
    }
  }, [dispatch, token, users]);
  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <img src="img/J.png"></img>
          <Link to="/"> ANJWork </Link>
        </div>
        <ul className= 'menu-list'>
        <li>
            <Link to="/"> Trang chủ </Link>
          </li>
          <li>
            <Link to="/jobs"> Tìm việc </Link>
          </li>
          <li>
            <Link to="/companies"> Doanh nghiệp </Link>
          </li>
          <li>
            <Link to="/career"> Ứng viên </Link>
          </li>
          <li>
            <Link to="/myjobs"> Khác <DownOutlined  style={{fontSize:'14px'}}/></Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default HeaderUser;
