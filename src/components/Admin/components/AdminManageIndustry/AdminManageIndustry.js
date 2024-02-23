import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIndustryByAdmin, saveIndustryByAdmin, deleteIndustryByAdmin } from '../../../../actions/IndustryAction';
import './AdminManageIndustry.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageIndustry(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const displayedIndustry = useSelector((state => state.industry.industry));
    const [displayedIndustries, setDisplayedIndustries] = useState(null);
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
            dispatch(getAllIndustryByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllIndustryByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];

    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllIndustryByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getAllIndustryByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedIndustry) {      
            setDisplayedIndustries(displayedIndustry.data); // Cập nhật danh sách lĩnh vực hoạt động khi tải trang
            setTotalElements(displayedIndustry.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedIndustry.total / pageSize));
        }
    }, [displayedIndustry, pageSize]);
    const handleSearchIndustry = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllIndustryByAdmin({ ...page, name: name }, token));
    };
    const handleSaveIndustry = () => {
        dispatch(saveIndustryByAdmin(selectedIndustry, token))
            .then(() => {
                dispatch(getAllIndustryByAdmin(page, token))
            })
            .catch(error => console.error("Error saving industry:", error));
    };
    const handleAddIndustry = () => {
        dispatch(saveIndustryByAdmin(selectedIndustry, token))
            .then(() => {
                dispatch(getAllIndustryByAdmin(page, token))
            })
            .catch(error => console.error("Error saving industry:", error));
    };
    // Hàm mở form thêm mới lĩnh vực hoạt động
    const handleAddNewIndustry = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới lĩnh vực hoạt động
    const handleCancelAddNewIndustry = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới lĩnh vực hoạt động
    const handleNewIndustrySubmit = (event) => {
        event.preventDefault();
        if (selectedIndustry) { // Kiểm tra selectedIndustry có khác null không
            handleAddIndustry();
            setIsAdding(false);
            setSelectedIndustry(null); // Reset selectedIndustry
        }
    };
    const handleDeleteIndustry = (id) => {
        setIsLoading(true);
        dispatch(deleteIndustryByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllIndustryByAdmin(page, token))
                    .then(response => {
                        setDisplayedIndustries(response.data); // Cập nhật danh sách lĩnh vực hoạt động sau khi xóa lĩnh vực hoạt động
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching industrys after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting industry:", error);
                setIsLoading(false);
            });
    };
    
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.keyCode === 13) {
            console.log(event.target.value);
            handleSearchIndustry(event.target.value);
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);
    
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, []);

    const handleEditClick = (industry) => {
        setIsEditing(true);
        setSelectedIndustry(industry);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedIndustry(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveIndustry();
        setIsEditing(false);
        setSelectedIndustry(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý lĩnh vực hoạt động</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchIndustry(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã lĩnh vực hoạt động hoặc tên lĩnh vực hoạt động" onChange={e => setName(e.target.value)} style={{ width: "400px", height: "35px", paddingLeft: '10px', marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "100px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewIndustry}> <PlusCircleOutlined /> Thêm mới</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-industry">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới lĩnh vực hoạt động</h2>
                                    <form onSubmit={handleNewIndustrySubmit} >
                                        <div className="edit-industry">
                                            <div className='code-1'>Mã lĩnh vực hoạt động <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedIndustry?.code || ''} onChange={(e) => setSelectedIndustry({ ...selectedIndustry, code: e.target.value })} />
                                        </div>
                                        <div className="edit-industry">
                                            <div className='code-1'>Tên lĩnh vực hoạt động <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedIndustry?.name || ''} onChange={(e) => setSelectedIndustry({ ...selectedIndustry, name: e.target.value })} />
                                        </div>

                                        <div className="industry-button">
                                            <button className="industry-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="industry-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelAddNewIndustry}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedIndustry && (
                            <div className="edit-form-container">
                                <div className="edit-form-industry">
                                    <h2 style={{ color: "#2071a7" }}>Sửa lĩnh vực hoạt động</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-industry">
                                            <div className='code-1'>Mã lĩnh vực hoạt động <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedIndustry.code} onChange={(e) => setSelectedIndustry({ ...selectedIndustry, code: e.target.value })} />
                                        </div>
                                        <div className="edit-industry">
                                            <div className='code-1'>Tên lĩnh vực hoạt động <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedIndustry.name} onChange={(e) => setSelectedIndustry({ ...selectedIndustry, name: e.target.value })} />
                                        </div>

                                        <div className="industry-button">
                                            <button className="industry-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="industry-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedIndustry && displayedIndustry.data && displayedIndustry.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã lĩnh vực hoạt động</th>
                                                <th>Tên lĩnh vực hoạt động</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedIndustry && displayedIndustry.data && displayedIndustry.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteIndustry(item.id)} />
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

export default AdminManageIndustry;
