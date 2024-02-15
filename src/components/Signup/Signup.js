import React, { useState, useEffect } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signUpCandidate } from '../../actions/AuthenticationAction';
import { Link } from "react-router-dom";

function Signup(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('')
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const user = useSelector((state) => state.userSignUp);
  const { userInfo, error } = user;
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const onSubmit = data => {
    if (password === confirmPassword) {
      dispatch(signUpCandidate(data))
    } else {
      alert("wrong repeat password")
    }
  }
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  });
  return (
    <div className="signup-page">
      <div className="signup">
        <h2>Đăng Ký Thành Viên!</h2>
        <form onSubmit={handleSubmit(onSubmit)} classname="form-signup">
          <div className='formSignUp'>
            <div className='form-input'> Họ và tên
              <input {...register("username")} required></input>
            </div>
            <div className='form-input'> Email
              <input
                {...register("email")}
                type="email"
                required
              ></input>
            </div>
          </div>
          <div className='formSignUp'>
            <div className='form-input'> Mật khẩu
              <input
                {...register("password")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div>
            <div className='form-input'> Xác nhận mật khẩu
              <input
                // {...register("confirm password")}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="formSignUp">
            <div className='form-input'> Số điện thoại
              <input
                {...register("phone")}
                type="phone"
                required
              ></input>
            </div>
            <div className='form-input'> Ngày sinh
              <input {...register("birthday")} required></input>
            </div>
          </div>
          <div className='form-input'> Giới tính
            <div className='check'>
              <span>
                <input {...register("gender")} type="radio" value="MALE" />Nam
              </span>
              <span>
                <input {...register("gender")} type="radio" value="FEMALE" />Nữ
              </span>
              <span>
                <input {...register("gender")} type="radio" value="PREFER NOT TO SAY" />Khác
              </span>
            </div>
          </div>
          <input type="submit" value="Đăng Kí"></input>
          <div className="transmitSignUp">
            <span>Bạn là thành viên của ANJWork? </span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;