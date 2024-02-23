import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobByAdmin, deleteJob } from '../../../../actions/JobAction';
import './AdminManageJob.css';
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { getJobType } from '../../../../actions/JobTypeAction';
import { FormatDate } from '../../../../utils/FormatDate';

function AdminManageJob(props) {
    const dispatch = useDispatch();
    const [jobName, setJobName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const jobs = useSelector(state => state.jobByAdmin.jobByAdmin);
    const jobSearch = useSelector(state => state.jobSearch.job)
    const [updatedJobs, setUpdatedJobs] = useState([]);
    // const [updateSearchJobs, setUpdateSearchJobs] = useState([]);
    const shouldShowAllJobs = searchInput === '';
    const displayedJob = useSelector((state) => state.jobByAdmin.jobByAdmin);
    const [displayedJobs, setDisplayedJobs] = useState(null);
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedJobDetails, setSelectedJobDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const jobTypeData = useSelector((state) => state.getJobType.jobType);
    const [selectedJobType, setSelectedJobType] = useState('');
    useEffect(() => {
        dispatch(getJobType())
    }, []);
    const JobTypeSelector = () => {
        const handleSelectChange = (e) => {
            const selectedValue = e.target.value;
            setSelectedJobType(selectedValue);
        };
        return (
            <select value={selectedJobType} onChange={handleSelectChange} style={{ height: '35px' }}>
                <option value="">Tất cả loại hình</option>
                {jobTypeData && jobTypeData.length > 0
                    ? jobTypeData.map((jobType) => (
                        <option value={jobType.id} key={jobType.id}>
                            {jobType.name}
                        </option>
                    ))
                    : null}
            </select>
        )
    }
    const categoryData = useSelector((state) => state.getCategory.category);
    const [selectedCategory, setSelectedCategory] = useState('');
    const candidate = useSelector((state) => state.getCandidateInfo.candidate);
    const CategorySelector = () => {
        const handleSelectChange = (e) => {
            const selectedValue = e.target.value;
            setSelectedCategory(selectedValue);
        };
        return (
            <select value={selectedCategory} onChange={handleSelectChange} style={{ height: '35px' }}>
                <option value="">Tất cả ngành nghề</option>
                {categoryData && categoryData.length > 0
                    ? categoryData.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))
                    : null}
            </select>
        );
    };
    const tinhThanhPhoData = useSelector((state) => state.getProvince.province);
    const [selectedTinhThanhPho, setSelectedTinhThanhPho] = useState("");
    var tinhThanhPhoCandidate = "";
    if (candidate) {
        tinhThanhPhoCandidate = candidate.address.provinceCode;
    }
    useEffect(() => {
        setSelectedTinhThanhPho(tinhThanhPhoCandidate);
    }, [tinhThanhPhoCandidate]);
    const TinhThanhPhoSelector = () => {
        const handleSelectChange = (e) => {
            const selectedValue = e.target.value;
            setSelectedTinhThanhPho(selectedValue);
        };
        return (
            <select value={selectedTinhThanhPho} onChange={handleSelectChange} style={{ height: '35px' }}>
                <option value="">Tất cả địa điểm</option>
                {tinhThanhPhoData && tinhThanhPhoData.length > 0
                    ? tinhThanhPhoData.map((tinhThanhPho) => (
                        <option
                            value={tinhThanhPho.code}
                            key={tinhThanhPho.code}
                        >
                            {tinhThanhPho.name}
                        </option>
                    ))
                    : null}
            </select>
        );
    };
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
            dispatch(getAllJobByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllJobByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllJobByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllJobByAdmin(page, token))
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
    const handleSearchJob = () => {
        setSearchInput(jobName);
        setPage(prevPage => ({ ...prevPage, jobName: jobName, categoryId: parseInt(selectedCategory), jobTypeId: parseInt(selectedJobType), provinceCode: parseInt(selectedTinhThanhPho) }));
        dispatch(getAllJobByAdmin({ ...page, jobName: jobName, categoryId: parseInt(selectedCategory), jobTypeId: parseInt(selectedJobType), provinceCode: parseInt(selectedTinhThanhPho) }, token));
    };
    const handleViewDetails = (jobs) => {
        setSelectedJobDetails(jobs);
        setShowDetails(true);
    };
    const handleHideDetails = () => {
        setShowDetails(false);
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
                        <div className="form-div-manage-job">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchJob();
                            }}>
                                <input type="text" placeholder="Nhập vào tên công việc" onChange={e => setJobName(e.target.value)} style={{ width: "200px", height: "35px"}} />
                                <CategorySelector />
                                <JobTypeSelector />
                                <TinhThanhPhoSelector />
                                <button style={{ width: "100px", height: "35px", marginLeft:'5px' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedJob && displayedJob.data && displayedJob.data.length === 0 ? (
                            <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên công việc</th>
                                        <th>Ngày đăng tuyển</th>
                                        <th>Ngày hết hạn</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedJob && displayedJob.data && displayedJob.data.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.jobName}</td>
                                                <td>{FormatDate(item.createDate)}</td>
                                                <td>{FormatDate(item.jobExpiredDate)}</td>
                                                <td>
                                                    <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                        <DoubleRightOutlined onClick={() => handleViewDetails(item)} className='viewDetail' style={{ marginRight: '5px' }} />
                                                        <DeleteOutlined onClick={() => handleDeleteJob(item.jobId, token)} />
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
                                                            {/* {item.jobAddress.map((jobAddressItem, index) => ( */}
                                                                <div className='detailAddress' key={index} >
                                                                    <p>Cơ sở {item.jobAddress.id}:</p>
                                                                    <p style={{ color: '#0e599f' }}>{item.jobAddress.fullAddress} </p>
                                                                </div>
                                                            {/* ))} */}
                                                            <h3 className="table-heading" >Mô tả</h3>
                                                            <p style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}>{item.jobDescription}</p>
                                                            <h3 className="table-heading">Các phúc lợi dành cho bạn</h3>
                                                            <p className="bullet-point" style={{ color: 'black', fontSize: '12.5px', whiteSpace: 'pre-line', textAlign: 'left' }}>
                                                                {item.jobBenefit.split('\n').map((line, index) => (
                                                                    <span className="bullet-point" key={index}>
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
                        <div style={{ color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <button style={{ width: '20px' }} onClick={goToPreviousPage}>{"<"}</button>
                            <span>Trang {currentPage} / {totalPage}</span>
                            <button style={{ width: '20px' }} onClick={goToNextPage}>{">"}</button>
                            <select style={{ width: '80px', margin: '0 0 0 20px' }} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                                {pageSizes.map(size => (
                                    <option key={size} value={size}>{size}/trang</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default AdminManageJob;
