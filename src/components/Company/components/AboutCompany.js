import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import {
    SearchOutlined, CreditCardOutlined
} from "@ant-design/icons";
import './AboutCompany.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompany } from "../../../actions/CompanyAction";
import { useParams } from "react-router-dom"
const AboutCompany = () => {
    const dispatch = useDispatch();
    const companyAll = useSelector((state) => state.companyAll.companyAll);
    useEffect(() => {
        dispatch(getAllCompany()); // Gọi hàm getAllCompany và truyền token vào
    }, []);
    const { companyId } = useParams();
    return (
        <div>
            <div className='titleAboutCompany'>
                <h2>Tìm kiếm doanh nghiệp</h2>
                <p>Trang chủ / Doanh nghiệp</p>
            </div>
            <div className='aboutCompany' >
                {
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
                                    <div id="company-card-listing">
                                        <div className='company-list'>
                                            <img src={item.companyLogo} alt='company1' />
                                            <div className="about-company">
                                                <h4>  <Link to={`/detail_companies/${item.companyId}`}>  {item.companyFullName} </Link></h4>
                                                <div className='about-list-company-item'>
                                                    <ul>
                                                        <li className='negotive'> <CreditCardOutlined />Lĩnh vực {item.companyIndustry.industryNameVI} </li>
                                                        <div className='buttonCompany'>
                                                        <Link to="/company"><button>Việc mới</button></Link>
                                                        </div>
                                                    </ul>
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
        </div>
    )
}
export default AboutCompany
