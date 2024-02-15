import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import icon1 from "./images/icon1.png";
import icon3 from "./images/icon3.png";
import icon4 from "./images/icon4.png";
import icon5 from "./images/icon5.png";
import "./DetailJob.css";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getJobById } from "../../../actions/JobAction";
import { applyJob } from "../../../actions/RecruitmentAction";
import {FormatDate} from "../../../utils/FormatDate";
const DetailJob = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.getJobById.job);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  // Sử dụng useParams để lấy giá trị từ URL
  const { jobId } = useParams();
  useEffect(() => {
    dispatch(getJobById(jobId));
  }, [dispatch, jobId]);

  const getJobSkill = (jobSkill) => {
    // Sử dụng map để lấy ra mảng các giá trị skillNameVI
    const skillNameVIArray = jobSkill?.map((skill) => skill.skillNameVI);
    // Sử dụng join để kết hợp các giá trị thành một chuỗi
    const skillNameVIString = skillNameVIArray?.join(", ");
    return skillNameVIString;
  };
   const getAddress = (address) =>{
    const addressArray = address?.map((addressProvince) => addressProvince.province);
    const addressString  = addressArray?.join(",");
    return addressString;
   }
  const [isApplied, setIsApplied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleApply = () => {
    setShowPopup(true);
  };
  const handleCancelApply = () => {
    setShowPopup(false);
  };
  const handleConfirmApply = () => {
    dispatch(applyJob(jobId, token));
    setIsApplied(true);
    setShowPopup(false);
  };
  return (
    <div className="detail-job">
      <div className="detail-job-list">
      <div className="tab-job">
        <div className="searchJob">
          <form>
            <input placeholder="Tìm kiếm việc làm, công ty, kỹ năng"></input>
            <span>
              <SearchOutlined></SearchOutlined>
            </span>
          </form>
        </div>
        <div className="infor-job-list">
          <img src={job?.companyLogo} alt="job1" />
          <div className="detail-job-list-item">
            <Link to="/detail_jobs">
              <h2 >{job?.jobName}</h2>
            </Link>
            <h3>{job?.companyName}</h3>
            <div className="detail-job-item">
              <ul>
              <li className="addressProvince"> {getAddress(job?.jobAddress)}</li>
              <li className='seperate'>|</li>
                <li className="negotiate">{job?.salary}</li>
              </ul>
            </div>
            <div className="detail-list-job-item">
              Hôm nay
              <ul className="list-job-item">
                {job?.jobSkill.map((skill, index) => (
                  <li key={index}>{skill.skillNameVI}</li>
                ))}
              </ul>
            </div>
            <div className={`job-button ${isApplied ? "applied" : ""}`}  onClick={handleApply}>
              {isApplied ? "Đã Ứng Tuyển" : "Nộp Đơn"}
            </div>
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h3>Bạn có muốn ứng tuyển không?</h3>
                  <div className="popup-buttons">
                    <div className="popup-button" onClick={handleCancelApply}>
                      Không ứng tuyển
                    </div>
                    <div className="popup-button" onClick={handleConfirmApply}>
                      Có ứng tuyển
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="job-detail-group">
        <div className="job-detail-info-item">
          <h2>THÔNG TIN</h2>
          <div className="row-item">
            <div className="row-box">
              <span className="icon">
                <img src={icon1} alt="icon1" />
              </span>
            </div>
            <div className="row-content">
              <span className="content-label">NGÀY ĐĂNG TUYỂN</span>
              <span className="content">{FormatDate(job?.createdAt)}</span>
            </div>
          </div>
          <div className="row-item">
            <div className="row-box">
              <span className="icon">
                <img src={icon3} alt="icon3" />
              </span>
            </div>
            <div className="row-content">
              <span className="content-label">NGÀNH NGHỀ</span>
              <span className="content">{job?.category.categoryName}</span>
            </div>
          </div>

          <div className="row-item">
            <div className="row-box">
              <span className="icon">
                <img src={icon4} alt="icon4" />
              </span>
            </div>
            <div className="row-content">
              <span className="content-label">LĨNH VỰC</span>
              <span className="content">{job?.companyIndustry}</span>
            </div>
          </div>

          <div className="row-item">
            <div className="row-box">
              <span className="icon">
                <img src={icon5} alt="icon5" />
              </span>
            </div>
            <div className="row-content">
              <span className="content-label">KỸ NĂNG</span>
              <span className="content">{getJobSkill(job?.jobSkill)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="job-detail">
        <div className="title-job-detail">
        <h2>CÁC PHÚC LỢI DÀNH CHO BẠN </h2>
        </div>
        <div className="job-detail-item">
          <p>
            {job?.jobBenefit.split("\n").map((benefit, index) => (
              <p key={index}>{benefit}</p>
            ))}
          </p> 
          </div>
        </div>
        <div className="job-detail">
        <div className="title-job-detail">
        <h2>MÔ TẢ CÔNG VIỆC</h2>
        </div>
        <div className="job-detail-item">
        <p
          dangerouslySetInnerHTML={{
            __html: job?.jobDescription.replace(/\n/g, "<br>"),
          }}
        />
      </div>
        </div>
        <div className="job-detail">
        <div className="title-job-detail">
        <h2>YÊU CẦU CÔNG VIỆC</h2>
        </div>
      <div className="job-detail-item">
        <p
          dangerouslySetInnerHTML={{
            __html: job?.jobRequirement.replace(/\n/g, "<br>"),
          }}
        />
      </div>
        </div>
      <div className="job-detail">
        <div className="title-job-detail">
        <h2>ĐỊA ĐIỂM CÔNG VIỆC</h2>
        </div>
      <div className="job-detail-item">
        <div className="job-addresses">
          {job?.jobAddress.map((address, index) => (
            <div className="job-address" key={index}>
              <div className="row-icon">
                <EnvironmentOutlined />
              </div>
              {address.fullAddress}
            </div>
          ))}
        </div>
      </div>  
      </div>
      </div>
    </div>
  );
};

export default DetailJob;
