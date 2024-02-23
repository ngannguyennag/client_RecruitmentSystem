import React from 'react'
import HRCreateWork from '../components/HR/component/HRCreateWork/HRCreateWork'
import { useSelector } from 'react-redux';
function HRCreateWorkPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRCreateWork></HRCreateWork>
         </div>
    );
 }

export default HRCreateWorkPage;