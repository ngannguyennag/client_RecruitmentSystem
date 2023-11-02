
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, deleteUser } from '../../../../actions/UserAction';
import axios from 'axios';
import './HRListApplication.css';

function HRListApplication(props) {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const users = useSelector(state => state.users.user);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedUsers, setUpdatedUsers] = useState([]); // State mới để lưu trữ danh sách user sau khi xóa thành công
    useEffect(() => {
        dispatch(getAllUser(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedUsers(users); // Cập nhật state mới sau mỗi lần danh sách user thay đổi
    }, [users]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = users[users.length - 1].id;
        axios.post('http://localhost:3000/users', { id: id, userId: userId, name: name })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const handleDeleteUser = (userId, token) => {
        setIsLoading(true);
        dispatch(deleteUser(userId, token))
            .then(() => {
                dispatch(getAllUser(token));
                setIsLoading(false);
                setUpdatedUsers(users);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Ẩn loading nếu xóa không thành công
            });
    }

    const FormatDate = (time) => {
        var dateFormat = new Date(time * 1000);
        return dateFormat.getDate() +
            "/" + (dateFormat.getMonth() + 1) +
            "/" + dateFormat.getFullYear();
    }
    console.log(updatedUsers);
    console.log(setUpdatedUsers);


    return (
        <div className="admin-user">
            <span style={{fontSize:'24px'}}>Danh sách ứng tuyển</span>
            <span style={{fontSize:'13px', color:'grey', paddingTop:'0px'}}>Xem xét, phê duyệt hồ sơ ứng viên</span>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-user-list">
                        <div className="form-div">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Chọn công việc" onChange={e => setUserId(e.target.value)}  style={{width: "250px", height:"35px", marginRight:'20px', borderRadius:"5px"}}/>
                                <input type="text" placeholder="Tìm tên ứng viên" onChange={e => setUserId(e.target.value)}  style={{width: "150px", height:"35px", marginRight:'20px', borderRadius:"5px"}}/>
                                <input type="text" placeholder="Trạng thái" onChange={e => setUserId(e.target.value)}  style={{width: "150px", height:"35px", marginRight:'20px', borderRadius:"5px"}}/>
                                <button  style={{width: "90px", height:"35px"}}>Tìm kiếm</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default HRListApplication;
