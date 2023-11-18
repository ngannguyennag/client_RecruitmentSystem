import React, { useEffect } from 'react'
import job1 from './images/job1.png'
import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'
import { Link } from "react-router-dom";
import './DetailJob.css'
import {
    SearchOutlined, DashboardOutlined, DollarOutlined, ContactsOutlined, EnvironmentOutlined
} from "@ant-design/icons";
const DetailJob = () => {
    return (
        <div className='detail-job' >
            <div className='tab-job'>
                <div className="searchJob">
                    <form>
                        <input placeholder="Tìm kiếm việc làm, công ty, kỹ năng"></input>
                        <span>
                            <SearchOutlined></SearchOutlined>
                        </span>
                    </form>
                </div>
                <div className='company-list'>
                    <img src={job1} alt='job1' />
                    <div className="detail-job-list">
                        <Link to='/detail_jobs'> <h2>[Đông Anh - Hà Nội] Thủ kho</h2></Link>
                        <h4>
                            Công Ty Cổ Phần Đầu Tư Và Xuất Bản Giáo Dục
                        </h4>
                        <div className='detail-job-item'>
                            <ul>
                                <li className='negotiate'>Thương lượng </li>
                                <li>| Hà Nội</li>
                            </ul>
                        </div>
                        <div className='detail-list-job-item'>
                            Hôm nay
                            <ul className='list-job-item'>
                                <li>Xuất Nhập Hàng Hóa </li>
                                <li>Thủ Kho Thành Phẩm </li>
                                <li>Quản Lý Kho Hàng </li>
                                <li>+2</li>
                            </ul>
                        </div>
                        <div className='job-button'>
                            Nộp Đơn
                        </div>
                    </div>
                </div>
                <div className='mobile-box'>
                    <div className='mobile-box-list'>
                        <h2>THÔNG TIN</h2>
                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon1} alt='icon1' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    NGÀY ĐĂNG TUYỂN
                                </span>
                                <span className='content'>
                                    10/11/2023
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon2} alt='icon2' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    CẤP BẬC
                                </span>
                                <span className='content'>
                                    Nhân viên
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon3} alt='icon3' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    NGÀNH NGHỀ
                                </span>
                                <span className='content'>
                                    Hậu Cần/Xuất Nhập Khẩu/Kho Bãi/Quản Lý Kho & Phân Phối
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon4} alt='icon4' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    LĨNH VỰC
                                </span>
                                <span className='content'>
                                    Giáo dục/Đào Tạo
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon5} alt='icon5' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    KỸ NĂNG
                                </span>
                                <span className='content'>
                                    Xuất Nhập Hàng Hóa, Thủ Kho Thành Phẩm, Quản Lý Kho Hàng, Quản Lý Kho, Báo Cáo Tồn Kho
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-box'>
                                <span className='icon'><img src={icon6} alt='icon6' /></span>
                            </div>
                            <div className='row-content'>
                                <span className='content-label'>
                                    NGÔN NGỮ TRÌNH BÀY HỒ SƠ
                                </span>
                                <span className='content'>
                                    Tiếng Việt
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='mobile-box-list'>
                        <h2>CÁC PHÚC LỢI DÀNH CHO BẠN </h2>
                        <div className='row-item'>
                            <div className='row-icon'>
                                <DollarOutlined />
                            </div>
                            <div className='row-content'>
                                <span className='content'>
                                    Thưởng sinh nhật, tất cả, các ngày lễ, Tết theo quy định, thưởng tháng lương 13, 14,15,16
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-icon'>
                                <ContactsOutlined />
                            </div>
                            <div className='row-content'>
                                <span className='content'>
                                    Bảo hiểm nhân thọ; bảo hiểm xã hội theo quy định đối với CBNV gắn bó lâu dài với công ty
                                </span>
                            </div>
                        </div>

                        <div className='row-item'>
                            <div className='row-icon'>
                                <DashboardOutlined />
                            </div>
                            <div className='row-content'>
                                <span className='content'>
                                    Thời gian làm việc thừ thứ 2 đến thứ 6
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='mobile-box-list'>
                    <h2>
                        MÔ TẢ CÔNG VIỆC
                    </h2>
                    <div className='job-description'>
                        <p>
                            - Phân công nhiệm vụ cho các nhân viên kho; chịu trách nhiệm trước Ban Giám đốc và Trưởng phòng về việc quản lý số lượng, chất lượng hàng hóa trong kho trên tất cả các công đoạn từ lúc chuyển hàng vào kho, xuất hàng ra khỏi kho, thống kê số liệu hàng tồn kho.
                        </p>
                        <p>
                            - Căn cứ kế hoạch nhập - xuất hàng hóa của Phòng Kinh doanh, Phòng Dự án để lên kế hoạch phân công nhân sự, chịu trách nhiệm sắp xếp mặt bằng kho hợp lý đảm bảo thuận lợi cho công tác nhập - xuất hàng.
                        </p>
                        <p>
                            - Báo cáo về tiến độ bàn giao hàng hóa cho bộ phận đề nghị xuất hàng và Trưởng phòng để theo dõi quá trình vận chuyển hàng hóa, tiếp nhận kịp thời phản ánh của khách hàng để xử lý các vấn đề thừa, thiếu sản phẩm hoặc hàng hóa không đạt chất lượng…
                        </p>
                        <p>
                            - Định kỳ hàng tháng/Quý thực hiện kiểm tra lại các kệ hàng, đặc biệt là tình trạng những hàng hóa có thời gian lưu kho dài chưa xuất.
                        </p>
                        <p>
                            - Lập báo cáo nhập, xuất, tồn hàng hóa định kì. Đối chiếu số liệu hàng hóa với kế toán kho.
                        </p>
                        <p>
                            - Báo cáo kịp thời, đầy đủ, chính xác các thông tin liên quan đến công việc cho Trưởng phòng hoặc Ban Giám đốc (khi có yêu cầu).
                        </p>
                        <p>
                            - Phân công nhân sự thực hiện các công việc khác bao gồm: Bốc xếp hàng hóa và vận chuyển các đơn hàng lẻ
                        </p>
                        <p>
                            - Đi công tác và thực hiện các nhiệm vụ khác theo sự phân công của Trưởng phòng và theo yêu cầu công việc.
                        </p>
                    </div>
                </div>

                <div className='mobile-box-list'>
                    <h2>
                        YÊU CẦU CÔNG VIỆC
                    </h2>
                    <div className='job-description'>
                        <p>
                            ** Yêu Cầu:
                        </p>
                        <p>
                            - Tốt nghiệp Đại học, Cao đẳng trở lên;
                        </p>
                        <p>
                            - Có kinh nghiệm từ 2 năm trở lên với vị trí tương đương;
                        </p>
                        <p>
                            - Ưu tiên ứng viên có kinh nghiệm làm việc trong ngành in ấn, xuất bản;                        </p>
                        <p>
                            - Có kĩ năng quản lý, lập kế hoạch;                        </p>
                        <p>
                            - Trung thực, nhanh nhẹn, tư duy tốt, chịu được áp lực công việc;
                        </p>
                        <p>
                            - Kỹ năng tin học văn phòng (Word, Excel) cơ bản.
                        </p>
                        <p>
                            - Ưu tiên giới tính Nam.
                        </p>
                        <p>
                            ** Quyền Lợi:
                        </p>
                        <p>
                            - Thời gian làm việc thừ thứ 2 đến thứ 6
                        </p>
                        <p>
                            - Thưởng sinh nhật, tất cả các ngày lễ, Tết theo quy định, thưởng 4 tháng lương tùy thuộc vào tình hình sản xuất kinh doanh và hiệu quả công việc
                        </p>
                        <p>
                            - Bảo hiểm nhân thọ đối với CBNV gắn bó lâu dài với công ty....
                        </p>
                        <p>
                            - Đóng Bảo hiểm xã hội theo quy định
                        </p>
                        <p>
                            - Lương từ 12 - 20 triệu (thỏa thuận theo năng lực).
                        </p>
                    </div>
                </div>

                <div className='mobile-box-list'>
                    <h2>
                        ĐỊA ĐIỂM CÔNG VIỆC
                    </h2>
                    <div className='job-address'>
                        <div className='row-icon'>
                        <EnvironmentOutlined />
                        </div>
                    Đông Anh, Hà Nội, Việt Nam
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailJob
