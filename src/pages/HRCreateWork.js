import React from 'react'
import AppChat from '../components/AppChat/AppChat'
import HRCreateWork from '../components/HR/component/HRCreateWork/HRCreateWork'
import { useSelector } from 'react-redux';
function HRCreateWorkPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRCreateWork></HRCreateWork>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }        </div>
    );
 }

export default HRCreateWorkPage;