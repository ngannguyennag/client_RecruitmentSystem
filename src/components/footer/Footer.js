import React from 'react';
import './Footer.css'


function Footer(props) {
    return (
        <section id="footer">
            <div className="footer">
                <div className="footer-top">
                    {/* <div className="footer-top-name">
                        <h2>AMJ Work</h2>
                    </div> */}
                    <div className="footer-top-about">
                        <h2>ANJWork </h2>
                        <ul>
                            <li>
                                <a>Về Chúng Tôi</a>
                            </li>
                            <li>
                                <a>Liên hệ</a>
                            </li>
                            <li>
                                <a>Hỏi đáp</a>
                            </li>
                            <li>
                                <a>Thỏa thuận sử dụng</a>
                            </li>
                            <li>
                                <a>Quy định bảo mật</a>
                            </li>
                            
                            <li>
                                <a><img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664"></img></a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-top-sp">
                        <h2>Dành cho nhà tuyển dụng</h2>
                        <ul>
                            <li>
                                <a>Đăng tuyển dụng</a>
                            </li>
                            <li>
                                <a>Tìm kiếm hồ sơ</a>
                            </li>
                            <li>
                                <a>Sản phẩm dịch vụ khác</a>
                            </li>
                            <li>
                                <a>Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-top-des1">
                        <h2>Việc Làm theo Khu vực</h2>
                        <ul>
                            <li>
                                <a>Hà Nội</a>
                            </li>
                            <li>
                                <a>Hồ Chí Minh</a>
                            </li>
                            <li>
                                <a>Đà Nẵng</a>
                            </li>
                            <li>
                                <a>Hà Nam</a>
                            </li>
                            <li>
                                <a>Cần Thơ</a>
                            </li>
                            <li>
                                <a>Xem tất cả khu vực {'>'} </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-top-des2">
                        <h2>Việc Làm theo ngành nghề</h2>
                        <ul>
                            <li>
                                <a>Điện tử - viễn thông</a>
                            </li>
                            <li>
                                <a>IT</a>
                            </li>
                            <li>
                                <a>Cơ khí</a>
                            </li>
                            <li>
                                <a>Tự động hóa</a>
                            </li>
                            <li>
                                <a>Cơ điện tử</a>
                            </li>
                            <li>
                                <a>Tìm việc làm{'>'} </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bot">
                    <p>Copyright © 2023. Công ty cổ phần ANJWork Việt Nam</p>
                    <p>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                </div>
            </div>
        </section>
    );
}

export default Footer;