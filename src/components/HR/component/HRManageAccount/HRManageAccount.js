import React, { useRef, useState, useEffect } from 'react';
import './HRManageAccount.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getCandidateInfo, getCandidateUpdate } from '../../../../actions/CandidateAction';
import { Link } from "react-router-dom";
import { EditOutlined, CameraOutlined } from '@ant-design/icons';

function HRManageAccount(props) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Thêm biến trạng thái isSaved
  const [showAccount2, setShowAccount2] = useState(false);
  const handleIconClick = () => {
    setShowAccount2(!showAccount2);
  };
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const [avatar, setAvatar] = useState();
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
    console.log(file);
  };
  const userSignup = useSelector((state) => state.userSignup);
  const users = useSelector(state => state.getCandidateInfo.user);
  const userUpdate = useSelector(state => state.getCandidateUpdate.userUpdate)
  const { userInfo, error } = userSignup;

  useEffect(() => {
    dispatch(getCandidateInfo(token));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);
  useEffect(() => {
    if (userUpdate) {
      setAvatar(null);
    }
  }, [userUpdate]);
  useEffect(() => {
    setAvatar(null);
  }, [userUpdate]);
  const handleEditClick = () => {
    setIsEditMode(true);
    setIsSaved(false); // Reset biến trạng thái khi chuyển sang chế độ chỉnh sửa
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setIsSaved(false); // Reset biến trạng thái khi hủy chỉnh sửa
    setAvatar(users.imgUrl);
  };

  const onSubmit = data => {
    console.log(data);
    if (data.email === "") {
      data.email = users.email;
    }
    if (avatar !== null) {
      const formData = new FormData();
      formData.append("firstname", data.firstname || users.firstName);
      formData.append("lastname", data.lastname || users.lastName);
      formData.append("username", data.username || users.username);
      formData.append("email", data.email || users.email);
      formData.append("phone", data.phone || users.phoneNumber);
      formData.append("birthday", data.birthday || users.birthday);
      formData.append("gender", data.gender || users.gender);
      formData.append("file", data.file || avatar.file);
      dispatch(getCandidateUpdate(token, formData));
    } else {
      dispatch(getCandidateUpdate(token, {
        firstname: data.firstname || users.firstName,
        lastname: data.lastname || users.lastName,
        username: data.username || users.username,
        email: data.email || users.email,
        phone: data.phone || users.phoneNumber,
        birthday: data.birthday || users.birthday,
        gender: data.gender || users.gender
      }));
      // Thực hiện logic lưu tại đây
      setIsEditMode(false);
      setIsSaved(true); // Đã lưu thông tin thành công
    };
  }
  const genderValue = users && users.gender;
  return (
    <div className="user-page">
      <div className="userInfor">
        <div className="infor">
          <div className='inforText'>Thông tin cá nhân</div>
          <div className="inforImage">
            {!isEditMode && !isSaved && <Link className="account-icon" onClick={handleEditClick}><EditOutlined /></Link>}
          </div>
        </div>
        {isEditMode ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
            <div className="form">
              <div className="form-input">FirstName
                <input {...register("firstname")} required></input>
              </div>
              <div className='form-input'>LastName
                <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
              </div>
            </div>
            <div className='form'>
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
            </div>
            <div className="form">
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
            </div>

            <div className='form-input'>Gender
              <div className='check'>
                <span>
                  <input {...register("gender")} type="radio" value="MALE" checked={genderValue === "MALE"} />Male
                </span>
                <span>
                  <input {...register("gender")} type="radio" value="FEMALE" checked={genderValue === "FEMALE"} />Female
                </span>
                <span>
                  <input {...register("gender")} type="radio" value="NA" checked={genderValue === "NA"} />Prefer not to say
                </span>
              </div>
            </div>
            <div className="button">
              {<button className='buttonDestroy' type="button" onClick={handleCancelClick}>Hủy</button>}
              {!isSaved && <button className='buttonSave' type="submit" >Lưu </button>}
            </div>

          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}
            className="form-signup">
            <div className="form">
              <div className="form-input">FirstName
                <input {...register("firstname")} defaultValue={users && users.firstName} required></input>
              </div>
              <div className='form-input'>LastName
                <input {...register("lastname")} defaultValue={users && users.lastName} required></input>
              </div>
            </div>
            <div className='form'>
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
            </div>
            <div className="form">
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
            </div>

            <div className='form-input'>Gender
              <div className='check'>
                <span>
                  <input {...register("gender")} type="radio" value="MALE" checked={genderValue === "MALE"} />Male
                </span>
                <span>
                  <input {...register("gender")} type="radio" value="FEMALE" checked={genderValue === "FEMALE"} />Female
                </span>
                <span>
                  <input {...register("gender")} type="radio" value="NA" checked={genderValue === "NA"} />Prefer not to say
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="uploadImage">
        <div className="accountImage" >
          {isEditMode ? (
            <div className="form-image-preview">
              <img src={avatar?.preview || users?.imgUrl} alt="Avatar Preview" style={{ width: '100px', height: '100px' }} />
              <div className="form-image-upload">
                <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                <button className="form-image-upload-button" onClick={handleImageClick}>
                  <CameraOutlined />
                </button>
              </div>
            </div>
          ) : (
            <div className="form-image">
              <img src={users?.imgUrl} alt="" style={{ width: '100px', height: '100px' }} ></img>
              <div className="iconCamera" onClick={handleImageClick}>
                <CameraOutlined />
              </div>
            </div>
          )}
        </div>
      </div>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
    </div>
  );
}

export default HRManageAccount;