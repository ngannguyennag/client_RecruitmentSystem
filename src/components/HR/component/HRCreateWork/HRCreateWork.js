import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Form, Input, Upload, Button, Select } from 'antd';
import { IdcardOutlined, FileImageOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
export default function HRCreateWork() {
  const [current, setCurrent] = useState('basic-info');
//   const handleMenuClick = (e) => {
//     setCurrent(e.key);
//   };
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    return (
      <Form onFinish={handleSubmit} style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }}>
        <div className='FomrTitleCreateWork' style={{padding:'35px'}}>

        <div className='titleCreateWork' style={{fontSize:'26px', fontWeight:'700'}}>
          Tạo công việc
        </div>

          <h5> Bắt đầu đăng tin tuyển dụng. Lưu ý, những tin tuyển dụng không thiết lập ngày hết hạn sẽ tự động đóng sau 3 tháng</h5>
          <Form.Item label="Tên công việc *" name="workname" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Loại công việc *" name="optionwork" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="demo">Thực tập</Select.Option>
              <Select.Option value="demo">Bán thời gian</Select.Option>
              <Select.Option value="demo">Toàn thời gian</Select.Option>
              <Select.Option value="demo">Việc làm online</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngành nghề *" name="career" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Select>
              <Select.Option value="demo">Dịch vụ môi trường/Chất thải</Select.Option>
              <Select.Option value="demo">Giáo dục/Đào Tạo</Select.Option>
              <Select.Option value="demo">Hoá chất/Hoá sinh</Select.Option>
              <Select.Option value="demo">Hàng tiêu dùng</Select.Option>
              <Select.Option value="demo">Hậu cần/Giao nhận</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Học vấn tối thiểu *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="demo">Không yêu cầu</Select.Option>
              <Select.Option value="demo">Cử nhân</Select.Option>
              <Select.Option value="demo">Kỹ sư</Select.Option>
              <Select.Option value="demo">Thạc sĩ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Kinh nghiệm *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="demo">Chưa có kinh nghiệm</Select.Option>
              <Select.Option value="demo">Dưới 1 năm</Select.Option>
              <Select.Option value="demo">1 năm</Select.Option>
              <Select.Option value="demo">Trên 5 năm</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Giới tính *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="demo">Không yêu cầu</Select.Option>
              <Select.Option value="demo">Nam</Select.Option>
              <Select.Option value="demo">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Số lượng tuyển " name="count" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input  style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Cần gấp nhân viên *" name="hurry" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="demo">Có</Select.Option>
              <Select.Option value="demo">Không</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày hết hạn " name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Hình thức trả lương *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Mức lương tối thiểu(đồng/tháng) *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Mức lương tối đa(đồng/tháng) *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Mô tả(tối đa 3000 từ) *" name="establishedYear" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Giấy phép kinh doanh *" name="establishedYear" valuePropName="fileList" getValueFromEvent={normFile} style={{ fontWeight: '500', marginTop: '20px' }}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8, }}> Upload </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '10%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
        </div>
      </Form>
    );
  }; 

const mountNode = document.getElementById('root');
ReactDOM.render(<HRCreateWork />, mountNode);