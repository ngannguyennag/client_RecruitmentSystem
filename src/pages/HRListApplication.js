import React from 'react'
import { useSelector } from 'react-redux';
import HRListApplication from '../components/HR/component/HRListApplication/HRListApplication';
function HRListApplicationPage(props){
    const {userInfo} = useSelector(state => state.userSignin);
    return(
        <div style={{position: 'relative'}}>
            <HRListApplication></HRListApplication>
        </div>
    );
 }

export default HRListApplicationPage;