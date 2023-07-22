import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, getAllUser } from '../../../../actions/UserAction';
import { DeleteOutlined} from '@ant-design/icons';

function User(props) {
    const {user, number} = props
    const dispatch = useDispatch()
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token

    const handleDeleteUser = async (user) => {
        await dispatch(deleteUser(user._id))
        dispatch(getAllUser(token))
    }
    const FormatDate=(time) => {
        var dateFormat = new Date(time*1000);
        return dateFormat.getDate()+ 
        "/" + (dateFormat.getMonth()+1)+ 
        "/" + dateFormat.getFullYear();
    }
    return (
        <tr>
            <td>{number+1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            {/* <td>{user.firstName}</td> */}
            {/* <td>{user.lastName}</td> */}
            {/* <td>{user.gender}</td> */}
            {/* <td>{user.phoneNumber}</td> */}
            
            {/* <td>{new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(user.createdAt)}</td> */}
            <td>{FormatDate(user.createdAt)}</td>
            <td>{user.roleName}</td>
            <td className="delete-user"onClick={() => handleDeleteUser(user)}><DeleteOutlined /></td>
        </tr>
    );
}

export default User;