import React from 'react';
import Navbar from '../components/Company/components/Navbar'
import Home from '../components/Company/components/Home'
import Demo from '../components/Company/components/Demo';
import Jobs from '../components/Company/components/About';
import Office from '../components/Company/components/Office';
import Footer from '../components/footer/Footer';
// import Header from '../components/Company/components/Header'
function DetailCompanyPage(props) {
    return (
        <div>
            {/* <Header></Header> */}
            
            <Navbar></Navbar>
            <Home></Home>
            <Jobs></Jobs>
            <Office></Office>
            <Demo></Demo>
            <Footer></Footer>
        </div>
    );
}

export default DetailCompanyPage;