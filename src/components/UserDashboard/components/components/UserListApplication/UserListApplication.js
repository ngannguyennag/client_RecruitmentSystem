
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecruitmentCandidate } from '../../../../../actions/UserAction';
import axios from 'axios';
import './UserListApplication.css';
import { Menu, Form, Input, Upload, Button, Select, Avatar } from 'antd';

function HRListApplication(props) {
  const dispatch = useDispatch();
  // const [userId, setUserId] = useState('');
  // const [name, setName] = useState('');
  const users = useSelector(state => state.getRecruimentCandidate.recruimentCandidate);
  const userSignin = useSelector((state) => state.userSignin.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList) {
      return e.fileList;
    }
    return [];
  };
  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file.originFileObj);
      setAvatarUrl(imageUrl);
    } else {
      setAvatarUrl(null); // Xóa ảnh đại diện hiện tại
    }
  };

  useEffect(() => {
    if (!users && token) {
      dispatch(getRecruitmentCandidate(token));
    }
  }, [dispatch, token, users]);
  return (
    <div className="userListApplication">
      <span style={{ fontSize: '24px' }}>Chi tiết ứng tuyển</span>
      {/* <div className="admin-user-list">
                        <div className="form-div">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Hành động" onChange={e => setUserId(e.target.value)}  style={{width: "150px", height:"35px", marginRight:'20px', borderRadius:"5px"}}/>
                                <button  style={{width: "90px", height:"35px"}}>Tìm kiếm</button>
                            </form>
                        </div>
                    </div> */}
      <div className='detailInfor'>
        <div className='avatarHR' >
          <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={normFile} >
            <Upload onChange={(info) => handleImageUpload(info.file)} showUploadList={false}>
              {avatarUrl ? (
                <Avatar size={64} src={users.imgUrl} style={{ marginTop: '100px', borderColor: 'blue', border: '13px solid', cursor: 'pointer', width: '200px', height: '200px' }} />
              ) : (
                <div>
                  <div className="sidebarHR-top">
                    <i className="accountHR">
                      <img src={users[0].candidateImgUrl} alt="avatar" style={{ marginTop: '100px', border: ' blue 3px', cursor: 'pointer' }} />
                    </i>
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </div>
        <div className='detailInforApplication'>
          <h4>  Ứng viên: {users && users[0].candidateFullName} </h4>
          <h4>  Ngày sinh: {users && users[0].candidateBirthday}</h4>
          <h4> Đang sinh sống ở: {users && users[0].candidateAddress}</h4>
          <h4> Công việc ứng tuyển: { }</h4>
        </div>
        <h3>
          Kết quả ứng tuyển
        </h3>
      </div>
    </div>
  );
}

export default HRListApplication;
