import React from 'react'
import AppChat from '../components/AppChat/AppChat'
import  HRManageWork from '../components/HR/component/HRManageWork/HRManageWork'
import { useSelector } from 'react-redux';
function HRManageWorkPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRManageWork></HRManageWork>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }        </div>
    );
 }

export default HRManageWorkPage;