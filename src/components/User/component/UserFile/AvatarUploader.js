import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountInfo, getAccountUpdate, uploadImage } from '../../../../actions/UserAction';
import { CameraOutlined } from '@ant-design/icons';

function AvatarUploader() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
  const history = useHistory();
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const users = useSelector(state => state.getAccountInfo.user);
  const userUpdate = useSelector(state => state.getAccountUpdate.userUpdate);
  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo} = userSignup;

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageCancel = () => {
    setSelectedFile(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setSelectedFile(file);
  };

  useEffect(() => {
    dispatch(getAccountInfo(token));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      selectedFile && URL.revokeObjectURL(selectedFile.preview); // Hủy bỏ URL của file đã chọn trước đó
    };
  }, [selectedFile]);

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const onSubmit = () => {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      dispatch(uploadImage(token, formData));
    }
    setSelectedFile(null);
  };

  useEffect(() => {
    if (userUpdate) {
      setSelectedFile(null);
    }
  }, [userUpdate]);

  return (
    <div className="uploadImage">
      <div className="accountImage" >
        {selectedFile ? (
          <div className="form-image-preview">
            <img
              src={selectedFile.preview}
              alt="Avatar Preview"
              style={{ width: "25%", height: "300px" }}
            />
            <div className="form-image-upload">
              <button className="iconCancel" onClick={handleImageCancel}>
                Hủy
              </button>
              <button className="iconSave" onClick={handleSubmit(onSubmit)}>
                Đồng ý
              </button>
            </div>
          </div>
        ) : (
          <div className="form-image">
            <img
              src={users?.imgUrl}
              alt=""
              style={{ width: "25%", height: "300px" }}
            ></img>
            <div className='buttonCamera'>
              <button className="iconCamera" style={{ width: "4.5%", height: "15%" }} onClick={handleImageClick}>
                <CameraOutlined />
              </button>
            </div>
          </div>
        )}
      </div>
      <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleImageChange} />
    </div>
  );
}

export default AvatarUploader;