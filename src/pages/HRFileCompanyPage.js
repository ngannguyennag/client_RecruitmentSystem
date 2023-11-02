import React from 'react'
import AppChat from '../components/AppChat/AppChat'
import HRFileCompany from '../components/HR/component/HRFileCompany/HRFileCompany'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useSelector } from 'react-redux';
function HRFileCompanyPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRFileCompany></HRFileCompany>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }        </div>
    );
 }

export default HRFileCompanyPage;