import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import store from '../../../../store'; import { useHistory } from 'react-router-dom';
import { Menu, Form, Input, Upload, Button, Select, Avatar } from 'antd';
import { IdcardOutlined, FileImageOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
export default function HRFileCompany(props) {
  const [current, setCurrent] = useState('basic-info'); const history = useHistory();
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL
  const users = useSelector(state => state.getAccountInfo.user);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file.originFileObj);
      setAvatarUrl(imageUrl);
    } else {
      setAvatarUrl(null); // Xóa ảnh đại diện hiện tại
    }
  };
  const BasicInfoForm = () => {
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      if (e && e.fileList) {
        return e.fileList;
      }
      return [];
    };
    if (!users) {
      return null; // Render nothing or a loading indicator until the users data is loaded
    }
    
    return (
      <Form onFinish={handleSubmit} className='formHR' style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }}>
        <div className="fileCompany" >
          <span className='titleCompany' style={{ margin: "20px 0 0 70px" }}>
            Thông tin cơ bản
          </span>
          <div className='avatarHR' >
            <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={normFile} >
              <Upload onChange={(info) => handleImageUpload(info.file)} showUploadList={false}>
                {avatarUrl ? (
                  <Avatar size={64} src={avatarUrl} style={{ marginTop: '100px', borderColor: 'blue', border: '13px solid', cursor: 'pointer', width: '200px', height: '200px' }} />
                ) : (
                  <div>
                    <div className="sidebarHR-top">
                      <i className="accountHR">
                        <img src={users.imgUrl} alt="avatar" style={{ marginTop: '100px', border: ' blue 3px', cursor: 'pointer' }} />
                      </i>
                    </div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className='formBasicInfoCompany' style={{ backgroundColor: 'white', display: 'flex', flexWrap: 'wrap' }}>
            <Form.Item name="abbreviation" className="form-item" style={{ margin: '20px 60px 0 25px', width: '30%' }}>
              <label htmlFor="abbreviation" className="form-label" style={{ fontWeight: '500', marginRight: '180px' }} >Tên viết tắt *</label>
              <input id="abbreviation" className="form-input" type="text" style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
            </Form.Item>
            <Form.Item name="fullName" className="form-item" style={{ margin: '20px 40px 0 0', width: '55%' }}>
              <label htmlFor="fullname" className="form-label" style={{ fontWeight: '500' ,marginRight: '400px'}}>Tên đầy đủ *</label>
              <input id="fullname" className="form-input" type="text" style={{ borderRadius: '5px', backgroundColor: '#e6f7ff', flex: '1' }} />
            </Form.Item>
            <Form.Item name="industry" className="form-item" style={{ margin: '20px 60px 0 25px', width: '55%' }}>
              <label htmlFor="industry" className="form-label" style={{ fontWeight: '500' ,marginRight: '350px'}}>Lĩnh vực hoạt động *</label>
              {/* <input style={{ borderRadius: '15px', borderColor:'blue' }}> */}
              <Select >
                <Select.Option value="demo" >Dịch vụ môi trường/Chất thải</Select.Option>
                <Select.Option value="demo">Giáo dục/Đào Tạo</Select.Option>
                <Select.Option value="demo">Hoá chất/Hoá sinh</Select.Option>
                <Select.Option value="demo">Hàng tiêu dùng</Select.Option>
                <Select.Option value="demo">Hậu cần/Giao nhận</Select.Option>
              </Select>
              {/* </input> */}
            </Form.Item>
            <Form.Item name="establishedYear" className="form-item" style={{ margin: '20px 40px 0 0', width: '30%' }}>
              <label htmlFor="establishedYear" className="form-label" style={{ fontWeight: '500',marginRight: '160px' }}>Năm thành lập *</label>
              <input id="establishedYear" className="form-input" type="text" style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
            </Form.Item>
            <Form.Item name="countEmployee" className="form-item" style={{ margin: '20px 60px 0 25px', width: '42.5%' }}>
              <label htmlFor="countEmployee" className="form-label" style={{ fontWeight: '500',marginRight: '250px' }}>Số lượng nhân sự  *</label>
              <input id="countEmployee" className="form-input" type="text" style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
            </Form.Item>
            <Form.Item name="taxCode" className="form-item" style={{ margin: '20px 40px 0 0', width: '42.5%' }}>
              <label htmlFor="taxCode" className="form-label" style={{ fontWeight: '500' ,marginRight: '290px'}}>Mã số thuế *</label>
              <input id="taxCode" className="form-input" type="text" style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
            </Form.Item>
            <Form.Item  label="Giấy phép kinh doanh  *" name="business" valuePropName="fileList" getValueFromEvent={normFile} style={{ margin: '20px 0 0 25px', width: '100%', fontWeight: '500' }}>
              <label htmlFor="business" className="form-label" ></label>
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8, }}> Upload </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item className="form-item" style={{ width: '10%', marginLeft: '25px' }} >
              <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' }}>Lưu</Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    );
  };

  const ImageDescriptionForm = () => {
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
      <div className='formImageCompany' style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }} >
        <Form onFinish={handleSubmit} style={{ padding: '40px 40px 30px 25px' }}>
          <Form.Item label="Hình ảnh và mô tả" valuePropName="fileList" getValueFromEvent={normFile} style={{ fontWeight: '500', }}>
            <Upload action="/upload.do" listType="picture-card" style={{ backgroundColor: '#e6f7ff' }}>
              <div >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}> Upload </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Giới thiệu công ty (tối đa 5000 từ)" name="description" style={{ fontWeight: '500' }}>
            <TextArea rows={8} style={{ backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '10%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
        </Form>
      </div>

    );
  };
  const MediaAndSocialForm = () => {
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
        <div className='FormMediaSocialCompany' style={{padding:'35px'}}>
          
          <div className='titleMedia' style={{fontSize:'22px', fontWeight:'700'}}>
            Truyền thông và mạng xã hội
          </div>

            <Form.Item label="Số điện thoại liên hệ" name="phone" style={{ fontWeight: '500', marginTop: '20px' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item label="Email liên hệ " name="email" style={{ fontWeight: '500' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item label="Facebook" name="Facebook" style={{ fontWeight: '500' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item label="Twitter" name="Twitter" style={{ fontWeight: '500' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item label="Instargram" name="Linkedlin" style={{ fontWeight: '500' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item label="Website" name="website" style={{ fontWeight: '500' }}>
              <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '12%', borderRadius: '5px' }}>Lưu</Button>
            </Form.Item>
        </div>

      </Form>

    );
  };
  const AddressForm = () => {
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };
    return (
      <Form onFinish={handleSubmit} style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }}>
        <div className='FormAddressCompany' style={{padding:'35px' }}>
        <div className='titleAddress' style={{fontSize:'22px', fontWeight:'700'}}>
          Địa chỉ công ty
        </div>
          <Form.Item label="Tỉnh / thành phố *" name="tinh" style={{ fontWeight: '500' , marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Quận / huyện *" name="huyen" style={{ fontWeight: '500' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Phường / xã *" name="huyen" style={{ fontWeight: '500' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item label="Số nhà và tên đường" name="sonha" style={{ fontWeight: '500' }}>
            <Input style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '12%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
        </div>
        
      </Form>
    );
  };
  return (
    <>
      <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="basic-info" icon={<IdcardOutlined />} style={{ fontWeight: '500' , marginLeft:'25px'}}>
          Thông tin cơ bản
        </Menu.Item>
        <Menu.Item key="image-description" icon={<FileImageOutlined />} style={{ fontWeight: '500' }}>
          Hình ảnh & mô tả
        </Menu.Item>
        <Menu.Item key="media-socialnetwork" icon={<IdcardOutlined />} style={{ fontWeight: '500' }}>
          Truyền thông và mạng xã hội
        </Menu.Item>
        <Menu.Item key="address" icon={<IdcardOutlined />} style={{ fontWeight: '500' }}>
          Địa chỉ liên hệ
        </Menu.Item>
        {/* Add other menu items here */}
      </Menu>
      {current === 'basic-info' && <BasicInfoForm />}
      {current === 'image-description' && <ImageDescriptionForm />}
      {current === 'media-socialnetwork' && <MediaAndSocialForm />}
      {current === 'address' && <AddressForm />}
    </>
  );
}
const mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <HRFileCompany />
  </Provider>,
  mountNode
);