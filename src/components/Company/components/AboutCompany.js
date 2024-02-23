import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import {
    SearchOutlined, CreditCardOutlined
} from "@ant-design/icons";
import './AboutCompany.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompany, getAllCompanyByAdmin } from "../../../actions/CompanyAction";
import { useParams } from "react-router-dom"
const AboutCompany = () => {
    const dispatch = useDispatch();
    const [companyFullName, setCompanyFullName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [searchInput, setSearchInput] = useState('');
    const displayedCompany = useSelector((state => state.companies.company ))
    const [displayedCompanies, setDisplayedCompanies] = useState(null);const companyAll = useSelector((state) => state.companyAll.companyAll);
    const [updatedCompanies, setUpdatedCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const industryData = useSelector((state) => state.getIndustry.industry);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const IndustrySelector = () => {
        const handleSelectChange = (e) => {
          const selectedValue = e.target.value;
          setSelectedIndustry(selectedValue);
        };
        return (
          <select value={selectedIndustry} onChange={handleSelectChange} style={{height:'35px'}}>
            <option value="">Tất cả lĩnh vực hoạt động</option>
            {industryData && industryData.length > 0
              ? industryData.map((industry) => (
                <option value={industry.id} key={industry.id}>
                  {industry.name}
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
        "companyFullName": null,
        "companyIndustryId": '',
        "provinceCode": null,
        "page": 1,
        "size": 4
    });
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(getAllCompanyByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllCompanyByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [4, 10, 15, 20];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllCompanyByAdmin({ ...page, page: 1, size: size }));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllCompanyByAdmin(page))
            .then((result) => {
                setUpdatedCompanies(result); // Cập nhật state mới ngay cả khi không có kết quả từ getAllCandidate
            })
            .catch(err => {
                console.log(err);
                setUpdatedCompanies([]); // Trường hợp có lỗi, cập nhật danh sách người dùng trống
            });
    }, [dispatch, token]);
    useEffect(() => {
        if (displayedCompany) {
            setDisplayedCompanies(displayedCompany.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedCompany.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedCompany.total / pageSize));
        }
    }, [displayedCompany, pageSize]);
    const handleSearchCompany = () => {
        setSearchInput(companyFullName);
        setPage(prevPage => ({ ...prevPage, companyFullName: companyFullName, companyIndustryId: parseInt(selectedIndustry), provinceCode: parseInt(selectedTinhThanhPho) }));
        dispatch(getAllCompanyByAdmin({ ...page, companyFullName: companyFullName, companyIndustryId: parseInt(selectedIndustry), provinceCode: parseInt(selectedTinhThanhPho) }, token));
    };
    useEffect(() => {
        dispatch(getAllCompanyByAdmin(page)); // Gọi hàm getAllCompany và truyền token vào
    }, []);
    const { companyId } = useParams();
    return (
        <div>
            
            <div className='aboutCompany' >
            <div className='titleAboutCompany'>
                <h2>Tìm kiếm công ty</h2>
                <p>Trang chủ / Công ty</p>
            </div>
                {
                    <div className='containerJob'>
                        <div className="form-div-company" >
                        <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchCompany();
                            }}>
                                <input type="text" placeholder="Nhập vào tên công ty" onChange={e => setCompanyFullName(e.target.value)} style={{ width: "300px", height: "35px", borderRadius: '5px' }} />
                                <IndustrySelector/>
                                <TinhThanhPhoSelector />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' , marginLeft: '10px'}} type="submit">Tìm kiếm</button>
                            </form>               
                        </div>

                        <div className='panel-group'>
                            <div className='panel-body'>
                                {displayedCompany && displayedCompany.data && displayedCompany.data.map((item) => (
                                    <div id="company-card-listing">
                                        <div className='company-list'>
                                            <img src={item.companyLogo} style={{margin:' 0 20px'}}  alt='company1' />
                                            <div className="about-company">
                                                <h4>  <Link to={`/detail_companies/${item.companyId}`}>{item.companyFullName} </Link></h4>
                                                <div className='about-list-company-item'>
                                                    <ul>
                                                        <li className='negotive'> <CreditCardOutlined />Lĩnh vực {item.companyIndustry.name} </li>
                                                        <div className='buttonCompany'>
                                                        <Link to="/company"><button>Việc mới</button></Link>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div style={{ color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' , marginBottom:'10px'}}>
                <button style={{ width: '20px' }} onClick={goToPreviousPage}>{"<"}</button>
                <span>Trang {currentPage} / {totalPage}</span>
                <button style={{ width: '20px' }} onClick={goToNextPage}>{">"}</button>
                <select style={{ width: '80px', margin: '0 100px 0 20px ' }} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
                    {pageSizes.map(size => (
                        <option key={size} value={size}>{size}/trang</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default AboutCompany
