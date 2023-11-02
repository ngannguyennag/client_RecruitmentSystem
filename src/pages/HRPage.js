import React from 'react'
import AppChat from '../components/AppChat/AppChat'
import HR from '../components/HR/HR';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useSelector } from 'react-redux';
import HeaderHR from '../components/HR/component/HeaderHR/HeaderHR';
function HRPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HeaderHR></HeaderHR>
            <HR></HR>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }        </div>
    );
 }

export default HRPage;