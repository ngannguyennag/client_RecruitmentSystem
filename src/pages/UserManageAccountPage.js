import React from 'react';
import UserManage from '../components/User/component/UserManageAccount/UserManage';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
function UserManageAccountPage(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            <UserManage></UserManage>
        </div>
    );
}

export default UserManageAccountPage;