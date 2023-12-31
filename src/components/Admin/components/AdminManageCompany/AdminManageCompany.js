import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanyByAdmin, deleteCompany, getCompanyByName} from '../../../../actions/CompanyAction';
import './AdminManageCompany.css';

function AdminManageCompany(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const companies = useSelector(state => state.companies.company);
    const companySearch = useSelector(state => state.companySearch.company);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedCompanies, setUpdatedCompanies] = useState([]); 
    const [updateSearchCompanies, setUpdateSearchCompanies] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllCompanies = searchInput === '';
    const displayedCompanies = shouldShowAllCompanies ? updatedCompanies : updateSearchCompanies;
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
    useEffect(() => {
        dispatch(getAllCompanyByAdmin(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedCompanies(companies); 
    }, [companies]);
    useEffect(() =>{
        if(companySearch){
            setUpdateSearchCompanies(companySearch)
        }
    }, [companySearch]);
    useEffect(() => {
        if (name === '') {
            handleSearchCompany('', token);
        }
    }, [name, token]);
    const handleViewDetails = (companies) => {
        setSelectedCompanyDetails(companies);
        setShowDetails(true);
    };
    const handleHideDetails = () => {
        setShowDetails(false);
    };
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
    const handleSearchCompany = (name, token) => {
        setSearchInput(name);
        let searchResult = [];
        dispatch(getCompanyByName(name, token))
            .then(() => {
                searchResult = companySearch;
                setUpdateSearchCompanies(searchResult);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="adminCompany">
            <div className='titleHome'>Home / Company Management</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-company-list">
                        <div className="form-div">
                        <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchCompany(name, token);
                            }}>
                                <input type="text" placeholder="Nhập vào tên hoặc email của công ty" onChange={e => setName(e.target.value)}  style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }}/>
                                <button style={{ width: "100px", height: "35px", cursor:'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedCompanies && displayedCompanies.length === 0 ? (
                        <p style={{color:'black', fontSize:'20px'}}>Không có kết quả </p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Email</th>
                                    <th>Logo</th>
                                    <th>Tên công ty</th>
                                    <th>Địa chỉ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedCompanies && displayedCompanies.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                        <React.Fragment key={item.id}>
                                        <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td><img src={item.companyLogo}/></td>
                                        <td>{item.companyFullName}</td>
                                        <td>{item.companyAddress.fullAddress}</td>
                                        <td>
                                            <div className='action'>
                                            <button onClick={() => handleViewDetails(item)} className='viewDetail' style={{ marginRight: '5px' }}>{'>>'}</button>
                                                    <button onClick={() => handleDeleteCompany(item.id, token)}>Delete</button>
                                            </div>
                                                    
                                                </td>
                                    </tr>
                                    {selectedCompanyDetails && selectedCompanyDetails.id === item.id && (
                                                <tr>
                                                    <td colSpan="6">
                                                        <div className={`user-details ${showDetails ? 'show' : ''}`}>
                                                        <div className='detailButton'>
                                                            <button onClick={handleHideDetails} style={{ width: '6%' , color:'red', marginRight:'10px'}}>x</button>
                                                            <h3 >Chi tiết doanh nghiệp</h3>
                                                            </div>
                                                            <h3 className="table-heading" >{item.companyFullName}</h3>
                                                            <table>
                                                            <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Tên viết tắt</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.companyShortName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Năm thành lập</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.companyFoundedYear}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Quy mô</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.companySize}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Mã số thuế</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.companyMST}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Thông tin liên hệ</h3>
                                                            <table>
                                                            <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Email liên hệ</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Điện thoại liên hệ</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.phoneNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Website</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.website}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Facebook</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.facebookUrl}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Youtube</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.youtubeUrl}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{backgroundColor:'#f0f0f0', color:'black'}}>Linkedin</td>
                                                                    <td style={{backgroundColor:'white', color:'#0e599f'}}>{item.linkedinUrl}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Hình ảnh</h3>
                                                            {item.companyImage}
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
