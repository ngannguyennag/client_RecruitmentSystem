import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByStatus } from "../../../../actions/JobAction";
import { getApplicationCandidateByJobAndStatus, getRecruitmentManageAddInterview, getRecruitmentManageChangeStatus } from "../../../../actions/RecruitmentAction";
import { FaSearch } from 'react-icons/fa';
import { Modal, DatePicker, Input, Select } from 'antd';
import "./HRListApplication.css";

function HRListApplication() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.getJobByStatus.jobs);
  const applications = useSelector((state) => state.getApplicationCandidateByJobAndStatus.applicationCandidate);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  const [isLoading, setIsLoading] = useState(false);
  const [searchApplications, setSearchApplications] = useState([]); // State mới để lưu trữ danh sách sau khi tìm kiếm thành công
  const [selectedJobStatus, setSelectedJobStatus] = useState("");
  const { Option } = Select;

  const JobStatusSelector = () => {
    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedJobStatus(selectedValue);
    };
    return (
      //Trạng thái tuyển dụng
      <select className="selector" value={selectedJobStatus} onChange={handleSelectChange}>
        <option value="">Tất cả</option>
        <option value="0">Đang tuyển</option>
        <option value="1">Đã hết hạn</option>
        <option value="2">Hoàn thành</option>
      </select>
    );
  };

  const CompanySelectedAction = ({ applicationId, applicationStatus, onActionChange }) => {
    const [selectedAction, setSelectedAction] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [interviewInfo, setInterviewInfo] = useState({
      interviewTime: null,
      interviewAddress: '',
      interviewType: '',
    });

    const handleActionChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedAction(selectedValue);
      onActionChange(applicationId, selectedValue);
      if (selectedValue === "6") {
        setIsModalVisible(true);
      }
    };

    const handleModalOk = () => {
      // Định dạng ngày giờ thành chuỗi theo định dạng cụ thể
      const localDateTimeString = interviewInfo.interviewTime.format('YYYY-MM-DDTHH:mm:ss.SSS');
      setInterviewInfo({...interviewInfo, interviewTime: localDateTimeString});
      dispatch(getRecruitmentManageAddInterview(applicationId, interviewInfo));
      setIsModalVisible(false);
    };
  
    const handleModalCancel = () => {
      // Xử lý khi người dùng nhấn Hủy trong modal
      setIsModalVisible(false);
    };

    return (
      <div>
        <select className="selector" value={selectedAction} onChange={handleActionChange}>
          <option value="" hidden>Chọn hành động</option>
          <option value="1" disabled={applicationStatus !== 0}>Thông báo đậu hồ sơ</option>
          <option value="2" disabled={applicationStatus !== 0}>Thông báo trượt hồ sơ</option>
          <option value="6" disabled={applicationStatus !== 1}>Thêm lịch phỏng vấn</option>
          <option value="4" disabled={applicationStatus === 0 || applicationStatus === 1 || applicationStatus === 2}>Thông báo đậu phỏng vấn</option>
          <option value="5" disabled={applicationStatus === 0 || applicationStatus === 1 || applicationStatus === 2}>Thông báo trượt phỏng vấn</option>
        </select>
         <Modal
            title="Thông tin Phỏng vấn"
            visible={isModalVisible}
            onCancel={handleModalCancel}
            onOk={handleModalOk}
          >
      <div>
        <label>Ngày và thời gian:</label>
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          onChange={(date) => setInterviewInfo({ ...interviewInfo, interviewTime: date })}
        />
      </div>
      <div>
        <label>Hình thức phỏng vấn:</label>
        <Select
          placeholder="Chọn hình thức phỏng vấn"
          value={interviewInfo.interviewType}
          onChange={(value) =>
            setInterviewInfo({ ...interviewInfo, interviewType: value })
          }
        >
          <Option value="0">Phỏng vấn trực tuyến</Option>
          <Option value="1">Phỏng vấn tại cơ sở</Option>
        </Select>
      </div>
      <div>
        <label>Địa điểm:</label>
        <Input
          placeholder="Nhập địa điểm phỏng vấn"
          value={interviewInfo.interviewAddress}
          onChange={(e) =>
            setInterviewInfo({ ...interviewInfo, interviewAddress: e.target.value })
          }
        />
      </div>
    </Modal>
      </div>
    );
  };

  const handleActionChange = (appId, action) => {
    if (action === "1" || action === "2" || action === "4" || action === "5") {
      dispatch(getRecruitmentManageChangeStatus(appId, action));
    }
  }

  const [selectedStatus, setSelectedStatus] = useState("");
  const StatusSelector = () => {
    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedStatus(selectedValue);
    };

    return (
      <select className="selector" value={selectedStatus} onChange={handleSelectChange}>
        <option value="">Tất cả</option>
        <option value="0">Đang xem xét hồ sơ</option>
        <option value="1">Đậu hồ sơ</option>
        <option value="2">Trượt hồ sơ</option>
      </select>
    );
  };

  const [selectedJob, setSelectedJob] = useState("");
  useEffect(() => {
    dispatch(getJobByStatus(selectedJobStatus, token));
  }, [dispatch, selectedJob, selectedJobStatus, token]);

  const JobSelector = () => {
    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedJob(selectedValue);
    };

    return (
      <select className="selector" value={selectedJob} onChange={handleSelectChange}>
        <option value="" hidden>
          Chọn công việc
        </option>
        {jobs && jobs.length > 0 ? jobs.map((job) => (
          <option value={job.jobId} key={job.jobId}>
            {job.jobName}
          </option>)) : null}
      </select>
    );
  };

  useEffect(() => {
    dispatch(getApplicationCandidateByJobAndStatus(selectedJob, selectedStatus));
  }, [dispatch, selectedJob, selectedStatus]);
  useEffect(() => { setSearchApplications(applications); }, [applications]);
  useEffect(() => {
    if (jobs && jobs.length === 0) {
      setSelectedJob(0);
    }
  }, [jobs]);

  const searchByCandidateName = (name) => {
    if (applications && applications.length > 0) {
      const searchResult = applications?.filter((application) =>
        application.candidateFullName?.includes(name)
      );
      setSearchApplications(searchResult);
    }
  };
  const getStatusLabel = (statusValue) => {
    switch (statusValue) {
      case 0:
        return 'Đang xem xét';
      case 1:
        return 'Đậu hồ sơ';
      case 2:
        return 'Trượt hồ sơ';
      case 3:
        return 'Đang phỏng vấn';
      case 4:
        return 'Đậu phỏng vấn';
      case 5:
        return 'Trượt phỏng vấn';
      default:
        return 'Không xác định';
    }
  };
  return (
    <div className="admin-user">
      <span style={{ fontSize: "24px" }}>Danh sách ứng viên ứng tuyển</span>
      <span style={{ fontSize: "13px", color: "grey", paddingTop: "0px" }}>
        Xem xét, phê duyệt hồ sơ ứng viên
      </span>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="admin-user-list">
          <div className="form-div">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <JobSelector></JobSelector>
                <JobStatusSelector></JobStatusSelector>
              </div>
              <div className="custom-input-container">
                <input
                  type="text"
                  placeholder="Nhập tên ứng viên"
                  onChange={(e) => searchByCandidateName(e.target.value)}
                  className="custom-input" />
                <FaSearch className="custom-icon" />
                <StatusSelector></StatusSelector>
              </div>
            </div>
            <div className="job-entries">
              {searchApplications && searchApplications.length > 0
                ? searchApplications.map((application, index) => (
                  <div className="detail-candidate-application" key={index}>
                    <h4>
                      <img
                        src={application && application.candidateImgUrl}
                        alt="avatar"
                        style={{ border: ' blue 3px', cursor: 'pointer', width: '100px', height: '100px', marginTop: '20px' }}
                      />
                    </h4>
                    <div className="aboutDetailCandidateApplication">
                      <h4>Ứng viên:  {application?.candidateFullName}</h4>
                      <h4>Năm sinh: {application?.candidateBirthday ? new Date(application.candidateBirthday).getFullYear() : ''}</h4>
                      <h4 >Thời gian ứng tuyển: {application?.applicationTimeAgo}</h4>
                    </div> 
                    <div className='resultApplication'>
                      <div className='userApplicationStatus'>Kết quả: {getStatusLabel(application.applicationStatus)}</div>
                      <CompanySelectedAction
                        applicationId={application.applicationId}
                        applicationStatus={application.applicationStatus}
                        onActionChange={(appId, action) => handleActionChange(appId, action)}/>
                    </div>
                  </div>
                ))
                : 'Chưa có ứng viên nào ứng tuyển'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default HRListApplication;
