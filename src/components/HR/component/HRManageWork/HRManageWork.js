import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobByCompany, deleteJob, getJobByName } from '../../../../actions/JobAction';
import './HRManageWork.css';
import { FormatDate } from '../../../../utils/FormatDate';

function HRManageWork(props) {
    const dispatch = useDispatch();
    const [jobName, setJobName] = useState('');
    const jobs = useSelector(state => state.jobByCompany.jobByCompany);
    const jobSearch = useSelector(state => state.jobSearch.job)
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const displayedJob = useSelector((state) => state.jobByCompany.jobByCompany);
    const [displayedJobs, setDisplayedJobs] = useState(null);
    const [updatedJobs, setUpdatedJobs] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    const [updateSearchJobs, setUpdateSearchJobs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllJobs = searchInput === '';
    // const displayedJobs = shouldShowAllJobs ? updatedJobs : updateSearchJobs;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        dispatch(getAllJobByCompany(page, token));
    }, [dispatch]);
    const [page, setPage] = useState({
        "jobName": null,
        "categoryId": '',
        "provinceCode": null,
        "page": 1,
        "size": 10
    });
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(getAllJobByCompany({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllJobByCompany({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllJobByCompany({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllJobByCompany(page, token))
            .then((result) => {
                setUpdatedJobs(result); // Cập nhật state mới ngay cả khi không có kết quả từ getAllCandidate
            })
            .catch(err => {
                console.log(err);
                setUpdatedJobs([]); // Trường hợp có lỗi, cập nhật danh sách người dùng trống
            });
    }, [dispatch, token]);
    useEffect(() => {
        if (displayedJob) {
            setDisplayedJobs(displayedJob.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedJob.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedJob.total / pageSize));
        }
    }, [displayedJob, pageSize]);
    // useEffect(() => {
    //     setUpdatedJobs(jobs); // Cập nhật state mới sau mỗi lần danh sách user thay đổi
    // }, [jobs]);
    // useEffect(() => {
    //     if (jobSearch) {
    //       setUpdateSearchJobs(jobSearch);
    //     }
    //   }, [jobSearch]);
    // useEffect(() => {
    //     if (name === '') {
    //         handleSearchJob('', token);
    //     }
    // }, [name, token]);

    // const handleDeleteJob = (jobId, token) => {
    //     setIsLoading(true);
    //     dispatch(deleteJob(jobId, token))
    //         .then(() => {
    //             dispatch(getAllJobByCompany);
    //             setIsLoading(false);
    //             setUpdatedJobs(jobs);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setIsLoading(false); // Ẩn loading nếu xóa không thành công
    //         });
    // }
    const handleSearchJob = () => {
        setSearchInput(jobName);
        setPage(prevPage => ({ ...prevPage, jobName: jobName}));
        dispatch(getAllJobByCompany({ ...page, jobName: jobName}), token);
    };
    const handleDeleteJob = (jobId, token) => {
        setIsLoading(true);
        dispatch(deleteJob(jobId, token))
            .then(() => {
                dispatch(getAllJobByCompany(page,token));
                setIsLoading(false);
                setUpdatedJobs(jobs);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Ẩn loading nếu xóa không thành công
            });
    }
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
                                handleSearchJob();
                            }}>
                                <input type="text" placeholder="Nhập vào tên công việc" onChange={e => setJobName(e.target.value)}  style={{width: "500px", height:"40px", marginRight:'20px', borderRadius:'5px'}}/>
                                <button  style={{width: "100px", height:"35px", borderRadius:'5px'}} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedJob && displayedJob.data && displayedJob.data.length === 0 ? (
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
                                {displayedJob && displayedJob.data && displayedJob.data.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.jobName}</td>
                                        <td>{item.jobQuantity}</td>
                                        <td>{item.jobCandidate}</td>
                                        <td>{FormatDate(item.createDate)}</td>
                                        <td>{getStatusMessage(item.jobStatus)}</td>
                                        <td>
                                            <button>Sửa</button>
                                            <button onClick={() => handleDeleteJob(item.jobId, token)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    </div>
                )
            }
            <div style={{ color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button style={{ width: '20px' }} onClick={goToPreviousPage}>{"<"}</button>
                <span>Trang {currentPage} / {totalPage}</span>
                <button style={{ width: '20px' }} onClick={goToNextPage}>{">"}</button>
                <select style={{ width: '80px', margin: '0 17px 0 20px' }} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size}/trang</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default HRManageWork;
