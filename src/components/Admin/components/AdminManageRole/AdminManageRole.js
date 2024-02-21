import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoleByAdmin, saveRoleByAdmin, deleteRoleByAdmin, addRoleByAdmin, pageRoleByAdmin } from '../../../../actions/AuthenticationAction';
import './AdminManageRole.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageRole(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const displayedRole = useSelector((state => state.role.role));
    const [displayedRoles, setDisplayedRoles] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState({
        "id": 0,
        "code": "",
        "name": "",
        "page": 1,
        "size": 10
    });

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(getAllRoleByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllRoleByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    useEffect(() => {
        dispatch(getAllRoleByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedRole) {      
            setDisplayedRoles(displayedRole.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedRole.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedRole.total / page.size));
        }
    }, [displayedRole, page.size]);
    useEffect(() => {
        if (name === '') {
            handleSearchRole('', token);
        }
    }, [name, token]);
    const handleSearchRole = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllRoleByAdmin({ ...page, name: name }, token));
    };
    const handleSaveRole = () => {
        dispatch(saveRoleByAdmin(selectedRole, token))
            .then(() => {
                dispatch(getAllRoleByAdmin(page, token))
            })
            .catch(error => console.error("Error saving role:", error));
    };
    const handleAddRole = () => {
        dispatch(addRoleByAdmin(selectedRole, token))
            .then(() => {
                dispatch(getAllRoleByAdmin(page, token))
            })
            .catch(error => console.error("Error saving role:", error));
    };
    // Hàm mở form thêm mới quyền
    const handleAddNewRole = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới quyền
    const handleCancelAddNewRole = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới quyền
    const handleNewRoleSubmit = (event) => {
        event.preventDefault();
        if (selectedRole) { // Kiểm tra selectedRole có khác null không
            handleAddRole();
            setIsAdding(false);
            setSelectedRole(null); // Reset selectedRole
        }
    };
    const handleDeleteRole = (id) => {
        setIsLoading(true);
        dispatch(deleteRoleByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllRoleByAdmin(page, token))
                    .then(response => {
                        setDisplayedRoles(response.data); // Cập nhật danh sách quyền sau khi xóa quyền
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching roles after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting role:", error);
                setIsLoading(false);
            });
    };
    const handleEditClick = (role) => {
        setIsEditing(true);
        setSelectedRole(role);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedRole(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveRole();
        setIsEditing(false);
        setSelectedRole(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý quyền</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchRole(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã quyền hoặc tên quyền" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "100px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewRole}> <PlusCircleOutlined /> Thêm quyền</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-role">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới quyền</h2>
                                    <form onSubmit={handleNewRoleSubmit} >
                                        <div className="edit-role">
                                            <div className='code-1'>Mã quyền <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedRole?.code || ''} onChange={(e) => setSelectedRole({ ...selectedRole, code: e.target.value })} />
                                        </div>
                                        <div className="edit-role">
                                            <div className='code-1'>Tên quyền <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedRole?.name || ''} onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })} />
                                        </div>

                                        <div className="role-button">
                                            <button className="role-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="role-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelAddNewRole}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedRole && (
                            <div className="edit-form-container">
                                <div className="edit-form-role">
                                    <h2 style={{ color: "#2071a7" }}>Sửa quyền</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-role">
                                            <div className='code-1'>Mã quyền <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedRole.code} onChange={(e) => setSelectedRole({ ...selectedRole, code: e.target.value })} />
                                        </div>
                                        <div className="edit-role">
                                            <div className='code-1'>Tên quyền <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedRole.name} onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })} />
                                        </div>

                                        <div className="role-button">
                                            <button className="role-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="role-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedRole && displayedRole.data && displayedRole.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã quyền</th>
                                                <th>Tên quyền</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedRole && displayedRole.data && displayedRole.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteRole(item.id)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                        <div style={{color: 'black'}}>
                            <button onClick={goToPreviousPage}>Trang trước</button>
                            <span>Trang {currentPage} / {totalPage}</span>
                            <button onClick={goToNextPage}>Trang tiếp theo</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default AdminManageRole;
