import React from 'react'
import HR from '../components/HR/HR';
import { useSelector } from 'react-redux';
import HeaderHR from '../components/HR/component/HeaderHR/HeaderHR';
function HRPage(props){
    const {userInfo} = useSelector(state => state.userSignIn);
    return(
        <div style={{position: 'relative'}}>
            <HeaderHR></HeaderHR>
            <HR></HR>
         </div>
    );
 }

export default HRPage;