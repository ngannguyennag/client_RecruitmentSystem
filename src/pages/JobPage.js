import React from 'react';
import AboutJob from '../components/Job/components/AboutJob';
import HeaderJob from '../components/Job/components/Header';
import Footer from '../components/footer/Footer';
function JobPage(props) {
    return (
        <div>
            <HeaderJob></HeaderJob>
            <AboutJob></AboutJob>
            <Footer></Footer>
        </div>
    );
}

export default JobPage;