import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidate, deleteCandidate } from '../../../../actions/CandidateAction';
import './AdminUser.css';
import { FormatDate } from '../../../../utils/FormatDate';
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";

function AdminUser(props) {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const users = useSelector(state => state.candidates.candidates);
    const userSearch = useSelector(state => state.candidateSearch.candidates);
    const [updatedUsers, setUpdatedUsers] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    // const [updateSearchUsers, setUpdateSearchUsers] = useState([]);
    const shouldShowAllUsers = searchInput === '';
    const displayedUser = useSelector((state => state.candidates.candidates))
    const [displayedUsers, setDisplayedUsers] = useState(null);
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    // const [searching, setSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
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
            dispatch(getAllCandidate({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllCandidate({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllCandidate({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllCandidate(page, token))
            .then((result) => {
                setUpdatedUsers(result); // Cập nhật state mới ngay cả khi không có kết quả từ getAllCandidate
            })
            .catch(err => {
                console.log(err);
                setUpdatedUsers([]); // Trường hợp có lỗi, cập nhật danh sách người dùng trống
            });
    }, [dispatch, token]);
    useEffect(() => {
        if (displayedUser) {
            setDisplayedUsers(displayedUser.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedUser.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedUser.total / pageSize));
        }
    }, [displayedUser, pageSize]);
    const handleSearchCandidate = () => {
        setSearchInput(fullName);
        setPage(prevPage => ({ ...prevPage, fullName: fullName, categoryId: parseInt(selectedCategory), provinceCode: parseInt(selectedTinhThanhPho) }));
        dispatch(getAllCandidate({ ...page, fullName: fullName, categoryId: parseInt(selectedCategory), provinceCode: parseInt(selectedTinhThanhPho) }, token));
    };
    const handleViewDetails = (user) => {
        setSelectedUserDetails(user);
        setShowDetails(true);
    };
    const handleHideDetails = () => {
        setShowDetails(false);
    };
    const handleDeleteUser = (userId, token) => {
        setIsLoading(true);
        dispatch(deleteCandidate(userId, token))
            .then(() => {
                dispatch(getAllCandidate(token));
                setIsLoading(false);
                setUpdatedUsers(users);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Ẩn loading nếu xóa không thành công
            });
    }
    const gender = (statusValue) => {
        switch (statusValue) {
            case 'MALE':
                return 'Nam';
            case 'FEMALE':
                return 'Nữ';
            case 'OTHER':
                return 'Khác';
        }
    };
    return (
        <div className="adminUser">
            <div className='titleHome' >Trang chủ / Quản lý ứng viên</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="adminUserList">
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchCandidate();
                            }}>
                                <input type="text" placeholder="Nhập vào tên hoặc email của ứng viên" onChange={e => setFullName(e.target.value)} style={{ width: "300px", height: "35px" }} />
                                <CategorySelector />
                                <TinhThanhPhoSelector />
                                <button style={{ width: "10%", height: "35px", marginLeft:'5px' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedUser && displayedUser.data && displayedUser.data.length === 0 ? (
                            <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên ứng viên</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Ngày tạo</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUser && displayedUser.data && displayedUser.data.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{FormatDate(item.createDate)}</td>
                                                <td>
                                                    <DoubleRightOutlined onClick={() => handleViewDetails(item)} className='viewDetail' style={{marginRight:'10px'}}  />
                                                    <DeleteOutlined onClick={() => handleDeleteUser(item.id, token)}/>
                                                </td>
                                            </tr>
                                            {selectedUserDetails && selectedUserDetails.id === item.id && (
                                                <tr>
                                                    {/* <td> */}
                                                    <div className='userDetail'>
                                                        <div className={`user-details ${showDetails ? 'show' : ''}`} >
                                                            <div className='detailButton'>
                                                                <button onClick={handleHideDetails} style={{ width: '6%', color: 'red', marginRight: '10px' }}>x</button>
                                                                <h3>Chi tiết ứng viên</h3>
                                                            </div>
                                                            <h3 className="table-heading" >{item.fullName}</h3>
                                                            <table >
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Học vấn</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.education[0].degreeName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Giới tính</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{gender(item.gender)}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Nơi sinh sống</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.address && item.address.fullAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Ngày sinh</td>
                                                                    <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.birthday}</td>
                                                                </tr>
                                                            </table>
                                                            <h3 className="table-heading">Lộ trình học tập</h3>
                                                            {item.education.map((educationItem, index) => (
                                                                <div className='detailEducation' key={index}>
                                                                    <p>{educationItem.startDate} - {educationItem.endDate}:</p>
                                                                    <p style={{ color: '#0e599f' }}> {educationItem.major} ở {educationItem.schoolName}   </p>
                                                                    <p style={{ color: 'grey', textAlign: 'left' }}>{educationItem.description}</p>
                                                                </div>
                                                            ))}
                                                            <h3 className="table-heading">Kinh nghiệm làm việc</h3>
                                                            {item.workingHistory.map((workingHistoryItem, index) => (
                                                                <div className='detailEducation' key={index}>
                                                                    <p>{workingHistoryItem.startDate} - {workingHistoryItem.endDate}:</p>
                                                                    <p style={{ color: '#0e599f' }}> {workingHistoryItem.jobName} ở {workingHistoryItem.companyName}   </p>
                                                                    <p style={{ color: 'grey', textAlign: 'left' }}>{workingHistoryItem.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* </td> */}
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
export default AdminUser;
