import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getCandidateByName, getAllCandidate, deleteCandidate } from '../../../../actions/CandidateAction';
import './AdminUser.css';
import { FormatDate } from '../../../../utils/FormatDate';
import ReactPaginate from 'react-paginate';
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";

function AdminUser(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [pageNumber, setPageNumber] = useState(0); // Thêm state để lưu trữ số trang hiện tại
    const usersPerPage = 10; // Số người dùng trên mỗi trang
    const pagesVisited = pageNumber * usersPerPage;
    const users = useSelector(state => state.candidates.candidates);
    const userSearch = useSelector(state => state.candidateSearch.candidates);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedUsers, setUpdatedUsers] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    const [updateSearchUsers, setUpdateSearchUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const shouldShowAllUsers = searchInput === '';
    const displayedUsers = shouldShowAllUsers && updatedUsers ? updatedUsers.slice(pagesVisited, pagesVisited + usersPerPage) : [];
    // const displayedUsers = shouldShowAllUsers ? updatedUsers.slice(pagesVisited, pagesVisited + usersPerPage) : updateSearchUsers.slice(pagesVisited, pagesVisited + usersPerPage);
    // const pageCount = Math.ceil((shouldShowAllUsers ? updatedUsers.length : updateSearchUsers.length) / usersPerPage);
    const pageCount = Math.ceil((shouldShowAllUsers && updatedUsers ? updatedUsers.length : updateSearchUsers.length) / usersPerPage);
    // State và hàm mới cho form chi tiết người dùng
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [searching, setSearching] = useState(false);
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
    setSearching(true); // Đánh dấu bắt đầu tìm kiếm
    dispatch(getCandidateByName(name, token))
        .then((result) => {
            if (result && result.length > 0) {
                setUpdatedUsers(result); // Cập nhật danh sách người dùng khi tìm kiếm thành công
                setPageNumber(0); // Reset trang về trang đầu tiên khi tìm kiếm mới
            } else {
                setUpdatedUsers([]); // Không có kết quả, cập nhật danh sách người dùng trống
            }
            setSearching(false); // Đánh dấu kết thúc tìm kiếm
        })
        .catch(err => {
            console.log(err);
            setSearching(false); // Đánh dấu kết thúc tìm kiếm nếu xảy ra lỗi
        });
};
    
    
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
      const changePage = ({ selected }) => {
        setPageNumber(selected);
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
                                handleSearchUser(name, token);
                            }}>
                                <input type="text" placeholder="Nhập vào tên hoặc email của ứng viên" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "10%", height: "35px" }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        
                        {updatedUsers && updatedUsers.length === 0 ? (
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
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedUsers && displayedUsers.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <tr>
                                            <td>{index + 1 + pageNumber * usersPerPage}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{FormatDate(item.createDate)}</td>
                                                <td>
                                                    <DoubleRightOutlined onClick={() => handleViewDetails(item)} className='viewDetail' style={{ marginRight: '5px' }} />
                                                    <DeleteOutlined onClick={() => handleDeleteUser(item.id, token)} />
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
                                                                        <p style={{color:'#0e599f'}}> {educationItem.major} ở {educationItem.schoolName}   </p>
                                                                        <p style={{color:'grey', textAlign:'left'}}>{educationItem.description}</p>
                                                                    </div>
                                                                ))}
                                                                <h3 className="table-heading">Kinh nghiệm làm việc</h3>
                                                                {item.workingHistory.map((workingHistoryItem, index) =>(
                                                                    <div className='detailEducation' key={index}>
                                                                        <p>{workingHistoryItem.startDate} - {workingHistoryItem.endDate}:</p>
                                                                        <p style={{color:'#0e599f'}}> {workingHistoryItem.jobName} ở {workingHistoryItem.companyName}   </p>
                                                                        <p style={{color:'grey', textAlign:'left'}}>{workingHistoryItem.description}</p>
                                                                    </div>
                                                                ))}
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
             <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}
export default AdminUser;
