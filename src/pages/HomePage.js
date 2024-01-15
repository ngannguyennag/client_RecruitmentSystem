import React from 'react';
import Header from '../components/header/Header';
import Carousel from '../components/Slider/Carousel';
import CarouselJob from '../components/Slider/CarouselJob';
import CarouselCompany from '../components/Slider/CarouselCompany';
import Footer from '../components/footer/Footer'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
function HomePage(props) {
    // const {userInfo} = useSelector(state => state.userSignin);
    
    return (
        <div style={{position: 'relative'}}>
            <Header></Header>
            <Carousel></Carousel>
            <CarouselJob></CarouselJob>
            <CarouselCompany></CarouselCompany>
            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
            {/* <button onClick={() => window.location.href='/customer'}>customer</button>
            <button onClick={() => window.location.href='/admin'}>Admin</button> */}
            {/* {
               userInfo && userInfo.isAdmin === false ? (<AppChat></AppChat>) : ""
            } */}
        </div>
    );
}

export default HomePage;