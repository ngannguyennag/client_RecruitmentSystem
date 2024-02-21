import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobByAdmin, deleteJob, getJobByName } from '../../../../actions/JobAction';
import './AdminManageJob.css';

function AdminManageCompany(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const jobs = useSelector(state => state.jobAdmin.job);
    const jobSearch = useSelector(state => state.jobSearch.job)
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedJobs, setUpdatedJobs] = useState([]);
    const [updateSearchJobs, setUpdateSearchJobs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllJobs = searchInput === '';
    const displayedJobs = shouldShowAllJobs ? updatedJobs : updateSearchJobs;
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedJobDetails, setSelectedJobDetails] = useState(null); useEffect(() => {
        dispatch(getAllJobByAdmin(token));
    }, [dispatch]);
    // console.log(displayedJobs);
    useEffect(() => {
        setUpdatedJobs(jobs);
    }, [jobs]);
    useEffect(() => {
        if (jobSearch) {
            setUpdateSearchJobs(jobSearch);
        }
    }, [jobSearch]);
    useEffect(() => {
        if (name === '') {
            handleSearchJob('', token);
        }
    }, [name, token]);
    const handleViewDetails = (jobs) => {
        setSelectedJobDetails(jobs);
        setShowDetails(true);
    };
    const handleHideDetails = () => {
        setShowDetails(false);
    };
    const FormatDate = (time) => {
        if (time && Array.isArray(time)) {
            const date = new Date(Date.UTC(...time));
            const dateString = date.toISOString().split('T')[0];
            return dateString;
        } else {
            return null;
        }
    };
    const handleDeleteJob = (jobId, token) => {
        setIsLoading(true);
        dispatch(deleteJob(jobId, token))
            .then(() => {
                dispatch(getAllJobByAdmin);
                setIsLoading(false);
                setUpdatedJobs(jobs);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Ẩn loading nếu xóa không thành công
            });
    }
    const handleSearchJob = (name, token) => {
        setSearchInput(name);
        let searchResult = [];
        dispatch(getJobByName(name, token))
            .then(() => {
                searchResult = jobSearch;
                setUpdateSearchJobs(searchResult);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const jobStatus = (statusValue) => {
        switch (statusValue) {
          case 0:
            return 'Đang tuyển';
          case 1:
            return 'Đã hoàn thành';
          case 2:
            return 'Đã hết hạn';
        }
      };
    return (
        <div className="adminJob">
            <div className='titleHome' >Trang chủ / Quản lý công việc</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-job-list">
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchJob(name, token);
                            }}>
                                <input type="text" placeholder="Nhập vào tên công việc" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px" }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedJobs && displayedJobs.length === 0 ? (
                            <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên công việc</th>
                                        <th>Ngày đăng tuyển</th>
                                        <th>Ngày hết hạn</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedJobs && displayedJobs.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.jobName}</td>
                                                <td>{FormatDate(item.createdAt)}</td>
                                                <td>{FormatDate(item.jobExpiredDate)}</td>
                                                <td>
                                                    <div className='action'>
                                                        <button onClick={() => handleViewDetails(item)} className='viewDetail' style={{ marginRight: '5px' }}>Xem chi tiết</button>
                                                        <button onClick={() => handleDeleteJob(item.id, token)}> Xóa </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            {selectedJobDetails && selectedJobDetails.jobId === item.jobId && (
                                                <tr>
                                                    <td colSpan="6">
                                                        <div className={`user-details ${showDetails ? 'show' : ''}`}>
                                                            <div className='detailButton'>
                                                                <button onClick={handleHideDetails} style={{ width: '6%', color: 'red', marginRight: '10px' }}>x</button>
                                                                <h3 >Chi tiết công việc</h3>
                                                            </div>
                                                            <h3 className="table-heading" >{item.name}</h3>
                                                            <table>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Được đăng bởi</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.companyName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Loại công việc</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.jobType.jobTypeName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Trạng thái</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{jobStatus(item.jobStatus)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Số lượng tuyển dụng</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.jobQuantity}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Mức lương</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.salary}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Vị trí làm việc</h3>
                                                            {item.jobAddress.map((jobAddressItem, index) => (
                                                                    <div className='detailAddress' key={index} >
                                                                        <p>Cơ sở {jobAddressItem.id}:</p>
                                                                        <p style={{color: '#0e599f'}}>{jobAddressItem.fullAddress} </p>
                                                                    </div>
                                                                ))}
                                                            <h3 className="table-heading" >Mô tả</h3>
                                                            <p style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}>{item.jobDescription}</p>
                                                            <h3 className="table-heading">Các phúc lợi dành cho bạn</h3>
                                                            <p className="bullet-point" style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}>
                                                                {item.jobBenefit.split('\n').map((line, index) => (
                                                                    <span className="bullet-point"  key={index}>
                                                                         {line}
                                                                        <br />
                                                                    </span>
                                                                ))}
                                                            </p>                                                           
                                                            <h3 className="table-heading">Các yêu cầu khác</h3>
                                                            {/* <p className="bullet-point" style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}>
                                                                {item.jobExperience.split('\n').map((line, index) => (
                                                                    <span className="bullet-point"  key={index}>
                                                                         {line}
                                                                        <br />
                                                                    </span>
                                                                ))}
                                                            </p>  */}
                                                            <p style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}> {item.jobExperience}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default AdminManageCompany;
