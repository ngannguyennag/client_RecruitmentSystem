import React from 'react';
import UserFile from '../components/User/component/UserFile/UserFile';
import UserFileUpdate from '../components/User/component/UserFile/UserFileUpdate';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
import UserManage from '../components/User/component/UserManageAccount/UserManage';
function UserFilePage(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            <UserFile></UserFile>
            {/* <UserFileUpdate></UserFileUpdate> */}
            {/* <UserManage></UserManage> */}
        </div>
    );
}

export default UserFilePage;