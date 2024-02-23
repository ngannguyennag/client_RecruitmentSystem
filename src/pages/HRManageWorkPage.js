import React from 'react'
import  HRManageWork from '../components/HR/component/HRManageWork/HRManageWork'
import { useSelector } from 'react-redux';
function HRManageWorkPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRManageWork></HRManageWork>
        </div>
    );
 }

export default HRManageWorkPage;