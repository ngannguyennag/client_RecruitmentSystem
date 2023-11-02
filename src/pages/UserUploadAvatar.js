import React from 'react';
import UserFileMe from '../components/User/component/UserFile/UserFileMe';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
import AvatarUploader from '../components/User/component/UserFile/AvatarUploader';
function UserUploadAvatar(props) {
    return (
        <div>
            <HeaderUser></HeaderUser>
            <AvatarUploader></AvatarUploader>
        </div>
    );
}

export default UserUploadAvatar;