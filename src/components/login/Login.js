import React, { useEffect } from 'react';
import './Login.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../actions/UserAction'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.userSignin);
  const { userInfo, error } = user;
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if(userInfo){ 
      var string = userInfo['access_token'];
    var decodedHeader = jwt_decode(string);
    var roleAdmin = decodedHeader.roles;
      if (roleAdmin === "ROLE_USER") {
        history.push("/user");
      }
      else if(roleAdmin === "ROLE_ADMIN"){
        history.push("/admin");
      }
      else if(roleAdmin === "ROLE_HR"){
        history.push("/")
      }
    }
    
    
  });

  return (
    <div class="login-page">
      <div className="login">
      <span> ĐĂNG NHẬP</span>
      <h3>Chào mừng bạn đã quay trở lại!</h3>
      <form onSubmit={handleSubmit(onSubmit)} class="form-login">
        <div className="login-input">
          <span> Email</span>
          <input 
          {...register("email")} 
          // placeholder="Email" 
          required/>
        </div>
        <div className="login-input">
          <span> Password</span>
          <input
            {...register("password")}
            // placeholder="Password"
            type="password"
            required
          ></input>
        </div>
        <div className='forget'>
          <Link to='/forgot_password'>Quên mật khẩu?</Link>
        </div>
        <input type="submit" value="Đăng Nhập"></input>
        {error ? <h2>{error}</h2> : <></>}
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