import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './About.css'
import { Link } from "react-router-dom";
import { getCompanyManageJobById } from "../../../actions/JobAction";

const About = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.getCompanyManageJobById.company);
    const { companyId } = useParams();
    useEffect(() => {
        dispatch(getCompanyManageJobById(companyId));
    }, [dispatch, companyId]);
    return (
        <div className='about' id='about'>
            <div className='containerJob'>
                <div className='panel-group'>
                    <div className='panel-body'>
                        <h2>We have {company?.length} jobs for you</h2>
                        {company && company.map((item) => (
                            <div id="job-card-listing">
                                <div className='company-list'>
                                    <img src={item.companyLogo} />
                                    <div className="about-job">
                                        <h4> {item.companyName} </h4> 
                                        <Link to={`/detail_jobs/${item.jobId}`}>{item.jobName}</Link>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>{item.salary} </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            {item.jobSkill && item.jobSkill.map((itemSkill) => (
                                                <ul className='list-job-item'>
                                                    <li>{itemSkill.skillNameVI} </li>
                                                </ul>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
