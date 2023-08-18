
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser, deleteUser } from '../../../../actions/UserAction';
import axios from 'axios';
import './AdminUser.css';

function AdminUser(props) {
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
            <span>Danh sách các user</span>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-user-list">
                        <div className="form-div">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Nhập vào id của user" onChange={e => setUserId(e.target.value)}  style={{width: "250px", height:"35px"}}/>
                                <input type="text" placeholder="Nhập vào tên của user" onChange={e => setName(e.target.value)}  style={{width: "250px", height:"35px"}}/>
                                <button  style={{width: "50px", height:"35px"}}>Add</button>
                            </form>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>UserId</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Date Created</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedUsers && updatedUsers.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{FormatDate(item.createdAt)}</td>
                                        <td>{item.roleName}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button onClick={() => handleDeleteUser(item.id, token)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}

export default AdminUser;
