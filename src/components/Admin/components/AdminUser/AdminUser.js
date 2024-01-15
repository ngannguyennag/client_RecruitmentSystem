import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getCandidateByName, getAllCandidate, deleteCandidate } from '../../../../actions/CandidateAction';
import './AdminUser.css';
function AdminUser(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const users = useSelector(state => state.users.user);
    const userSearch = useSelector(state => state.userSearch.user);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedUsers, setUpdatedUsers] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    const [updateSearchUsers, setUpdateSearchUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllUsers = searchInput === '';
    const displayedUsers = shouldShowAllUsers ? updatedUsers : updateSearchUsers;
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    useEffect(() => {
        dispatch(getAllCandidate(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedUsers(users); // Cập nhật state mới sau mỗi lần danh sách user thay đổi
    }, [users]);
    useEffect(() => {
        if (userSearch) {
            setUpdateSearchUsers(userSearch);
        }
    }, [userSearch]);
    useEffect(() => {
        if (name === '') {
            handleSearchUser('', token);
        }
    }, [name, token]);
    // Các useEffect, hàm xử lý và render khác
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
    const handleSearchUser = (name, token) => {
        setSearchInput(name);
        let searchResult = [];
        dispatch(getCandidateByName(name, token))
            .then(() => {
                searchResult = userSearch;
                setUpdateSearchUsers(searchResult);
            })
            .catch(err => {
                console.log(err);
            });
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
    return (
        <div className="adminUser">
            <div className='titleHome' >Home / User Management</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="adminUserList">
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchUser(name, token);
                            }}>
                                <input type="text" placeholder="Nhập vào tên hoặc email của user" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "10%", height: "35px" }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        {displayedUsers && displayedUsers.length === 0 ? (
                            <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Avatar</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Date Created</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUsers && displayedUsers.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td className='avatarUserFromAdmin'><img src={item.imgUrl} /></td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{FormatDate(item.createDate)}</td>
                                                <td>
                                                    <button onClick={() => handleViewDetails(item)} className='viewDetail' style={{ marginRight: '5px' }}>{'>>'}</button>
                                                    <button onClick={() => handleDeleteUser(item.id, token)}>Delete</button>
                                                </td>
                                            </tr>
                                            {selectedUserDetails && selectedUserDetails.id === item.id && (
                                                <tr>
                                                    <td colSpan="6">
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
                                                                        <td style={{ backgroundColor: 'white', color: '#0e599f' }}>{item.gender}</td>
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
                                                                        <p style={{color:'#0e599f'}}> {educationItem.major} ở {educationItem.schoolName}   </p>
                                                                        <p style={{color:'grey', textAlign:'left'}}>{educationItem.description}</p>
                                                                    </div>
                                                                ))}
                                                                <h3 className="table-heading">Kinh nghiệm làm việc</h3>
                                                            </div>
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
export default AdminUser;
