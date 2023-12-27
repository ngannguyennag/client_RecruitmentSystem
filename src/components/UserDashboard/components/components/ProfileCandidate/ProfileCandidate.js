import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../../../../../store';
import { Menu, Form, Input, Upload, Button, Select, Avatar } from 'antd';
import { IdcardOutlined, FileImageOutlined, PlusOutlined } from '@ant-design/icons';
import { getIndustry } from '../../../../../actions/CompanyAction';
import { useForm } from "react-hook-form";
import { getAccountInfo } from '../../../../../actions/UserAction';
import {  getProvince, getDistrict, getWards } from '../../../../../actions/CompanyAction';
import './ProfileCandidate.css';

const { TextArea } = Input;
export default function ProfileCandidate(props) {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('basic-info');
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL
  const users = useSelector(state => state.getAccountInfo.user);
  const userSignin = useSelector((state) => state.userSignin.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    if (!users && token) {
      dispatch(getAccountInfo(token));
    }
  }, [dispatch, token, users]);
  const industryData = useSelector((state) => state.getIndustry.industry);
  var industryCompany = "";
  // if (!(users === undefined)) {
  //   console.log(users.industry);
  //   industryCompany = users.industry;
  // }
  const [selectedIndustry, setSelectedIndustry] = useState(""); // Khởi tạo giá trị rỗng
  useEffect(() => {
    setSelectedIndustry(industryCompany);
  }, [industryCompany]); // Đặt industryCompany là dependency của useEffect
  useEffect(() => {
    dispatch(getIndustry());
  }, []);
  const IndustrySelector = ({ onSelectIndustry }) => (
    <select
      value={selectedIndustry}
      onChange={(e) => onSelectIndustry(e.target.value)}>
      <option value="">Chọn lĩnh vực hoạt động</option>
      {industryData && industryData.length > 0 ? (
        industryData.map((industry) => (
          <option value={industry.id} key={industry.id}>
            {industry.nameVI}
          </option>
        ))
      ) : null}
    </select>
  );
  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file.originFileObj);
      setAvatarUrl(imageUrl);
    } else {
      setAvatarUrl(null); // Xóa ảnh đại diện hiện tại
    }
  };
  const BasicInfoForm = () => {
    const { register, formState: { errors } } = useForm();

    const FormatDate = (time) => {
      if (time && Array.isArray(time)) {
        const date = new Date(Date.UTC(...time));
        const dateString = date.toISOString().split('T')[0];
        return dateString;
      } else {
        return null;
      }
    };
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
      return null;
    }
    return (
      <Form style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }} className='formHR'>
        <div className="fileCompany" style={{ padding: '35px' }}>
          <div className='titleUser' style={{ fontSize: '24px', fontWeight: '700' }}>
            Thông tin cơ bản
          </div>
          <div className='avatarHR' >
            <Form.Item name="logo" valuePropName="fileList" getValueFromEvent={normFile} >
              <Upload onChange={(info) => handleImageUpload(info.file)} showUploadList={false}>
                {avatarUrl ? (
                  <Avatar size={64} src={users.imgUrl} style={{ marginTop: '100px', borderColor: 'blue', border: '13px solid', cursor: 'pointer', width: '200px', height: '200px' }} />
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
          <Form.Item label="Tên đầy đủ * " name="fullName" style={{ fontWeight: '500' }}>
            <Input defaultValue={users && users.fullName} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item label="Công việc/chức vụ * " name="work" style={{ fontWeight: '500' }}>
            <Input defaultValue={users && users.workingHistory[0].jobName} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item label="Ngành nghề * " name="category" style={{ fontWeight: '500' }}>
            <Input defaultValue={users && users.category.name} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item label="Trình độ học vấn * " name="educationLevel" style={{ fontWeight: '500' }}>
            <Input defaultValue={users && users.educationLevel} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item label="Ngày sinh * " name="birthday" style={{ fontWeight: '500' }}>
            <Input defaultValue={FormatDate(users && users.birthday)} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>        
          <Form.Item label="Số điện thoại liên hệ" name="phone" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input defaultValue={users && users.phoneNumber} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <Form.Item label="Email liên hệ " name="email" style={{ fontWeight: '500' }}>
            <Input defaultValue={users && users.email} style={{ borderRadius: '5px', backgroundColor: '#e6f7ff' }} />
          </Form.Item>
          <div className='form-input' style={{fontWeight:'500', fontSize: '14px'}}>Giới tính
            <div className='check'>
              <span>
                <input {...register("gender")} type="radio" value="MALE" defaultChecked={users && users.gender} name="gender" />Male
              </span>
              <span>
                <input {...register("gender")} type="radio" value="FEMALE" defaultChecked={users && users.gender} name="gender" />  Female
              </span>
              <span>
                <input {...register("gender")} type="radio" value="NA" defaultChecked={users && users.gender} name="gender" />  Prefer not to say
              </span>
            </div>
            {errors.gender && <span>This field is required</span>}
          </div>
          <Form.Item className="form-item" style={{ width: '10%', marginLeft: '25px' }} >
            <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
        </div>
      </Form>
    );
  };

  const StudyForm = () => {
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };
    return (
      <Form style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }} className='formHR'>
        <div className="fileCompany" style={{ padding: '35px' }}>
        <h3 className="table-heading" style={{ fontSize: '22px', fontWeight: '700' }}>Lộ trình học tập</h3>
        {users.education.map((educationItem, index) => (
          <div className='detailEducation' key={index}>
            <p style={{fontWeight:'600'}}>{educationItem.startDate} - {educationItem.endDate}: {educationItem.major} ở {educationItem.schoolName}   </p>
            <p style={{color:'grey', textAlign:'left'}}>{educationItem.description}</p>
          </div>
        ))}
      </div>
      <Form.Item className="form-item" style={{ width: '10%', marginLeft: '25px' }} >
            <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
      </Form>
    );
  };
  const ExperienceForm = () => {
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };
    return (
      <Form style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }} className='formHR'>
        <div className="fileCompany" style={{ padding: '35px' }}>
        <h3 className="table-heading" style={{ fontSize: '22px', fontWeight: '700' }}>Kinh nghiệm làm việc</h3>
        {users.workingHistory.map((experienceItem, index) => (
          <div className='detailEducation' key={index}>
            <p style={{fontWeight:'600'}}>{experienceItem.startDate} - {experienceItem.endDate}: Làm {experienceItem.jobName} ở {experienceItem.companyName}</p>
            <p style={{color:'grey', textAlign:'left'}}>{experienceItem.description}</p>
          </div>
        ))}
      </div>
      <Form.Item className="form-item" style={{ width: '10%', marginLeft: '25px' }} >
            <Button type="primary" htmlType="submit" style={{ width: '100%', borderRadius: '5px' , alignItems:'center'}}>Lưu</Button>
          </Form.Item>
      </Form>
    );
  };
  const AddressForm = () => {
    const handleSubmit = (values) => {
      console.log('Submitted values:', values);
    };

    const tinhThanhPhoData = useSelector((state) => state.getProvince.province);
    const huyenQuanData = useSelector((state) => state.getDistrict.district);
    const xaPhuongData = useSelector((state) => state.getWards.wards );
    const [selectedHuyenQuan, setSelectedHuyenQuan] = useState("");
    const [selectedXaPhuong, setSelectedXaPhuong] = useState("");
    var tinhThanhPhoUser = "";
    var huyenQuanUser = "";
    var xaPhuongUser = "";

    if (!(users===undefined)) {
      tinhThanhPhoUser = users.address.provinceCode;
      huyenQuanUser = users.address.districtCode;
      xaPhuongUser = users.address.wardCode;
    }
    const [selectedTinhThanhPho, setSelectedTinhThanhPho] = useState("1");
    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
      setSelectedHuyenQuan(huyenQuanUser);
    }, [huyenQuanUser]);
    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
      setSelectedXaPhuong(xaPhuongUser);
    }, [xaPhuongUser]);
    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
      setSelectedTinhThanhPho(tinhThanhPhoUser);
    }, [tinhThanhPhoUser]);
    useEffect(() => {
      dispatch(getProvince());
    }, []);

    useEffect(() => {
      if (selectedTinhThanhPho) {
        dispatch(getDistrict(selectedTinhThanhPho));
      }
    }, [selectedTinhThanhPho]);
    useEffect(() =>{
      if(selectedHuyenQuan){
        dispatch(getWards(selectedHuyenQuan));
      }
    }, [selectedHuyenQuan]);
    const TinhThanhPhoSelector = ({ onSelectTinhThanhPho }) => (
      <select
        value={selectedTinhThanhPho}
        onChange={(e) => onSelectTinhThanhPho(e.target.value)}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {tinhThanhPhoData && tinhThanhPhoData.length > 0 ? (
          tinhThanhPhoData.map((tinhThanhPho) => (
            <option value={tinhThanhPho.code} key={tinhThanhPho.code}>
              {tinhThanhPho.fullName}
            </option>
          ))
        ) : null}
      </select>
    );

    const HuyenQuanSelector = ({ onSelectHuyenQuan }) => (
      <select
        value={selectedHuyenQuan}
        onChange={(e) => onSelectHuyenQuan(e.target.value)}
      >
        <option value="">Chọn huyện/quận</option>
        {huyenQuanData && huyenQuanData.length > 0 ? (
          huyenQuanData
            .map((huyenQuan) => (
              <option value={huyenQuan.code} key={huyenQuan.code}>
                {huyenQuan.fullName}
              </option>
            ))
        ) : null}
      </select>
    );

    const XaPhuongSelector = ({ onSelectXaPhuong }) => (
      <select
        value={selectedXaPhuong}
        onChange={(e) => onSelectXaPhuong(e.target.value)}
      >
        <option value="">Chọn xã/phường</option>
        {xaPhuongData && xaPhuongData.length > 0 ? (
          xaPhuongData
            .map((xaPhuong) => (
              <option value={xaPhuong.code} key={xaPhuong.code}>
                {xaPhuong.fullName}
              </option>
            ))
        ) : null}
      </select>
    );
    console.log(xaPhuongData);
    return (
      <Form
        onFinish={handleSubmit}
        style={{ margin: " 40px", backgroundColor: "white", borderRadius: "10px" }} >
        <div className="FormAddressCompany" style={{ padding: "35px" }}>
          <div className="titleAddress" style={{ fontSize: "22px", fontWeight: "700" }}>
            Địa chỉ công ty
          </div>
          <div>
            <TinhThanhPhoSelector onSelectTinhThanhPho={setSelectedTinhThanhPho}/>
            <HuyenQuanSelector onSelectHuyenQuan={setSelectedHuyenQuan} />
            <XaPhuongSelector onSelectXaPhuong={setSelectedXaPhuong}/>
          </div>
          <Form.Item
            label="Số nhà và tên đường"
            name="sonha"
            style={{ fontWeight: "500" }}
          >
            <Input
            defaultValue={users && users.address.address}
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "12%", borderRadius: "5px" }}
            >
              Lưu
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  };
  return (
    <>
      <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="basic-info" icon={<IdcardOutlined />} style={{ fontWeight: '500', marginLeft: '25px' }}>
          Thông tin cơ bản
        </Menu.Item>
        <Menu.Item key="study" icon={<IdcardOutlined />} style={{ fontWeight: '500' }}>
          Học tập
        </Menu.Item>
        <Menu.Item key="experience" icon={<IdcardOutlined />} style={{ fontWeight: '500' }}>
          Kinh nghiệm
        </Menu.Item>
        <Menu.Item key="address" icon={<IdcardOutlined />} style={{ fontWeight: '500' }}>
          Địa điểm
        </Menu.Item>
      </Menu>
      {current === 'basic-info' && <BasicInfoForm />}
      {current === 'study' && <StudyForm />}
      {current === 'experience' && <ExperienceForm />}
      {current === 'address' && <AddressForm />}

    </>
  );
}
const mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ProfileCandidate />
  </Provider>,
  mountNode
);