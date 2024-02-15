import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Demo.css'
import { getCompanyById } from "../../../actions/CompanyAction";

const Demo = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.getCompanyById.company);
    const { companyId } = useParams();
    const companyImage = company?.companyImage?.split(';')
    const thirdPart = companyImage ? companyImage.slice(8) : [];
    useEffect(() => {
        dispatch(getCompanyById(companyId));
    }, [dispatch, companyId]);

    // Function to split company introduction by periods and display with bullet points
    const renderIntroductionLines = (introduction) => {
        return introduction?.split('.').map((sentence, index, array) => (
            <span key={index}>
                &bull; {sentence.trim()}
                {index !== array.length - 1 && '.'} {/* Add period if it's not the last sentence */}
                <br />
            </span>
        ));
    };

    return (
        <div className='demo' id='demo'>
            <h2>Our Story</h2>
            <span className='line'></span>
            <div className='containerDemo'>
                <div className='col-2'>
                    {thirdPart.map((item, index) => (
                        <li key={index} className='card'>
                            <img src={item} alt='logoCompany' />
                        </li>
                    ))}
                </div>
                <div className='col-1'>
                    <div className="custom-item-content">
                        <h3>Giới thiệu công ty</h3>
                        {/* Render company introduction lines */}
                        {renderIntroductionLines(company?.companyIntroduction)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo;
