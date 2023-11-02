import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
const UserManage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleNotificationEmailChange = (e) => {
    setNotificationEmail(e.target.value);
  };

  // const handleSubmitEmailChange = (e) => {
  //   e.preventDefault();
  //   setCurrentEmail(newEmail);
  //   setNewEmail('');
  // };

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
    <div className="manageContainer">
      <div className="container">
        <div className='transmit'>
          <div className="row">
            <h2> Quản Lý Tài Khoản</h2>
          </div>
        </div>
        <div className='transmit'>
          <div className='row'>
            <h2>Email đăng nhập & mật khẩu</h2>
            {/* <p>Email truy cập hiện tại: {currentEmail}</p> */}
          </div>
          <div className='links'>
            <Link to="/usermanagepassword">Thay đổi mật khẩu</Link>
            {/* <Link to='/usermanageaccount'>Đổi email truy cập</Link> */}
          </div>
        </div>
        <div className='transmit'>
          <div className='row'>
            <h2>Cài đặt thông báo qua Email</h2>
            <p>Thông báo hỗ trợ bạn có việc làm phù hợp: theo dõi trạng thái ứng tuyển, nhà tuyển dụng xem hồ sơ,...</p>
          </div>
          <div className='links'>
            <Link to='/usermanageaccount'>Thiết lập</Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserManage;
