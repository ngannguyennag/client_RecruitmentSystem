import React, { useState, useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/AuthenticationAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {register, handleSubmit, formState: { errors }} = useForm();
  const user = useSelector((state) => state.userSignIn);
  const { userInfo, error } = user;
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const onSubmit = (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (error) {
      setErrorMessage("Bạn đã nhập sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại!");
    } else {
      setErrorMessage(""); // Xóa thông báo lỗi nếu không có lỗi
    }

    if(userInfo){ 
      var string = userInfo['access_token'];
      var decodedHeader = jwt_decode(string);
      var roleAdmin = decodedHeader.role[0].authority;
      if (roleAdmin === "CANDIDATE") {
        history.push("/candidate/profile-candidate");
      } else if(roleAdmin === "ADMIN") {
        history.push("/admin");
      } else if(roleAdmin === "COMPANY") {
        history.push("/hr");
      }
    }
  }, [error, userInfo, history]);

  return (
    <div className="login-page">
      <div className="login">
        <span> ĐĂNG NHẬP</span>
        <h3>Chào mừng bạn đã quay trở lại!</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="form-login">
          <div className="login-input">
            <span> Email</span>
            <input 
              {...register("email")} 
              required
            />
          </div>
          <div className="login-input">
            <span> Mật khẩu</span>
            <input
              {...register("password")}
              type="password"
              required
            />
          </div>
          <div className='forget'>
            <Link to='/forgot_password'>Quên mật khẩu?</Link>
          </div>
          <input type="submit" value="Đăng Nhập" />
          {errorMessage && <h2 className="errorMessage">{errorMessage}</h2>} {/* Hiển thị thông báo lỗi */}
          <div className='forgetTransmit'>
            <span>Chưa có tài khoản?</span>
            <Link to="/register">Đăng ký tài khoản!</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
