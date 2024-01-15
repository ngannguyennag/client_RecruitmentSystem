import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HRListApplication.css";
import { getJobByStatus } from "../../../../actions/JobAction";
import { getApplicationCandidateByJobAndStatus } from "../../../../actions/RecruitmentAction";
import { FaSearch } from 'react-icons/fa';

function HRListApplication() {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.getJobByStatus.jobs);
  const applications = useSelector(
    (state) => state.getApplicationCandidateByJobAndStatus.applicationCandidate
  );

  const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  const [isLoading, setIsLoading] = useState(false);
  const [searchApplications, setSearchApplications] = useState([]); // State mới để lưu trữ danh sách sau khi tìm kiếm thành công

  const [selectedJobStatus, setSelectedJobStatus] = useState("");
  const JobStatusSelector = () => {
    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedJobStatus(selectedValue);
    };

    return (
      <select className="selector" value={selectedJobStatus} onChange={handleSelectChange}>
        <option value="">Tất cả</option>
        <option value="0">Đang tuyển</option>
        <option value="1">Đã hết hạn</option>
        <option value="2">Hoàn thành</option>
      </select>
    );
  };

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
        {jobs && jobs.length > 0
          ? jobs.map((job) => (
              <option value={job.jobId} key={job.jobId}>
                {job.jobName}
              </option>
            ))
          : null}
      </select>
    );
  };

  useEffect(() => {
    dispatch(
      getApplicationCandidateByJobAndStatus(selectedJob, selectedStatus)
    );
  }, [dispatch, selectedJob, selectedStatus]);

  useEffect(() => {
    setSearchApplications(applications);
  }, [applications]);

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
      <span style={{ fontSize: "24px" }}>Danh sách ứng tuyển</span>
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
                  className="custom-input" 
                />
                <FaSearch className="custom-icon"/>
                <StatusSelector></StatusSelector>
              </div>
            </div>

            {searchApplications && searchApplications.length > 0
              ? searchApplications.map((application, index) => (
                  <div>{application?.candidateFullName}</div>
                ))
              : null}

            {/* <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Chọn công việc"
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  width: "250px",
                  height: "35px",
                  marginRight: "20px",
                  borderRadius: "5px",
                }}
              />
              <input
                type="text"
                placeholder="Tìm tên ứng viên"
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  width: "150px",
                  height: "35px",
                  marginRight: "20px",
                  borderRadius: "5px",
                }}
              />
              <input
                type="text"
                placeholder="Trạng thái"
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  width: "150px",
                  height: "35px",
                  marginRight: "20px",
                  borderRadius: "5px",
                }}
              />
              <button style={{ width: "90px", height: "35px" }}
              onClick={handleSearch}>
                Tìm kiếm
              </button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default HRListApplication;
