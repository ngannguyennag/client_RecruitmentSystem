import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobByCompany, deleteJob, getJobByName } from '../../../../actions/JobAction';
import './HRManageWork.css';

function HRManageWork(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const jobs = useSelector(state => state.jobCompany.jobCompany);
    const jobSearch = useSelector(state => state.jobSearch.job)
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedJobs, setUpdatedJobs] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    const [updateSearchJobs, setUpdateSearchJobs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllJobs = searchInput === '';
    const displayedJobs = shouldShowAllJobs ? updatedJobs : updateSearchJobs;
    useEffect(() => {
        dispatch(getAllJobByCompany(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedJobs(jobs); // Cập nhật state mới sau mỗi lần danh sách user thay đổi
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

    const handleDeleteJob = (jobId, token) => {
        setIsLoading(true);
        dispatch(deleteJob(jobId, token))
            .then(() => {
                dispatch(getAllJobByCompany);
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
    const FormatDate = (time) => {
        if (time && Array.isArray(time) ) {
            const date = new Date(Date.UTC(...time));
            const dateString = date.toISOString().split('T')[0];
            return dateString;
        } else {
            return null;
        }
    };
    const getStatusMessage = (status) => {
        switch (status) {
            case 0:
                return 'Đang tuyển';
            case 1:
                return 'Đã hoàn thành';
            case 2:
                return 'Hết hạn';
            default:
                return '';
        }
    };
    return (
        <div className="admin-user">
            <span style={{fontSize:'24px'}}>Quản lý công việc</span>
            <span style={{fontSize:'13px', color:'grey', paddingTop:'0px'}}>Dễ dàng theo dõi tình hình tuyển dụng</span>
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
                                <input type="text" placeholder="Nhập vào tên công việc" onChange={e => setName(e.target.value)}  style={{width: "500px", height:"40px", marginRight:'20px', borderRadius:'5px'}}/>
                                <button  style={{width: "100px", height:"35px", borderRadius:'5px'}} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedJobs && displayedJobs.length === 0 ? (
                        <p style={{color:'black', fontSize:'20px'}}>Không có kết quả </p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên công việc</th>
                                    <th>Số lượng cần tuyển</th>
                                    <th>Số lượng trúng tuyển</th>
                                    <th>Ngày tạo</th>
                                    <th>Tình trạng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedJobs && displayedJobs.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.jobName}</td>
                                        <td>{item.jobQuantity}</td>
                                        <td>{item.jobCandidate}</td>
                                        <td>{FormatDate(item.createdAt)}</td>
                                        <td>{getStatusMessage(item.jobStatus)}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button onClick={() => handleDeleteJob(item.id, token)}>Delete</button>
                                        </td>
                                    </tr>
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

export default HRManageWork;
