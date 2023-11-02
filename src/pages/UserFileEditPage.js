import React from 'react';
import UserFile from '../components/User/component/UserFile/UserFileMe';
import UserFileUpdate from '../components/User/component/UserFile/UserFileUpdate';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
import UserManage from '../components/User/component/UserManageAccount/UserManage';
function UserFileEditPage(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            {/* <UserFileEdit></UserFileEdit> */}
            <UserFileUpdate></UserFileUpdate>
            {/* <UserManage></UserManage> */}
        </div>
    );
}

export default UserFileEditPage;