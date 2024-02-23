import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkillByAdmin, saveSkillByAdmin, deleteSkillByAdmin} from '../../../../actions/SkillAction';
import './AdminManageSkill.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AdminManageSkill(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const displayedSkill = useSelector((state => state.skill.skill));
    const [displayedSkills, setDisplayedSkills] = useState(null);
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
            dispatch(getAllSkillByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPage) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(getAllSkillByAdmin({ ...page, page: newPage, size: pageSize }, token))
        }
    };
    const pageSizes = [10, 20, 30, 50];
    const handleChangePageSize = (size) => {
        setPageSize(size);
        dispatch(getAllSkillByAdmin({ ...page, page: 1, size: size }, token));
        setCurrentPage(1);
    };
    useEffect(() => {
        dispatch(getAllSkillByAdmin(page, token));
    }, [dispatch]);

    useEffect(() => {
        if (displayedSkill) {      
            setDisplayedSkills(displayedSkill.data); // Cập nhật danh sách quyền khi tải trang
            setTotalElements(displayedSkill.total); // Cập nhật tổng số phần tử
            setTotalPage(Math.ceil(displayedSkill.total / pageSize));
        }
    }, [displayedSkill, pageSize]);
    useEffect(() => {
        if (name === '') {
            handleSearchSkill('', token);
        }
    }, [name, token]);
    const handleSearchSkill = (name) => {
        setSearchInput(name);
        setPage(prevPage => ({ ...prevPage, name: name }));
        dispatch(getAllSkillByAdmin({ ...page, name: name }, token));
    };
    const handleSaveSkill = () => {
        dispatch(saveSkillByAdmin(selectedSkill, token))
            .then(() => {
                dispatch(getAllSkillByAdmin(page, token))
            })
            .catch(error => console.error("Error saving skill:", error));
    };
    const handleAddSkill = () => {
        dispatch(saveSkillByAdmin(selectedSkill, token))
            .then(() => {
                dispatch(getAllSkillByAdmin(page, token))
            })
            .catch(error => console.error("Error saving skill:", error));
    };
    // Hàm mở form thêm mới quyền
    const handleAddNewSkill = () => {
        setIsAdding(true);
    };
    // Hàm đóng form thêm mới quyền
    const handleCancelAddNewSkill = () => {
        setIsAdding(false);
    };
    // Xử lý khi nhấn nút "Lưu" trên form thêm mới quyền
    const handleNewSkillSubmit = (event) => {
        event.preventDefault();
        if (selectedSkill) { // Kiểm tra selectedSkill có khác null không
            handleAddSkill();
            setIsAdding(false);
            setSelectedSkill(null); // Reset selectedSkill
        }
    };
    const handleDeleteSkill = (id) => {
        setIsLoading(true);
        dispatch(deleteSkillByAdmin({ ...page, id: id }, token))
            .then(() => {
                dispatch(getAllSkillByAdmin(page, token))
                    .then(response => {
                        setDisplayedSkills(response.data); // Cập nhật danh sách quyền sau khi xóa quyền
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error("Error fetching skills after deletion:", error);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.error("Error deleting skill:", error);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.keyCode === 13) {
            console.log(event.target.value);
            handleSearchSkill(event.target.value);
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);
    
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      }, []);
    const handleEditClick = (skill) => {
        setIsEditing(true);
        setSelectedSkill(skill);
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedSkill(null);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        handleSaveSkill();
        setIsEditing(false);
        setSelectedSkill(null);
    };
    return (
        <div className="adminCompany">
            <div className='titleHome'>Trang chủ / Quản lý kỹ năng</div>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className={`admin-company-list ${isEditing ? 'overlay' : ''}`}>
                        <div className="form-div">
                            <form onSubmit={e => {
                                e.preventDefault();
                                handleSearchSkill(name);
                            }}>
                                <input type="text" placeholder="Nhập vào mã kỹ năng hoặc tên kỹ năng" onChange={e => setName(e.target.value)} style={{ width: "300px", height: "35px", marginRight: '20px', borderRadius: '5px' }} />
                                <button style={{ width: "100px", height: "35px", cursor: 'pointer' }} type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <button style={{ display: 'flex', width: "150px", height: "35px", cursor: 'pointer', color: 'black', marginBottom: '20px', alignItems: 'center', justifyContent: 'space-around' }} type="submit" onClick={handleAddNewSkill}> <PlusCircleOutlined /> Thêm kỹ năng</button>
                        {isAdding && (
                            <div className="edit-form-container">
                                <div className="edit-form-skill">
                                    <h2 style={{ color: "#2071a7" }}>Thêm mới kỹ năng</h2>
                                    <form onSubmit={handleNewSkillSubmit} >
                                        <div className="edit-skill">
                                            <div className='code-1'>Mã kỹ năng <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedSkill?.code || ''} onChange={(e) => setSelectedSkill({ ...selectedSkill, code: e.target.value })} />
                                        </div>
                                        <div className="edit-skill">
                                            <div className='code-1'>Tên kỹ năng <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedSkill?.name || ''} onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })} />
                                        </div>

                                        <div className="skill-button">
                                            <button className="skill-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>Lưu</button>
                                            <button className="skill-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelAddNewSkill}>Hủy</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {isEditing && selectedSkill && (
                            <div className="edit-form-container">
                                <div className="edit-form-skill">
                                    <h2 style={{ color: "#2071a7" }}>Sửa kỹ năng</h2>
                                    <form onSubmit={handleEditFormSubmit} >
                                        <div className="edit-skill">
                                            <div className='code-1'>Mã kỹ năng <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedSkill.code} onChange={(e) => setSelectedSkill({ ...selectedSkill, code: e.target.value })} />
                                        </div>
                                        <div className="edit-skill">
                                            <div className='code-1'>Tên kỹ năng <span style={{ color: 'red' }}> * </span></div>
                                            <input type="text" value={selectedSkill.name} onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })} />
                                        </div>

                                        <div className="skill-button">
                                            <button className="skill-button-1" type="submit" style={{ backgroundColor: "rgb(19, 125, 178)", color: 'white' }}>OK</button>
                                            <button className="skill-button-2" type="button" style={{ backgroundColor: "#c0392b", color: 'black' }} onClick={handleCancelEdit}>Đóng lại</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <>
                                {displayedSkill && displayedSkill.data && displayedSkill.data.length === 0 ? (
                                    <p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã kỹ năng</th>
                                                <th>Tên kỹ năng</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedSkill && displayedSkill.data && displayedSkill.data.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.code}</td>
                                                        <td style={{ fontSize: '12px' }}>{item.name}</td>
                                                        <td>
                                                            <div className='action' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '14px' }}>
                                                                <EditOutlined onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
                                                                <DeleteOutlined onClick={() => handleDeleteSkill(item.id)} />
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

export default AdminManageSkill;
