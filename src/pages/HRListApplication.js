import React from 'react'
import AppChat from '../components/AppChat/AppChat'
import { useSelector } from 'react-redux';
import HRListApplication from '../components/HR/component/HRListApplication/HRListApplication';
function HRListApplicationPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRListApplication></HRListApplication>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }        </div>
    );
 }

export default HRListApplicationPage;