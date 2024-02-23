import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDegreeByAdmin, saveDegreeByAdmin, deleteDegreeByAdmin, addDegreeByAdmin, pageDegreeByAdmin } from '../../../../actions/DegreeAction';
import './AdminManageDegree.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageDegree(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState(null);
    const displayedDegree = useSelector((state => state.degree.degree));
    const [displayedDegrees, setDisplayedDegrees] = useState(null);
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
            dispatch(getAllDegreeByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllDegreeByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];

    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllDegreeByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllDegreeByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedDegree) {      
            setDisplayedDegrees(displayedDegree.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedDegree.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedDegree.total / pageSize));
        }
    }, [displayedDegree, pageSize]);
    useEffect(() => {
        if (name === '') {
            handleSearchDegree('', token);
        }
    }, [name, token]);
    const handleSearchDegree = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllDegreeByAdmin({ ...page, name: name }, token));
    };
    const handleSaveDegree = () => {
        dispatch(saveDegreeByAdmin(selectedDegree, token))
            .then(() => {
                dispatch(getAllDegreeByAdmin(page, token))
            })
            .catch(error => console.error("Error saving degree:", error));
    };
    const handleAddDegree = () => {
        dispatch(addDegreeByAdmin(selectedDegree, token))
            .then(() => {
                dispatch(getAllDegreeByAdmin(page, token))
            })
            .catch(error => console.error("Error saving degree:", error));
    };
    // Hàm mở form thêm mới quyền
    const handleAddNewDegree = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới quyền
    const handleCancelAddNewDegree = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới quyền
    const handleNewDegreeSubmit = (event) => {
        event.preventDefault();
        if (selectedDegree) { // Kiểm tra selectedDegree có khác null không
            handleAddDegree();
            setIsAdding(false);
            setSelectedDegree(null); // Reset selectedDegree
        }
    };
    const handleDeleteDegree = (id) => {
        setIsLoading(true);
        dispatch(deleteDegreeByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllDegreeByAdmin(page, token))
                    .then(response => {
                        setDisplayedDegrees(response.data); // Cập nhật danh sách quyền sau khi xóa quyền
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching degrees after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting degree:", error);
                setIsLoading(false);
            });
    };
    const handleEditClick = (degree) => {
        setIsEditing(true);
        setSelectedDegree(degree);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedDegree(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveDegree();
        setIsEditing(false);
        setSelectedDegree(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý bằng cấp</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchDegree(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã bằng cấp hoặc tên bằng cấp" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "150px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewDegree}> <PlusCircleOutlined /> Thêm bằng cấp</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-degree">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới bằng cấp</h2>
                                    <form onSubmit={handleNewDegreeSubmit} >
                                        <div className="edit-degree">
                                            <div className='code-1'>Mã bằng cấp <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedDegree?.code || ''} onChange={(e) => setSelectedDegree({ ...selectedDegree, code: e.target.value })} />
                                        </div>
                                        <div className="edit-degree">
                                            <div className='code-1'>Tên bằng cấp <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedDegree?.name || ''} onChange={(e) => setSelectedDegree({ ...selectedDegree, name: e.target.value })} />
                                        </div>

                                        <div className="degree-button">
                                            <button className="degree-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="degree-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelAddNewDegree}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedDegree && (
                            <div className="edit-form-container">
                                <div className="edit-form-degree">
                                    <h2 style={{ color: "#2071a7" }}>Sửa bằng cấp</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-degree">
                                            <div className='code-1'>Mã bằng cấp <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedDegree.code} onChange={(e) => setSelectedDegree({ ...selectedDegree, code: e.target.value })} />
                                        </div>
                                        <div className="edit-degree">
                                            <div className='code-1'>Tên bằng cấp <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedDegree.name} onChange={(e) => setSelectedDegree({ ...selectedDegree, name: e.target.value })} />
                                        </div>

                                        <div className="degree-button">
                                            <button className="degree-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="degree-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedDegree && displayedDegree.data && displayedDegree.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã bằng cấp</th>
                                                <th>Tên bằng cấp</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedDegree && displayedDegree.data && displayedDegree.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteDegree(item.id)} />
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

export default AdminManageDegree;
