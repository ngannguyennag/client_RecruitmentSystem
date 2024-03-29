import React, { useState, useEffect } from 'react';
import Select1 from "react-select"
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';
import { Form, Input, Button, Select } from 'antd';
import { createWork } from '../../../../actions/JobAction';
import {InputNumber} from 'antd';
import {  getProvince, getDistrict, getWards} from '../../../../actions/CompanyAction';

const { TextArea } = Input;
export default function HRCreateWork() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.createWork.createWork);
  // const userSignin = useSelector((state) => state.userSignin.userInfo);
  // const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const [addressForm] = Form.useForm();
  const token = JSON.parse(localStorage.getItem('userInfo'))?.access_token ;  
    const handleSubmit = (values) => {
      dispatch(createWork(values,token))
    };
    const options = [
      { value: "1", label: "Thực tập" },
      { value: "2", label: "Bán thời gian" },
      { value: "3", label: "Toàn thời gian" },
      { value: "4", label: "Việc làm online" },
    ]
    const skills = [
      { value: "1", label: "html"},
      { value: "2", label: "css"},
      { value: "3", label: "javascript"},
    ]
    // const handleSubmit = (values) => {
    //   console.log('Submitted values:', values);
    // };
    const tinhThanhPhoData = useSelector((state) => state.getProvince.province);
    const huyenQuanData = useSelector((state) => state.getDistrict.district);
    const xaPhuongData = useSelector((state) => state.getWards.wards );
    const [selectedTinhThanhPho, setSelectedTinhThanhPho] = useState("");
    const [selectedHuyenQuan, setSelectedHuyenQuan] = useState("");
    const [selectedXaPhuong, setSelectedXaPhuong] = useState("");
    var tinhThanhPhoCompany = "";
    var huyenQuanCompany = "";
    var xaPhuongCompany = "";

    // if (!(users===undefined)) {
    //   tinhThanhPhoCompany = users.companyAddress.provinceCode;
    //   huyenQuanCompany = users.companyAddress.districtCode;
    //   xaPhuongCompany = users.companyAddress.wardCode;
    // }
    // useEffect(() => {
    //   // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
    //   setSelectedHuyenQuan(huyenQuanCompany);
    // }, [huyenQuanCompany]);
    // useEffect(() => {
    //   // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
    //   setSelectedXaPhuong(xaPhuongCompany);
    // }, [xaPhuongCompany]);
    // useEffect(() => {
    //   // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
    //   setSelectedTinhThanhPho(tinhThanhPhoCompany);
    // }, [tinhThanhPhoCompany]);
    console.log(selectedTinhThanhPho);
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
    // const TinhThanhPhoSelector = ({ onSelectTinhThanhPho }) => (
    //   <select
    //     value={selectedTinhThanhPho}
    //     onChange={(e) => onSelectTinhThanhPho(e.target.value)}
    //   >
    //     <option value="">Chọn tỉnh/thành phố</option>
    //     {tinhThanhPhoData && tinhThanhPhoData.length > 0 ? (
    //       tinhThanhPhoData.map((tinhThanhPho) => (
    //         <option value={tinhThanhPho.code} key={tinhThanhPho.code}>
    //           {tinhThanhPho.name}
    //         </option>
    //       ))
    //     ) : null}
    //   </select>
    // );
    const TinhThanhPhoSelector = ({ onSelectTinhThanhPho }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedTinhThanhPho(selectedValue);
        onSelectTinhThanhPho(selectedValue);
      };
      return (
        <select value={selectedTinhThanhPho} onChange={handleSelectChange} style={{width:'100%', height:'35px'}}>
          <option value="">Chọn tỉnh/thành phố</option>
          {tinhThanhPhoData && tinhThanhPhoData.length > 0
            ? tinhThanhPhoData.map((tinhThanhPho) => (
                <option  value={tinhThanhPho.code}  key={tinhThanhPho.code}>
                  {tinhThanhPho.name}
                </option>
              ))
            : null}
        </select>
      );
    };
    const HuyenQuanSelector = ({ onSelectHuyenQuan }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedHuyenQuan(selectedValue);
        onSelectHuyenQuan(selectedValue);
      };
      return (
        <select value={selectedHuyenQuan} onChange={handleSelectChange} style={{width:'100%', height:'35px'}}>
          <option value="">Chọn huyện/quận</option>
          {huyenQuanData && huyenQuanData.length > 0
            ? huyenQuanData.map((huyenQuan) => (
                <option  value={huyenQuan.code}  key={huyenQuan.code}>
                  {huyenQuan.name}
                </option>
              ))
            : null}
        </select>
      );
    };
    // const HuyenQuanSelector = ({ onSelectHuyenQuan }) => (
    //   <select
    //     value={selectedHuyenQuan}
    //     onChange={(e) => onSelectHuyenQuan(e.target.value)}
    //   >
    //     <option value="">Chọn huyện/quận</option>
    //     {huyenQuanData && huyenQuanData.length > 0 ? (
    //       huyenQuanData
    //         .map((huyenQuan) => (
    //           <option value={huyenQuan.code} key={huyenQuan.code}>
    //             {huyenQuan.name}
    //           </option>
    //         ))
    //     ) : null}
    //   </select>
    // );
    const XaPhuongSelector = ({ onSelectXaPhuong }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedXaPhuong(selectedValue);
        onSelectXaPhuong(selectedValue);
      };
      return (
        <select value={selectedXaPhuong} onChange={handleSelectChange} style={{width:'100%', height:'35px'}}>
          <option value="">Chọn xã/phường</option>
          {xaPhuongData && xaPhuongData.length > 0
            ? xaPhuongData.map((xaPhuong) => (
                <option value={xaPhuong.code} key={xaPhuong.code}>
                  {xaPhuong.name}
                </option>
              ))
            : null}
        </select>
      );
    };
    // const XaPhuongSelector = ({ onSelectXaPhuong }) => (
    //   <select
    //     value={selectedXaPhuong}
    //     onChange={(e) => onSelectXaPhuong(e.target.value)}
    //   >
    //     <option value="">Chọn xã/phường</option>
    //     {xaPhuongData && xaPhuongData.length > 0 ? (
    //       xaPhuongData
    //         .map((xaPhuong) => (
    //           <option value={xaPhuong.code} key={xaPhuong.code}>
    //             {xaPhuong.name}
    //           </option>
    //         ))
    //     ) : null}
    //   </select>
    // );
    // useEffect(() => {
    //   if(token)
    //   dispatch(createWork(token));
    // }, [dispatch, token]);
    // const normFile = (e) => {
    //   if (Array.isArray(e)) {
    //     return e;
    //   }
    //   return e?.fileList;
    // };
    // const create = useSelector((state) => state.createWork);
    return (
      <Form onFinish={handleSubmit} style={{ margin: " 40px", backgroundColor: 'white', borderRadius: '10px' }}>
        <div className='FomrTitleCreateWork' style={{padding:'75px'}}>
        <div className='titleCreateWork' style={{fontSize:'26px', fontWeight:'700'}}>
          Tạo công việc
        </div>
          <h5> Bắt đầu đăng tin tuyển dụng. </h5>
          <Form.Item label="Tên công việc *" name="jobName" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Loại công việc *" name="jobType" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="1">Thực tập</Select.Option>
              <Select.Option value="2">Bán thời gian</Select.Option>
              <Select.Option value="3">Toàn thời gian</Select.Option>
              <Select.Option value="4">Việc làm online</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngành nghề *" name="categoryId" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Select>
              <Select.Option value="1">Dịch vụ môi trường/Chất thải</Select.Option>
              <Select.Option value="2">Giáo dục/Đào Tạo</Select.Option>
              <Select.Option value="3">Hoá chất/Hoá sinh</Select.Option>
              <Select.Option value="4">Hàng tiêu dùng</Select.Option>
              <Select.Option value="5">Hậu cần/Giao nhận</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Học vấn tối thiểu *" name="minEducationLevel" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Kinh nghiệm *" name="jobExperience" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Giới tính *" name="jobGender" style={{ fontWeight: '500', marginTop: '20px' }}>
          <Select>
              <Select.Option value="OTHER">Không yêu cầu</Select.Option>
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="FEMALE">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Số lượng tuyển " name="jobQuantity"  style={{ fontWeight: '500', marginTop: '20px' }}>
            <InputNumber style={{ borderRadius: '5px', width:'100%'}}/>
          </Form.Item>
          <Form.Item label="Ngày hết hạn " name="jobExpiredDate" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Mức lương *" name="jobSalary" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Mô tả(tối đa 3000 từ) *" name="jobDescription" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Yêu cầu *" name="jobRequirement" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Quyền lợi *" name="jobBenefit" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Input style={{ borderRadius: '5px'}}/>
          </Form.Item>
          <Form.Item label="Kỹ năng *" name="jobSkill" style={{ fontWeight: '500', marginTop: '20px' }}>
            <Select1 options={skills} isMulti/>
          </Form.Item>
          {/* <Form onFinish={handleSubmit} style={{ backgroundColor: "white", borderRadius: "10px" }} > */}
          <Form
        form={addressForm}
        onFinish={handleSubmit}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {/* <div className="FormAddressCompany" > */}
          <Form.Item
            name="provinceCode"
            label="Tỉnh/Thành phố *"
            onChange={(e) =>
              addressForm.setFieldsValue({ provinceCode: e.target.value })
            }
            style={{ fontWeight: "500" }}
          >
            <TinhThanhPhoSelector
              onSelectTinhThanhPho={(value) =>
                addressForm.setFieldsValue({ provinceCode: value })
              }
            />
          </Form.Item>
          <Form.Item
            name="districtCode"
            label="Quận/Huyện *"
            onChange={(e) =>
              addressForm.setFieldsValue({ districtCode: e.target.value })
            }
            style={{ fontWeight: "500" }}
          >
            <HuyenQuanSelector
              onSelectHuyenQuan={(value) =>
                addressForm.setFieldsValue({ districtCode: value })
              }
            />
          </Form.Item>
          <Form.Item
            name="wardCode"
            label="Xã/Phường *"
            onChange={(e) =>
              addressForm.setFieldsValue({ wardCode: e.target.value })
            }
            style={{ fontWeight: "500" }}
          >
            <XaPhuongSelector
              onSelectXaPhuong={(value) =>
                addressForm.setFieldsValue({ wardCodeCode: value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Số nhà và tên đường"
            name="address"
            style={{ fontWeight: "500" }}
          >
            <Input style={{ borderRadius: "5px" }} />
          </Form.Item>
      </Form>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '35%', borderRadius: '5px' }}>Lưu</Button>
          </Form.Item>
        </div>
      </Form>
    );
  }; 

const mountNode = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <HRCreateWork />
  </Provider>,
  mountNode
);