import React, { useRef, useState, useEffect } from 'react';
import './UserFile.css';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getCandidateInfo, getCandidateUpdate } from '../../../../actions/CandidateAction';
import { Link } from "react-router-dom";

function UserFileUpdate() {
  const dispatch = useDispatch();
  // const [password, setPassword] = useState('');
  const history = useHistory();
  const [setIsEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // const [showAccount2, setShowAccount2] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
  const userSignup = useSelector((state) => state.userSignup);
  const users = useSelector(state => state.getCandidateInfo.user);
  const userUpdate = useSelector(state => state.getCandidateUpdate.userUpdate)
  const { userInfo} = userSignup;
  // const genderValue = watch('gender');
  useEffect(() => {
    dispatch(getCandidateInfo(token));
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const onSubmit = data => {
    dispatch(getCandidateUpdate(token, {
      firstName: data.firstname || users.firstName,
      lastName: data.lastname || users.lastName,
      username: data.username || users.username,
      email: data.email || users.email,
      phoneNumber: data.phone || users.phoneNumber,
      birthday: data.birthday || users.birthday,
      gender: data.gender || users.gender
    }));
    setIsSaved(true);
  };
  useEffect(() => {
    if (userUpdate) {
      setIsSaved(false);
      setIsEditMode(false);
    }
  }, [userUpdate]);

  return (
    <div className="user-page">
      <div className="userInfor">
        <div className="infor">
          <div className='inforText'>Thông tin cá nhân</div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
            <div className="form">
              <div className="form-input">FirstName
                <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
              </div>
              <div className='form-input'>LastName
                <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
              </div>
              <div className='form-input'>Username
                <input {...register("username")} defaultValue={users && users.username} required></input>
              </div>
              <div className='form-input'>
                <label>Email:</label>
                <input
                  {...register("email")}
                  type="email"
                  defaultValue={users && users.email}
                  required
                ></input>
                {errors.email && <span>This field is required</span>}
              </div>
              <div className='form-input'>Phone Number
                <input
                  {...register("phone")}
                  type="phone"
                  defaultValue={users && users.phoneNumber}
                  required
                ></input>
              </div>
              <div className='form-input'>Date of Birth
                <input {...register("birthday")} defaultValue={users && users.birthday} required></input>
              </div>
              <div className='form-input'>Gender
                <div className='check'>
                  <span>
                    <input
                      {...register("gender")}
                      type="radio"
                      value="MALE"
                      defaultChecked={users?.gender === "MALE"}
                    />
                    Male
                  </span>
                  <span>
                    <input
                      {...register("gender")}
                      type="radio"
                      value="FEMALE"
                      defaultChecked={users?.gender === "FEMALE"}
                    />
                    Female
                  </span>
                  <span>
                    <input
                      {...register("gender")}
                      type="radio"
                      value="NA"
                      defaultChecked={users?.gender === "OTHER"}
                    />
                    Prefer not to say
                  </span>
                </div>
                {errors.gender && <span>This field is required</span>}
              </div>
              <div className="buttonInfo">
                <button className='buttonDestroy' type="button" >
                  <Link to='userfile'>Quay Lại</Link>
                </button>
                {!isSaved && <button className='buttonSaveInfo' type="submit" >Lưu </button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserFileUpdate;