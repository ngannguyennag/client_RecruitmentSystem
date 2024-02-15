import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../actions/CompanyAction";
import './Office.css'

const Office = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.getCompanyById.company);
    const { companyId } = useParams();
    const companyImage = company?.companyImage?.split(';')
    const firstPart = companyImage?companyImage.slice(0, 4):[];
    const secondPart = companyImage?companyImage.slice(4,8):[];
    useEffect(() => {
        dispatch(getCompanyById(companyId));
    }, [dispatch, companyId]);
    return (
        <div className='office' id='office'>
            <div className='container'>
                <h2>Our Office</h2>
                <span className='line'></span>
                <div className='row'>
                    <ul className='ourOffice'>
                    {firstPart.map((item, index) => (
                            <li key={index} className='card'>
                                <img src={item} alt='logoCompany' />
                            </li>
                        ))}
                        <li className='card'>
                            <div className='cardText'>
                                <p>ADDRESS</p>
                                <p>{company?.companyAddress.fullAddress}</p>
                                <p>Hotline: {company?.phoneNumber}</p>
                                <p>Email: {company?.email}</p>
                                <p>{company?.companyBranch}</p>
                            </div>
                        </li>
                        {secondPart.map((item, index) => (
                            <li key={index} className='card'>
                                <img src={item} alt='logoCompany' />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Office
