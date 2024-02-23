import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustry, getAllCompany, getAllCompanyByAdmin, deleteCompany } from '../../../../actions/CompanyAction';
import './AdminManageCompany.css';
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";

function AdminManageCompany(props) {
    const dispatch = useDispatch();
    const [companyFullName, setCompanyFullName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const companies = useSelector(state => state.companies.company);
    // const company = useSelector((state) => state.getCompanyById.company);
    const companySearch = useSelector(state => state.companySearch.company);
    const [updatedCompanies, setUpdatedCompanies] = useState([]);
    // const [updateSearchCompanies, setUpdateSearchCompanies] = useState([]);
    const shouldShowAllCompanies = searchInput === '';
    const displayedCompany = useSelector((state => state.companies.company ))
    const [displayedCompanies, setDisplayedCompanies] = useState(null);
    // const company = useSelector((state) => state.getCandidateInfo.candidate);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
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
        "size": 10
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
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllCompanyByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllCompanyByAdmin(page, token))
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
    const handleViewDetails = (companies) => {
        setSelectedCompanyDetails(companies);
        setShowDetails(true);
    };
    const handleHideDetails = () => {
        setShowDetails(false);
    };
    const companyImage = selectedCompanyDetails?.companyImage?.split(';');
    const handleDeleteCompany = (companyId, token) => {
        setIsLoading(true);
        dispatch(deleteCompany(companyId, token))
            .then(() => {
                dispatch(getAllCompanyByAdmin);
                setIsLoading(false);
                setUpdatedCompanies(companies);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Ẩn loading nếu xóa không thành công
            });
    }
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý công ty</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-company-list">
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchCompany();
                            }}>
                                <input type="text" placeholder="Nhập vào tên công ty" onChange={e => setCompanyFullName(e.target.value)} style={{ width: "300px", height: "35px" }} />
                                <IndustrySelector/>
                                <TinhThanhPhoSelector />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer', marginLeft:'5px' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedCompany && displayedCompany.data && displayedCompany.data.length === 0 ? (
                            <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Email</th>
                                        <th>Tên công ty</th>
                                        <th>Địa chỉ</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedCompany && displayedCompany.data && displayedCompany.data.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td style={{ fontSize: '12px' }}>{item.email}</td>
                                                <td style={{ fontSize: '12px' }}>{item.companyFullName}</td>
                                                <td style={{ fontSize: '12px' }}>{item.companyAddress.fullAddress}</td>
                                                <td>
                                                    <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                        <DoubleRightOutlined onClick={() => handleViewDetails(item)} className='viewDetail' style={{marginRight:'5px'}} />
                                                        <DeleteOutlined onClick={() => handleDeleteCompany(item.id, token)} />
                                                    </div>

                                                </td>
                                            </tr>
                                            {selectedCompanyDetails && selectedCompanyDetails.companyId === item.companyId && (
                                                <tr>
                                                    <td colSpan="6">
                                                        <div className={`user-details ${showDetails ? 'show' : ''}`}>
                                                            <div className='detailButton'>
                                                                <button onClick={handleHideDetails} style={{ width: '6%', color: 'red', marginRight: '10px' }}>x</button>
                                                                <h3 >Chi tiết công ty</h3>
                                                            </div>
                                                            <h3 className="table-heading" >{item.companyFullName}</h3>
                                                            <table>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Tên viết tắt</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.companyShortName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Năm thành lập</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.companyFoundedYear}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Quy mô</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.companySize}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Mã số thuế</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.companyMST}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Thông tin liên hệ</h3>
                                                            <table>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Email liên hệ</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Điện thoại liên hệ</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.phoneNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Website</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.website}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Facebook</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.facebookUrl}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Youtube</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.youtubeUrl}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Linkedin</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.linkedinUrl}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Hình ảnh</h3>
                                                            {companyImage && companyImage.map((item, index) => (
                                                                <img src={item} alt='logoCompany' key={index} style={{ width: '110px', height: '110px' }} />
                                                            ))}

                                                        </div>
                                                    </td> {/* Close the <td> tag */}
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

export default AdminManageCompany;
