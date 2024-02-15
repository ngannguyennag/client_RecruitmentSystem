import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Home.css';
import { getCompanyById } from "../../../actions/CompanyAction";

const Home = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.getCompanyById.company);
    const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
    const { companyId } = useParams();
    
    useEffect(() => {
        dispatch(getCompanyById(companyId));
    }, [dispatch, companyId]);

    const handleWebsiteClick = () => {
        // Redirect to the company's website
        window.location.href = company?.website;
    };

    return (
        <div className='hero' id='hero'>
            <div className='contentCompany'>
                <div className='logoCompany'>
                    <img src={company?.companyLogo} alt='logoCompany' />
                </div>
                <div className='nameCompany'>
                    {company?.companyFullName}
                    <li>
                        <p> {company?.companyAddress.province}</p>
                        <span style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={handleWebsiteClick}>{company?.website}</span>
                    </li>
                    <li>
                        <p> {company?.companyIndustry.industryNameVI}</p>
                    </li>
                </div>
                <button href='/' className='button'>Follow</button>
            </div>
        </div>
    )
}

export default Home;
