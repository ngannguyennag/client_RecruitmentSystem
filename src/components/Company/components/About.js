import React from 'react'
import job1 from './images/job1.png'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='containerJob'>
                <div className='panel-group'>
                    <div className='panel-body'>
                        <h2> "We Have 4 Jobs For You"</h2>
                        <div id="job-card-listing">
                            <div>
                                <div className='company-list'>
                                    <img src={job1} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Chuyên Viên Giao Dịch Ngoại Tệ Phái Sinh Cấp 1 (Ban Kinh Doanh Vốn và Tiền Tệ - Trụ Sở Chính BIDV)
                                        </h3>
                                        <h4>
                                            Ngân Hàng TMCP Đầu Tư và Phát Triển Việt Nam
                                        </h4>
                                        <div className='detail-job-item'>
                                            <ul>
                                                <li className='negotiate'>Negotiate </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='detail-list-job-item'>
                                            Updated 11/11/2023 |
                                            <ul className='list-job-item'>
                                                <li>Giao dịch ngoại tệ </li>
                                                <li>Tài chính ngân hàng </li>
                                                <li>Mua bán ngoại tệ </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='company-list'>
                                    <img src={job1} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Chuyên Viên Quản Lý Tài Sản( Trung Tâm Khách Hàng Cá Nhân Cao Cấp - Trụ Sở Chính BIDV)
                                        </h3>
                                        <h4>
                                            Ngân Hàng TMCP Đầu Tư và Phát Triển Việt Nam
                                        </h4>
                                        <div className='detail-job-item'>
                                            <ul>
                                                <li className='negotiate'>Negotiate </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='detail-list-job-item'>
                                            Today |
                                            <ul className='list-job-item'>
                                                <li>Tài chính ngân hàng </li>
                                                <li>Quản Lí Tài Sản </li>
                                                <li>Tư Vấn Đầu Tư</li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='company-list'>
                                    <img src={job1} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Trưởng Phòng Quản Lý Khách Hàng( Trung Tâm KH Cá Nhân Cao Cấp - Trụ Sở Chính)
                                        </h3>
                                        <h4>
                                            Ngân Hàng TMCP Đầu Tư và Phát Triển Việt Nam
                                        </h4>
                                        <div className='detail-job-item'>
                                            <ul>
                                                <li className='negotiate'>Negotiate </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='detail-list-job-item'>
                                            Today |
                                            <ul className='list-job-item'>
                                                <li>Dịch Vụ Ngân Hàng </li>
                                                <li>Quản Trị Rủi Ro </li>
                                                <li>Tài Chính Ngân Hàng </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='company-list'>
                                    <img src={job1} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Trưởng Phòng Khách Hàng Ưu Tiên - BIDV Chi Nhánh Bắc Giang
                                        </h3>
                                        <h4>
                                            Ngân Hàng TMCP Đầu Tư và Phát Triển Việt Nam
                                        </h4>
                                        <div className='detail-job-item'>
                                            <ul>
                                                <li className='negotiate'>Negotiate </li>
                                                <li>| Bắc Giang</li>
                                            </ul>
                                        </div>
                                        <div className='detail-list-job-item'>
                                            Posted 3 dáy ago |
                                            <ul className='list-job-item'>
                                                <li>Tài Chính Ngân Hàng </li>
                                                <li>Khách Hàng Cá Nhân </li>
                                                <li>Quản Lý </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
