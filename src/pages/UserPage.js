import React from 'react';
import HeaderUser from '../components/User/component/HeaderUser/HeaderUser';
import Carousel from '../components/Slider/Carousel';
import CarouselJob from '../components/Slider/CarouselJob';
import CarouselCompany from '../components/Slider/CarouselCompany';
import Footer from '../components/footer/Footer'
import AppChat from '../components/AppChat/AppChat'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useSelector } from 'react-redux';

function UserPage(props) {
    const {userInfo} = useSelector(state => state.userSignin);
    
    return (
        <div style={{position: 'relative'}}>
            <HeaderUser></HeaderUser>
            <Carousel></Carousel>
            <CarouselJob></CarouselJob>
            <CarouselCompany></CarouselCompany>

            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
            {
               userInfo && userInfo.isUser === false ? (<AppChat></AppChat>) : ""
            }
        </div>
    );
}

export default UserPage;