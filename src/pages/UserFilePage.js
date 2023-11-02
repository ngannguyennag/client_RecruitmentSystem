import React from 'react';
import UserFileMe from '../components/User/component/UserFile/UserFileMe';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
function UserFilePage(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            <UserFileMe></UserFileMe>
        </div>
    );
}

export default UserFilePage;