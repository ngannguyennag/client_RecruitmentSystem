import React from 'react';
import UserFile from '../components/User/component/UserFile/UserFile';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
function UserFilePage(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            <UserFile></UserFile>
        </div>
    );
}

export default UserFilePage;