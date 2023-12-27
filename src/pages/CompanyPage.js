import React from 'react';
import Footer from '../components/footer/Footer';
import AboutCompany from '../components/Company/components/AboutCompany';
import HeaderCompany from '../components/Company/components/HeaderCompany';
function CompanyPage(props) {
    return (
        <div>
            <HeaderCompany></HeaderCompany>
            <AboutCompany></AboutCompany>
            <Footer></Footer>
        </div>
    );
}

export default CompanyPage;