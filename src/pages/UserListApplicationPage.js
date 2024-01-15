import React from 'react'
import { useSelector } from 'react-redux';
import UserListApplication from '../components/UserDashboard/components/UserListApplication/UserListApplication'
function UserListApplicationPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        // <div style={{position: 'relative'}}>
            <UserListApplication></UserListApplication>
    //   </div>
    );
 }

export default UserListApplicationPage;