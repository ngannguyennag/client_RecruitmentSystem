import React, { useEffect } from 'react'
import job1 from './images/job1.png'
import job2 from './images/job2.png'
import job3 from './images/job3.png'
import job4 from './images/job4.png'
import job5 from './images/job5.png'
import job6 from './images/job6.png'
import job7 from './images/job7.png'
import job8 from './images/job8.png'
import {Link} from "react-router-dom";
import {
    SearchOutlined
} from "@ant-design/icons";
import './AboutJob.css'

const AboutJob = () => {
    return (
        <div className='aboutJob' >
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
                        <div id="job-card-listing">
                                <div className='company-list'>
                                    <img src={job1} alt='job1' />
                                    <div className="about-job">
                                            <Link to='/detail_jobs'> <h3>[Đông Anh - Hà Nội] Thủ kho</h3></Link>
                                        <h4>
                                            Công Ty Cổ Phần Đầu Tư Và Xuất Bản Giáo Dục
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>Thương lượng </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay
                                            <ul className='list-job-item'>
                                                <li>Xuất Nhập Hàng Hóa </li>
                                                <li>Thủ Kho Thành Phẩm </li>
                                                <li>Quản Lý Kho Hàng </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div className='company-list'>
                                    <img src={job2} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Chuyên Viên Kinh Doanh
                                        </h3>
                                        <h4>
                                            1C Vietnam LLC
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>Thương Lượng </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Kinh Doanh </li>
                                                <li>B2B Sales </li>
                                                <li>Phần Mềm Kế Toán</li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                          
                                <div className='company-list'>
                                    <img src={job3} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Mechanical Design Engineer
                                        </h3>
                                        <h4>
                                            Công Ty TNHH Varroc VIỆT NAM
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>Thương Lượng </li>
                                                <li>| Hà Nội, Vĩnh Phúc</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Mechanical Design </li>
                                                <li>CAD </li>
                                                <li>3D </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='company-list'>
                                    <img src={job4} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Giám Đốc Vận Hành Sản Phẩm - Tiếng Trung HSK 5 6
                                        </h3>
                                        <h4>
                                            Xing Yun Cloud Viet Nam
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>$1300 - $2700 </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Vận Hành </li>
                                                <li>E-commerce </li>
                                                <li>Livestream </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-list'>
                                    <img src={job5} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Senior Backend Engineer (Java)
                                        </h3>
                                        <h4>
                                            One Mount
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>$1200 - $2500 </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Spring </li>
                                                <li>Java</li>
                                                <li>MicroService </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-list'>
                                    <img src={job6} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                           Chuyên Viên Mua Hàng
                                        </h3>
                                        <h4>
                                            Công Ty Cổ Phần Liên Doanh Ô Tô Hyundai Thành Công Việt Nam
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>Thương Lượng </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Mua Hàng </li>
                                                <li>Purchasing</li>
                                                <li>Xuất Nhập Khẩu </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-list'>
                                    <img src={job7} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Chuyên Viên Quản Lý Danh Mục Khách Hàng (Khối Khách Hàng Doanh Nghiệp)
                                        </h3>
                                        <h4>
                                            Techcombank
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>Thương Lượng </li>
                                                <li>| Hà Nội, Hồ Chí Minh</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Thanh Toán Điện Tử</li>
                                                <li>Tư Vấn Khách Hàng </li>
                                                <li>Giao Tiếp </li>
                                                <li>+2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='company-list'>
                                    <img src={job8} alt='job1' />
                                    <div className="about-job">
                                        <h3>
                                            Chuyên Gia Chính Sách Nhân Sự
                                        </h3>
                                        <h4>
                                            Ngân Hàng TMCP Đại Chúng Việt Nam
                                        </h4>
                                        <div className='about-job-item'>
                                            <ul>
                                                <li className='negotiate'>$800 - $1500 </li>
                                                <li>| Hà Nội</li>
                                            </ul>
                                        </div>
                                        <div className='about-list-job-item'>
                                            Hôm nay |
                                            <ul className='list-job-item'>
                                                <li>Ngân Hàng </li>
                                                <li>Chính Sách Nhân Sự </li>
                                                <li>Nhân Sự </li>
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
    )
}

export default AboutJob
