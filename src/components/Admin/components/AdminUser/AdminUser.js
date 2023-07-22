import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../../../actions/UserAction';
import ListUser from './ListUser';
import './AdminUser.css';


function AdminUser(props) {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.user)
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token

    useEffect(() => {
        dispatch(getAllUser(token))
    }, [dispatch])
    return (
        <div className="admin-user">
            <span>Danh sách các user</span>
            {
                users ? (<ListUser users={users}></ListUser>) : (<h2> Loading</h2>)
            }
        </div>
    );
}

export default AdminUser;