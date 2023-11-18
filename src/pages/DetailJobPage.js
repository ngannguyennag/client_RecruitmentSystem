import React from 'react';
import DetailJob from '../components/Job/components/DetailJob';
import HeaderJob from '../components/Job/components/Header';
import Footer from '../components/footer/Footer';
function DetailJobPage(props) {
    return (
        <div>
            <HeaderJob></HeaderJob>
            <DetailJob></DetailJob>
            <Footer></Footer>
        </div>
    );
}

export default DetailJobPage;