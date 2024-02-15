import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {
    SearchOutlined
} from "@ant-design/icons";
import './AboutJob.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllJob } from "../../../actions/JobAction";
import { useParams } from "react-router-dom";
const AboutJob = () => {
    const dispatch = useDispatch();
    const jobAll = useSelector((state) => state.jobAll.jobAll);
    useEffect(() => {
        dispatch(getAllJob()); // Gọi hàm getAllJob và truyền token vào
    }, []);
    const { jobId } = useParams();
    return (
        <div className='aboutJob' >
            {
                <div className='containerJob'>
                    <div className="searchJob">
                        <form>
                            <input placeholder="Tìm kiếm việc làm, công ty, kỹ năng"></input>
                            <span>
                                <SearchOutlined></SearchOutlined>
                            </span>
                        </form>
                    </div>
                    <div className='panel-group'>
                        <div className='panel-body'>
                            {jobAll && jobAll.map((item) => (
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
                                                        {/* <li>+2</li> */}
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
            }
        </div>
    )
}

export default AboutJob
