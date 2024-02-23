import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobTypeByAdmin, saveJobTypeByAdmin, deleteJobTypeByAdmin } from '../../../../actions/JobTypeAction';
import './AdminManageJobType.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageJobType(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedJobType, setSelectedJobType] = useState(null);
    const displayedJobType = useSelector((state => state.jobType.jobType));
    const [displayedJobTypes, setDisplayedJobTypes] = useState(null);
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
            dispatch(getAllJobTypeByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllJobTypeByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];

    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllJobTypeByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getAllJobTypeByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedJobType) {      
            setDisplayedJobTypes(displayedJobType.data); // Cập nhật danh sách loại hình công việc khi tải trang
            setTotalElements(displayedJobType.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedJobType.total / pageSize));
        }
    }, [displayedJobType, page.size, pageSize]);
    useEffect(() => {
        if (name === '') {
            handleSearchJobType('', token);
        }
    }, [name, token]);
    const handleSearchJobType = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllJobTypeByAdmin({ ...page, name: name }, token));
    };
    const handleSaveJobType = () => {
        dispatch(saveJobTypeByAdmin(selectedJobType, token))
            .then(() => {
                dispatch(getAllJobTypeByAdmin(page, token))
            })
            .catch(error => console.error("Error saving job-type:", error));
    };
    const handleAddJobType = () => {
        dispatch(saveJobTypeByAdmin(selectedJobType, token))
            .then(() => {
                dispatch(getAllJobTypeByAdmin(page, token))
            })
            .catch(error => console.error("Error saving job-type:", error));
    };
    // Hàm mở form thêm mới loại hình công việc
    const handleAddNewJobType = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới loại hình công việc
    const handleCancelAddNewJobType = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới loại hình công việc
    const handleNewJobTypeSubmit = (event) => {
        event.preventDefault();
        if (selectedJobType) { // Kiểm tra selectedJobType có khác null không
            handleAddJobType();
            setIsAdding(false);
            setSelectedJobType(null); // Reset selectedJobType
        }
    };
    const handleDeleteJobType = (id) => {
        setIsLoading(true);
        dispatch(deleteJobTypeByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllJobTypeByAdmin(page, token))
                    .then(response => {
                        setDisplayedJobTypes(response.data); // Cập nhật danh sách loại hình công việc sau khi xóa loại hình công việc
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching job-types after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting job-type:", error);
                setIsLoading(false);
            });
    };
    const handleEditClick = (jobType) => {
        setIsEditing(true);
        setSelectedJobType(jobType);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedJobType(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveJobType();
        setIsEditing(false);
        setSelectedJobType(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý loại hình công việc</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchJobType(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã loại hình công việc hoặc tên loại hình công việc" onChange={e => setName(e.target.value)} style={{ width: "400px", height: "35px", paddingLeft: '10px', marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "100px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewJobType}> <PlusCircleOutlined /> Thêm mới</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-job-type">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới loại hình công việc</h2>
                                    <form onSubmit={handleNewJobTypeSubmit} >
                                        <div className="edit-job-type">
                                            <div className='code-1'>Mã loại hình công việc <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedJobType?.code || ''} onChange={(e) => setSelectedJobType({ ...selectedJobType, code: e.target.value })} />
                                        </div>
                                        <div className="edit-job-type">
                                            <div className='code-1'>Tên loại hình công việc <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedJobType?.name || ''} onChange={(e) => setSelectedJobType({ ...selectedJobType, name: e.target.value })} />
                                        </div>

                                        <div className="job-type-button">
                                            <button className="job-type-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="job-type-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelAddNewJobType}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedJobType && (
                            <div className="edit-form-container">
                                <div className="edit-form-job-type">
                                    <h2 style={{ color: "#2071a7" }}>Sửa loại hình công việc</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-job-type">
                                            <div className='code-1'>Mã loại hình công việc <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedJobType.code} onChange={(e) => setSelectedJobType({ ...selectedJobType, code: e.target.value })} />
                                        </div>
                                        <div className="edit-job-type">
                                            <div className='code-1'>Tên loại hình công việc <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedJobType.name} onChange={(e) => setSelectedJobType({ ...selectedJobType, name: e.target.value })} />
                                        </div>

                                        <div className="job-type-button">
                                            <button className="job-type-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="job-type-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedJobType && displayedJobType.data && displayedJobType.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã loại hình công việc</th>
                                                <th>Tên loại hình công việc</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedJobType && displayedJobType.data && displayedJobType.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteJobType(item.id)} />
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
                        <div style={{color: 'black', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <button style={{width: '20px'}} onClick={goToPreviousPage}>{"<"}</button>
                            <span>Trang {currentPage} / {totalPage}</span>
                            <button style={{width: '20px'}} onClick={goToNextPage}>{">"}</button>
                            <select style={{width: '80px', marginLeft: '20px'}} value={pageSize} onChange={(e) => handleChangePageSize(parseInt(e.target.value))}>
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

export default AdminManageJobType;
