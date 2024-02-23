import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './About.css'
import { Link } from "react-router-dom";
import { getCompanyManageJobById } from "../../../actions/JobAction";

const About = () => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const company = useSelector((state) => state.getCompanyManageJobById.company);
    const [displayedCompanies, setDisplayedCompanies] = useState(null);
    const { companyId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);useEffect(() => {
        dispatch(getCompanyManageJobById(page,companyId));
    }, [dispatch, page, companyId]);
    const [page, setPage] = useState({
        "fullName": null,
        "categoryId": '',
        "provinceCode": null,
        "page": 1,
        "size": 10
    });
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(getCompanyManageJobById({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getCompanyManageJobById({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getCompanyManageJobById({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    const handleSearchCandidate = () => {
        setSearchInput(fullName);
        setPage(prevPage => ({ ...prevPage, fullName: fullName }));
        dispatch(getCompanyManageJobById({ ...page, fullName: fullName }, token));
    };
    useEffect(() => {
        if (company) {
            setDisplayedCompanies(company.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(company.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(company.total / pageSize));
        }
    }, [company, pageSize]);
    return (
        <div className='about' id='about'>
            <div className='containerJob'>
                <div className='panel-group'>
                    <div className='panel-body'>
                        <h2>Chúng tôi có {company?.data?.length} công việc cho bạn</h2>
                        {company && company.data && company.data.map((item) => (
                            <div id="job-card-listing">
                                <div className='company-list'>
                                    <img src={item.companyLogo} />
                                    <div className="about-job">
                                        <h4> {item.companyName} </h4> 
                                        <Link to={`/detail_jobs/${item.jobId}`}>{item.jobName}</Link>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>{item.jobSalary} </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            {item.jobSkill && item.jobSkill.map((itemSkill) => (
                                                <ul className='list-job-item'>
                                                    <li>{itemSkill.name} </li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button style={{ width: '20px' }} onClick={goToPreviousPage}>{"<"}</button>
                <span>Trang {currentPage} / {totalPage}</span>
                <button style={{ width: '20px' }} onClick={goToNextPage}>{">"}</button>
                <select style={{ width: '80px', margin: '0 150px 0 20px' }} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size}/trang</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default About
