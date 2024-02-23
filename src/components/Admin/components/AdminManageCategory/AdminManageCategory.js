import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryByAdmin, saveCategoryByAdmin, deleteCategoryByAdmin } from '../../../../actions/CategoryAction';
import './AdminManageCategory.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageCategory(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const displayedCategory = useSelector((state => state.category.category));
    const [displayedCategorys, setDisplayedCategorys] = useState(null);
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
            dispatch(getAllCategoryByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllCategoryByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];

    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllCategoryByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getAllCategoryByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedCategory) {      
            setDisplayedCategorys(displayedCategory.data); // Cập nhật danh sách ngành nghề khi tải trang
            setTotalElements(displayedCategory.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedCategory.total / pageSize));
        }
    }, [displayedCategory, pageSize]);
    useEffect(() => {
        if (name === '') {
            handleSearchCategory('', token);
        }
    }, [name, token]);
    const handleSearchCategory = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllCategoryByAdmin({ ...page, name: name }, token));
    };
    const handleSaveCategory = () => {
        dispatch(saveCategoryByAdmin(selectedCategory, token))
            .then(() => {
                dispatch(getAllCategoryByAdmin(page, token))
            })
            .catch(error => console.error("Error saving category:", error));
    };
    const handleAddCategory = () => {
        dispatch(saveCategoryByAdmin(selectedCategory, token))
            .then(() => {
                dispatch(getAllCategoryByAdmin(page, token))
            })
            .catch(error => console.error("Error saving category:", error));
    };
    // Hàm mở form thêm mới ngành nghề
    const handleAddNewCategory = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới ngành nghề
    const handleCancelAddNewCategory = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới ngành nghề
    const handleNewCategorySubmit = (event) => {
        event.preventDefault();
        if (selectedCategory) { // Kiểm tra selectedCategory có khác null không
            handleAddCategory();
            setIsAdding(false);
            setSelectedCategory(null); // Reset selectedCategory
        }
    };
    const handleDeleteCategory = (id) => {
        setIsLoading(true);
        dispatch(deleteCategoryByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllCategoryByAdmin(page, token))
                    .then(response => {
                        setDisplayedCategorys(response.data); // Cập nhật danh sách ngành nghề sau khi xóa ngành nghề
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching categorys after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting category:", error);
                setIsLoading(false);
            });
    };
    const handleEditClick = (category) => {
        setIsEditing(true);
        setSelectedCategory(category);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedCategory(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveCategory();
        setIsEditing(false);
        setSelectedCategory(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý ngành nghề</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchCategory(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã ngành nghề hoặc tên ngành nghề" onChange={e => setName(e.target.value)} style={{ width: "400px", height: "35px", paddingLeft: '10px', marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "100px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewCategory}> <PlusCircleOutlined /> Thêm mới</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-category">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới ngành nghề</h2>
                                    <form onSubmit={handleNewCategorySubmit} >
                                        <div className="edit-category">
                                            <div className='code-1'>Mã ngành nghề <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedCategory?.code || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, code: e.target.value })} />
                                        </div>
                                        <div className="edit-category">
                                            <div className='code-1'>Tên ngành nghề <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedCategory?.name || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
                                        </div>

                                        <div className="category-button">
                                            <button className="category-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="category-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelAddNewCategory}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedCategory && (
                            <div className="edit-form-container">
                                <div className="edit-form-category">
                                    <h2 style={{ color: "#2071a7" }}>Sửa ngành nghề</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-category">
                                            <div className='code-1'>Mã ngành nghề <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedCategory.code} onChange={(e) => setSelectedCategory({ ...selectedCategory, code: e.target.value })} />
                                        </div>
                                        <div className="edit-category">
                                            <div className='code-1'>Tên ngành nghề <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedCategory.name} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
                                        </div>

                                        <div className="category-button">
                                            <button className="category-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="category-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'white' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedCategory && displayedCategory.data && displayedCategory.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã ngành nghề</th>
                                                <th>Tên ngành nghề</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedCategory && displayedCategory.data && displayedCategory.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteCategory(item.id)} />
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

export default AdminManageCategory;
