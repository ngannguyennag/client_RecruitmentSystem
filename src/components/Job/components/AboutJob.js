import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './AboutJob.css'
import { getJobType } from '../../../actions/JobTypeAction';
import { getAllJobByAdmin, getAllJobByCandidate } from '../../../actions/JobAction';
// import { getAllJob } from "../../../../actions/JobAction";
import { useParams } from "react-router-dom";
const AboutJob = () => {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const jobAll = useSelector((state) => state.jobAll.jobAll);
    useEffect(() => {
        dispatch(getAllJobByCandidate()); // Gọi hàm getAllJob và truyền token vào
    }, []);
    const { jobId } = useParams();
    const [jobName, setJobName] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [updatedJobs, setUpdatedJobs] = useState([]);
    const displayedJob = useSelector((state) => state.jobByCandidate.jobByCandidate);
    const [displayedJobs, setDisplayedJobs] = useState(null);const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const jobTypeData = useSelector((state)=> state.getJobType.jobType);
    const [selectedJobType, setSelectedJobType] = useState('');
    useEffect(()=>{
        dispatch(getJobType())
      }, []);
    const JobTypeSelector = () =>{
        const handleSelectChange = (e) =>{
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
        "size": 5
    });
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(getAllJobByCandidate({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllJobByCandidate({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [5, 10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllJobByCandidate({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllJobByCandidate(page, token))
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
    return (
        <div className='aboutJob' >
            <div className='titleAboutCompany'>
                <h2>Tìm kiếm việc làm</h2>
                <p>Trang chủ / Việc Làm</p>
            </div>
            {
                <div className='containerJob'>
                    <div className="form-manage-job">
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
                    <div className='panel-group'>
                        <div className='panel-body'>
                            {displayedJob && displayedJob.data && displayedJob.data.map((item) => (
                                <div id="job-card-listing">
                                    <div className='company-list'>
                                        <img src={item.companyLogo} style={{margin:' 0 20px'}} />
                                        <div className="about-job">
                                            <h4> {item.companyName} </h4> 
                                            <h3><Link to={`/detail_jobs/${item.jobId}`}>{item.jobName}</Link></h3>
                                            <div className='about-job-item'>
                                                <ul>
                                                    <li className='negotiate' style={{marginRight:'5px'}}>{item.jobSalary} </li>
                                                    <li>| Hà Nội</li>
                                                </ul>
                                            </div>
                                            <div className='about-list-job-item'>
                                                {item.jobSkill && item.jobSkill.map((itemSkill) => (
                                                    <ul className='list-job-item'>
                                                        <li>{itemSkill.name} </li>
                                                        {/* <li>+2</li> */}
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <button style={{ width: '20px' }} onClick={goToPreviousPage}>{"<"}</button>
                            <span>Trang {currentPage} / {totalPage}</span>
                            <button style={{ width: '20px' }} onClick={goToNextPage}>{">"}</button>
                            <select style={{ width: '80px' , margin:' 0 50px 0 20px'}} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                                {pageSizes.map(size => (
                                    <option key={size} value={size}>{size}/trang</option>
                                ))}
                            </select>
                        </div>
                </div>
            }
        </div>
    )
}

export default AboutJob
