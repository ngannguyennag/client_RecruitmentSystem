import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./HRListApplication.css";
import { getJobByStatus } from "../../../../actions/JobAction";
import { getApplicationCandidateByJobAndStatus, getRecruitmentManageAddInterview, getRecruitmentManageChangeStatus } from "../../../../actions/RecruitmentAction";
import { FaSearch } from 'react-icons/fa';
import { DatePicker } from 'antd'
function HRListApplication() {
  const dispatch = useDispatch();
  const history = useHistory();
  const jobs = useSelector((state) => state.getJobByStatus.jobs);
  const changeStatus = useSelector((state) => state.getRecruitmentManageChangeStatus.changeStatus);
  const addInterview = useSelector((state) => state.getRecruitmentManageAddInterview.addInterview);
  const applications = useSelector((state) => state.getApplicationCandidateByJobAndStatus.applicationCandidate);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  const [isLoading, setIsLoading] = useState(false);
  const [searchApplications, setSearchApplications] = useState([]); // State mới để lưu trữ danh sách sau khi tìm kiếm thành công
  const [selectedJobStatus, setSelectedJobStatus] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null); // Define startDate state
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
  const handleActionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAction(selectedValue);
  };

  const handleStatusChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue);
  };
  const CompanySelectedAction = () => {
    return (
      <div>
        <select className="selector" value={selectedAction} onChange={handleActionChange}>
          <option value="">Chọn hành động</option>
          <option value="1">Thông báo đậu hồ sơ</option>
          <option value="2">Thông báo rớt hồ sơ</option>
          <option value="6">Thêm lịch phỏng vấn</option>
          <option value="4">Thông báo đậu phỏng vấn</option>
          <option value="5">Thông báo trượt phỏng vấn</option>
        </select>
        {/* {["1", "2", "4", "5"].includes(selectedAction) && (
          <select className="selector" value={selectedStatus} onChange={handleStatusChange}>
            <option value="">Chọn trạng thái</option>
            <option value="1">Đậu hồ sơ</option>
            <option value="2">Rớt hồ sơ</option>
          </select>
        )} */}
      </div>
    );
  };
  useEffect(() => {
    if (selectedAction === "1" || selectedAction === "2" || selectedAction === "4" || selectedAction === "5") {
      dispatch(getRecruitmentManageChangeStatus(selectedApplicationId, selectedJob));
    } else if (selectedAction === "6") {
      dispatch(getRecruitmentManageAddInterview(selectedApplicationId));
    }
  }, [dispatch, selectedAction, selectedApplicationId, selectedJob]);

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
        <option value="2">Rớt hồ sơ</option>
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
  return (
    <div className="admin-user">
      <span style={{ fontSize: "24px" }}>Chi tiết ứng tuyển</span>
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
                  <div className="detail-candidate-application">
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
                      <div className='userApplicationStatus'>Thời gian ứng tuyển: {application?.applicationTimeAgo}</div>
                      <button onClick={() => setShowDatePicker(true)}>Chọn lịch phỏng vấn</button>
                      {showDatePicker && (
                        <div className='selectDate'>
                          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} format="DD/MM/YYYY" />
                        </div>
                      )}
                      <CompanySelectedAction></CompanySelectedAction>
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
