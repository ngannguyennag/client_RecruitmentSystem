import React from 'react'
import HRFileCompany from '../components/HR/component/HRFileCompany/HRFileCompany'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useSelector } from 'react-redux';
function HRFileCompanyPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRFileCompany></HRFileCompany>
         </div>
    );
 }

export default HRFileCompanyPage;