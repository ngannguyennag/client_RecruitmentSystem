import React from 'react'
import './Demo.css'
import stories from './images/stories.jpg'

const Demo = () => {
    return (
        <div className='demo' id='demo'>
            <h2>Our Story</h2>
            <span className='line'></span>
            <div className='containerDemo'>
                <div className='col-2'>
                    <iframe width='670' height='420' src='https://www.youtube.com/embed/oeqP5JtihMA' title='Youtube video player' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div className='col-1'>
                    <div className="custom-item-content">
                        <h3>SỨ MỆNH, TẦM NHÌN, GIÁ TRỊ CỐT LÕI</h3>
                        <p>
                            <b>Sứ Mệnh: </b>
                            "BIDV đem lại lợi ích, tiện ích tốt nhất cho khách hàng, cổ đông, người lao động và cộng đồng xã hội."
                        </p>
                        <p>
                            <b>Tầm Nhìn: </b>
                            "Là định chế tài chính hàng đầu khu vực Đông Nam Á, có nền tảng số tốt nhất Việt Nam , phấn đấu thuộc nhóm 100 Ngân hàng lớn nhất khu vực Châu Á."
                        </p>
                        <p>
                            <b>Giá Trị Cốt Lõi: </b>
                            "Trí tuệ - Niềm tin - Liêm chính - Chuyên nghiệp - Khát vọng."
                        </p>
                    </div>
                </div>
            </div>
            <div className='containerDemo'>

                <div className='col-1'>
                    <div className="custom-item-content">
                        <h3>VĂN HÓA DOANH NGHIỆP</h3>
                        <p>
                            BIDV luôn khẳng định vị thế của một ngân hàng hàng đầu tại Việt Nam trong suốt 65 năm hình thành và phát triển. Và đọng lại đằng sau tất cả những ghi nhận ấy là những giá trị văn hóa mang đậm bản sắc BIDV đã được bồi đắp, đúc kết qua nhiều thế hệ:
                        </p>
                        <p>
                            1. Đó là sự tận tụy và trung thành với lợi ích quốc gia, dân tộc, là sự tiên phong mở lối, dám chấp nhận thách thức để tiến lên.
                        </p>
                        <p>
                            2. Đó là trí tuệ của một tập thể luôn chịu khó và đam mê học hỏi, học tập và cởi mở đón nhận những tri thức mới, công nghệ mới, cách suy nghĩ mới, từ đó vận dụng tri thức để tạo ra những sáng tạo, đổi mới nhằm mang đến những lợi ích và tiện ích cho khách hàng, thúc đẩy xã hội tiến bộ.
                        </p>
                        <p>
                            3. Đó là tấm lòng yêu ngành, yêu nghề thiết tha, trong sáng và hướng thiện. Nhờ vậy mà BIDV đã có một hành trang lịch sử sáng chói, hào hùng, một văn hóa doanh nghiệp vừa truyền thống, vừa hiện đại, riêng có và đậm chất nhân văn.
                        </p>
                        <p>
                            4. Đó là bản lĩnh càng trong gian khó càng vươn lên mạnh mẽ, giống như lửa thử vàng qua biết bao thăng trầm, BIDV đã tôi luyện một tinh thần, bản lĩnh, cốt cách của những người tiên phong. Để mỗi lần gặp những khó khăn tưởng chừng không thể vượt qua, BIDV lại tìm được cách bứt phá đầy sáng tạo, linh hoạt và hiệu quả
                        </p>
                    </div>
                    {/* <button className='button'>Get your free financial analysis</button> */}
                </div>
                <div className='col-2'>
                    <img src={stories} alt='stories' />
                    {/* <iframe width='670' height='420' src='https://www.youtube.com/embed/oeqP5JtihMA' title='Youtube video player' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> */}
                </div>
            </div>
        </div>
    )
}

export default Demo
