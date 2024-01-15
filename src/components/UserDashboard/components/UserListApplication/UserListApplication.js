import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecruitmentCandidate } from '../../../../actions/RecruitmentAction';
import {useParams, Link } from 'react-router-dom';
import './UserListApplication.css';
import { Form, Upload, Avatar } from 'antd';
import { getJobById } from "../../../../actions/JobAction";

function UserListApplication(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.getRecruitmentCandidate.recruitmentCandidate);
  const userSignin = useSelector((state) => state.userSignIn.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const job = useSelector((state) => state.getJobById.job);
  // const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;

  // Sử dụng useParams để lấy giá trị từ URL
  const { jobId } = useParams();
  console.log(jobId);
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
      setAvatarUrl(null);
    }
  };

  const getStatusLabel = (statusValue) => {
    switch (statusValue) {
      case 0:
        return 'Đang xem xét';
      case 1:
        return 'Đậu hồ sơ';
      case 2:
        return 'Rớt hồ sơ';
      case 3:
        return 'Đang phỏng vấn';
      case 4:
        return 'Đậu phỏng vấn';
      case 5:
        return 'Rớt phỏng vấn';
      default:
        return 'Không xác định';
    }
  };

  useEffect(() => {
    if (!users && token) {
      dispatch(getRecruitmentCandidate(token));
    }
  }, [dispatch, token, users]);
  useEffect(() => {
    dispatch(getJobById(jobId));
  }, [dispatch, jobId]);
  return (
    <div className="userListApplication">
      <span style={{ fontSize: '24px' }}>Chi tiết ứng tuyển</span>
      <div className="detailInfor">
        <div className="avatarUser">
          <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload onChange={(info) => handleImageUpload(info.file)} showUploadList={false}>
              {avatarUrl ? (
                <Avatar size={64} src={users.imgUrl} style={{ borderColor: 'blue', border: '13px solid', cursor: 'pointer', width: '200px', height: '200px' }} />
              ) : (
                <div>
                  <div className="sidebarUser-top">
                    <i className="accountUser">
                      <img src={users && users[0].candidateImgUrl} alt="avatar" style={{ border: ' blue 3px', cursor: 'pointer', width: '200px', height: '200px', marginTop: '20px' }} />
                    </i>
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div className='detailInforCandidate'>
          <h4>  Ứng viên: {users && users[0].candidateFullName} </h4>
          <h4>  Ngày sinh: {users && users[0].candidateBirthday}</h4>
          <h4> Đang sinh sống ở: {users && users[0].candidateAddress}</h4>
          </div>
        </div>
        <div className="panel-body">
          <div className="job-entries">
            {users &&
              users.map((candidate) => (
                <div key={candidate.jobId} className="job-entry">
                  <div className="detailUserApplication">
                    <h4>
                      <img
                        src={candidate && candidate.companyLogo}
                        alt="avatar"
                        style={{ border: ' blue 3px', cursor: 'pointer', width: '50px', height: '50px', marginTop: '20px' }}
                      />
                    </h4>
                    <div className="aboutDetailUserApplication">
                      <h6><Link to={`/detail_jobs/${candidate.jobId}`}>Công việc: {candidate.jobName}</Link></h6>
                      <h4>Công ty: {candidate.companyName} </h4>
                      <h4>Số lượng yêu cầu: {candidate.jobQuantity}</h4>
                      <div className='userApplicationStatus'>Kết quả: {getStatusLabel(candidate.applicationStatus)}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserListApplication;