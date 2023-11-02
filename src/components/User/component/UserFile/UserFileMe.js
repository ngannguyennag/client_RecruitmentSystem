import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './UserFile.css';
const UserFileMe = () => {
  return (
    <div className="manageContainer">
      <div className="container">
        <div className='transmit'>
          <div className="row">
            <h2> Hồ sơ của tôi</h2>
          </div>
        </div>
        <div className='transmit'>
          <div className='row'>
            <h2>Thông tin cá nhân</h2>
          </div>
          <div className='links'>
            <Link to="/userfileedit">Thay đổi </Link>
          </div>
        </div>
        <div className='transmit'>
          <div className='row'>
            <h2>Ảnh đại diện</h2>
          </div>
          <div className='links'>
            <Link to='/useruploadavatar'>Thay đổi</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFileMe;
