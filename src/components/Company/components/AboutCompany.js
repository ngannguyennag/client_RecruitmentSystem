import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {
    SearchOutlined, CreditCardOutlined
} from "@ant-design/icons";
import './AboutCompany.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompany } from "../../../actions/CompanyAction";

const AboutCompany = () => {
    const dispatch = useDispatch();
    const companyAll = useSelector((state) => state.companyAll.companyAll);
    useEffect(() => {
        dispatch(getAllCompany()); // Gọi hàm getAllCompany và truyền token vào
    }, []);
    return (
        <div>
            <div className='titleAboutCompany'>
                <h2>Tìm kiếm doanh nghiệp</h2>
                <p>Trang chủ / Doanh nghiệp</p>
            </div>
            <div className='aboutJob' >
                <div className='containerJob'>
                    <div className="searchJob" >
                        <form>
                            <input placeholder="Tìm kiếm theo tên công ty"></input>
                            <span>
                                <SearchOutlined></SearchOutlined>
                            </span>
                        </form>
                        <div className='dropdown'>
                        <select>
                            <option value='option1'>Tất cả lĩnh vực hoạt động</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </select>
                    </div>
                    </div>
                    
                    <div className='panel-group'>
                        <div className='panel-body'>
                            {companyAll && companyAll.map((item) => (
                                <div id="job-card-listing">
                                    <div className='companyList'>
                                        <img src={item.companyLogo} alt='job1' />
                                        <div className="about-company">
                                            <div className='fullNameCompany' style={{fontWeight:'500' }}>
                                                <Link to='/detail_companies'  style={{color: 'black'}}>  {item.companyFullName} </Link>
                                            </div>

                                            <h4><CreditCardOutlined /> Lĩnh vực {item.industry.industryNameVI}</h4>
                                            <div className='buttonCompany'>
                                                <Link to="/company"><button>Việc mới</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutCompany
