import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UserManageAccount from '../UserManageAccount/UserManageAccount'; // Import UserManageAccount component from file 2
const UserManage = () => {
  const [currentEmail, setCurrentEmail] = useState('ngannguyennag@gmail.com');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNotificationEmailChange = (e) => {
    setNotificationEmail(e.target.value);
  };

  const handleSubmitEmailChange = (e) => {
    e.preventDefault();
    setCurrentEmail(newEmail);
    setNewEmail('');
  };

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();
    // Code to update password
    setNewPassword('');
  };

  const handleSubmitNotificationEmail = (e) => {
    e.preventDefault();
    // Code to save notification email preference
    setNotificationEmail('');
  };

  return (
    <div className="container">
      <div className='transmit'>
        <h2> Quản Lý Tài Khoản</h2>
        </div>
      <div className='transmit'>
        <div className='row'>
          <h2>Email đăng nhập & mật khẩu</h2>
          <p>Email truy cập hiện tại: {currentEmail}</p>
        </div>
        <div className='links'>
          <Link to='/usermanageaccount'>Thay đổi mật khẩu</Link>
          <Link to='/usermanageaccount'><i>Đổi email truy cập</i></Link>
        </div>
      </div>
      <div className='transmit'>
        <div className='row'>
            <h2>Cài đặt thông báo qua email</h2>
            <p>Thông báo hỗ trợ bạn có việc làm phù hợp: theo dõi trạng thái ứng tuyển, nhà tuyển dụng xem hồ sơ,...</p>
        </div>
        <div className='links'>
            <Link to='/usermanageaccount'>Thiết lập</Link>
        </div>
    </div>
    </div>
  );
};

export default UserManage;
