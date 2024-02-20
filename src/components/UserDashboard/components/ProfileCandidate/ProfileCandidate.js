import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { Menu, Form, Input, Radio, Upload, Button, Avatar } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { getCandidateInfo, getCandidateUpdate, uploadCV, uploadImage} from "../../../../actions/CandidateAction";
import {getProvince,getDistrict,getWards} from "../../../../actions/CompanyAction";
import store from "../../../../store";
import "./ProfileCandidate.css";
import { getCategory } from "../../../../actions/CategoryAction";
import { FormatDate } from "../../../../utils/FormatDate";
export default function ProfileCandidate() {
  const dispatch = useDispatch();
  const [basicInfoForm] = Form.useForm();
  const [studyForm] = Form.useForm();
  const [experienceForm] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [current, setCurrent] = useState("basic-info");
  const [avatarUrl, setAvatarUrl] = useState(null); // State for avatar URL
  const [cvUrl, setCVUrl] = useState(null); // State for cv url
  const candidate = useSelector((state) => state.getCandidateInfo.candidate);
  const initToken = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  const [token, setToken] = useState(initToken);
  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    dispatch(getCandidateInfo(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (candidate) {
      basicInfoForm.setFieldsValue({
        fullName: candidate?.fullName,
        desiredJob: candidate?.desiredJob,
        phoneNumber: candidate?.phoneNumber,
        email: candidate?.email,
        educationLevel: candidate?.educationLevel,
        birthday: candidate?.birthday,
        category: candidate?.category?.categoryId,
        gender: candidate?.gender,
      });
      setAvatarUrl(candidate?.imgUrl);
      setCVUrl(candidate?.cvUrl);
    }
  }, [basicInfoForm, candidate, token]);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const BasicInfoForm = () => {
    const categoryData = useSelector((state) => state.getCategory.category);
    const [selectedCategory, setSelectedCategory] = useState("");
    let category = "";
    if (!(candidate === undefined)) {
      category = candidate.category.categoryId;
    }

    useEffect(() => {
      setSelectedCategory(category);
    }, [category]);
    const CategorySelector = ({ onSelectCategory }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        onSelectCategory(selectedValue);
      };

      return (
        <select value={selectedCategory} onChange={handleSelectChange}>
          <option value="">Chọn ngành nghề</option>
          {categoryData && categoryData.length > 0
            ? categoryData.map((category) => (
                <option value={category.categoryId} key={category.categoryId}>
                  {category.categoryName}
                </option>
              ))
            : null}
        </select>
      );
    };
    const handleImageUpload = (file) => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file.originFileObj);
        dispatch(uploadImage(token, formData)).then((uploadedImageUrl) => {
          setAvatarUrl(uploadedImageUrl);
        });
      }
    };
    const handleCVUpload = (file) => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file.originFileObj);
        dispatch(uploadCV(token, formData)).then((uploadedCVUrl) => {
          setCVUrl(uploadedCVUrl);
        });
      }
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
    const handleSubmit = () => {
      const values = basicInfoForm.getFieldsValue();
      console.log(values);
      values.imgUrl = avatarUrl;
      dispatch(getCandidateUpdate(token, values)).then((token) => {
        setToken(token);
      });
    };
    return (
      <Form
        form={basicInfoForm}
        onFinish={handleSubmit}
        style={{ margin: " 40px", backgroundColor: "white", borderRadius: "10px",}}
        className="formUser">
        <div className="formUser" style={{ padding: "35px" }}>
          <div  className="titleUser"  style={{ fontSize: "24px", fontWeight: "700" }}>
            Thông tin cơ bản
          </div>
          <Form.Item
            name="imgUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}>
            <Upload
              onChange={(info) => handleImageUpload(info.file)}
              showUploadList={false}>
              {avatarUrl ? (
                <Avatar size={150} src={avatarUrl} style={{ borderColor: "blue",  border: "13px solid",  cursor: "pointer",  width: "200px",  height: "200px",  }}  />
              ) : (
                <div>
                  <div className="sidebarUser-top">
                    <i className="accountUser">
                      <img  src="img/candidate.png" alt="avatar" style={{ marginTop: "100px", border: " blue 3px", cursor: "pointer",  }}/>
                    </i>
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Tên đầy đủ * "
            name="fullName"
            style={{ fontWeight: "500", width: '100%' }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff", width: '300px' }} />
          </Form.Item>
          <Form.Item
            label="Công việc * "
            name="desiredJob"
            style={{ fontWeight: "500",  width: '100%' }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff",  width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="Ngành nghề * "
            name="category"
            style={{ fontWeight: "500" ,  width: '100%'}}>
            <CategorySelector
              onSelectCategory={(value) =>
                basicInfoForm.setFieldsValue({ category: value })}/>
          </Form.Item>
          <Form.Item
            label="Trình độ học vấn * "
            name="educationLevel"
            style={{ fontWeight: "500",  width: '100%' }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }} />
          </Form.Item>
          <Form.Item
            label="Ngày sinh * "
            name="birthday"
            style={{ fontWeight: "500" }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại liên hệ"
            name="phoneNumber"
            style={{ fontWeight: "500", marginTop: "20px" }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }} />
          </Form.Item>
          <Form.Item
            label="Email liên hệ *"
            name="email"
            style={{ fontWeight: "500" }}>
            <Input style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}/>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính *"
            style={{ fontWeight: "500" }}>
            <Radio.Group>
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
              <Radio value="OTHER">Khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            className="form-item"
            style={{ width: "10%", marginLeft: "25px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: "5px" }}>
              Lưu
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  };

  const StudyForm = () => {
    const handleSubmit = () => {
      const values = studyForm.getFieldsValue();
      console.log(values);
    };

    return (
      <Form
        form={studyForm}
        style={{  margin: " 40px",  backgroundColor: "white",  borderRadius: "10px"}}
        className="formUser">
        <div className="fileCompany" style={{ padding: "35px" }}>
          <h3  className="table-heading"  style={{ fontSize: "22px", fontWeight: "700" }}>
            Lộ trình học tập
          </h3>
          {candidate.education.map((educationItem, index) => (
            <div className="detailEducation" key={index}>
              <p style={{ fontWeight: "600" }}>
                {educationItem.startDate} - {educationItem.endDate}:{" "}
                {educationItem.major} ở {educationItem.schoolName}{" "}
              </p>
              <p style={{ color: "grey", textAlign: "left" }}>
                {educationItem.description}
              </p>
            </div>
          ))}
        </div>
        <Form.Item
          className="form-item"
          style={{ width: "10%", marginLeft: "25px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", borderRadius: "5px" }}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const ExperienceForm = () => {
    const handleSubmit = () => {
      const values = experienceForm.getFieldsValue();
      console.log(values);
    };

    return (
      <Form
        form={experienceForm}
        style={{margin: " 40px",  backgroundColor: "white",  borderRadius: "10px",}}
        className="formUser">
        <div className="fileCompany" style={{ padding: "35px" }}>
          <h3
            className="table-heading"
            style={{ fontSize: "22px", fontWeight: "700" }}>
            Kinh nghiệm làm việc
          </h3>
          {candidate.workingHistory.map((experienceItem, index) => (
            <div className="detailEducation" key={index}>
              <p style={{ fontWeight: "600" }}>
                {experienceItem.startDate} - {experienceItem.endDate}: Làm{" "}
                {experienceItem.jobName} ở {experienceItem.companyName}
              </p>
              <p style={{ color: "grey", textAlign: "left" }}>
                {experienceItem.description}
              </p>
            </div>
          ))}
        </div>
        <Form.Item
          className="form-item"
          style={{ width: "10%", marginLeft: "25px" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", borderRadius: "5px", alignItems: "center" }}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const AddressForm = () => {
    const handleSubmit = () => {
      const values = addressForm.getFieldsValue();
      dispatch(getCandidateUpdate(token, values));
    };
    const tinhThanhPhoData = useSelector((state) => state.getProvince.province);
    const huyenQuanData = useSelector((state) => state.getDistrict.district);
    const xaPhuongData = useSelector((state) => state.getWards.wards);
    const [selectedTinhThanhPho, setSelectedTinhThanhPho] = useState("");
    const [selectedHuyenQuan, setSelectedHuyenQuan] = useState("");
    const [selectedXaPhuong, setSelectedXaPhuong] = useState("");
    var tinhThanhPhoCompany = "";
    var huyenQuanCompany = "";
    var xaPhuongCompany = "";
    if (!(candidate === undefined)) {
      tinhThanhPhoCompany = candidate.address.provinceCode;
      huyenQuanCompany = candidate.address.districtCode;
      xaPhuongCompany = candidate.address.wardCode;
    }
    useEffect(() => {
      setSelectedHuyenQuan(huyenQuanCompany);
    }, [huyenQuanCompany]);
    useEffect(() => {
      setSelectedXaPhuong(xaPhuongCompany);
    }, [xaPhuongCompany]);
    useEffect(() => {
      setSelectedTinhThanhPho(tinhThanhPhoCompany);
    }, [tinhThanhPhoCompany]);

    useEffect(() => {
      dispatch(getProvince());
    }, []);
    useEffect(() => {
      if (selectedTinhThanhPho) {
        dispatch(getDistrict(selectedTinhThanhPho));
      }
    }, [selectedTinhThanhPho]);
    useEffect(() => {
      if (selectedHuyenQuan) {
        dispatch(getWards(selectedHuyenQuan));
      }
    }, [selectedHuyenQuan]);
    const TinhThanhPhoSelector = ({ onSelectTinhThanhPho }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedTinhThanhPho(selectedValue);
        onSelectTinhThanhPho(selectedValue);
      };
      return (
        <select value={selectedTinhThanhPho} onChange={handleSelectChange}>
          <option value="">Chọn tỉnh/thành phố</option>
          {tinhThanhPhoData && tinhThanhPhoData.length > 0
            ? tinhThanhPhoData.map((tinhThanhPho) => (
                <option  value={tinhThanhPho.provinceCode}  key={tinhThanhPho.provinceCode}>
                  {tinhThanhPho.fullName}
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
        <select value={selectedHuyenQuan} onChange={handleSelectChange}>
          <option value="">Chọn huyện/quận</option>
          {huyenQuanData && huyenQuanData.length > 0
            ? huyenQuanData.map((huyenQuan) => (
                <option  value={huyenQuan.districtCode}  key={huyenQuan.districtCode}>
                  {huyenQuan.fullName}
                </option>
              ))
            : null}
        </select>
      );
    };
    const XaPhuongSelector = ({ onSelectXaPhuong }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedXaPhuong(selectedValue);
        onSelectXaPhuong(selectedValue);
      };
      return (
        <select value={selectedXaPhuong} onChange={handleSelectChange}>
          <option value="">Chọn xã/phường</option>
          {xaPhuongData && xaPhuongData.length > 0
            ? xaPhuongData.map((xaPhuong) => (
                <option value={xaPhuong.wardCode} key={xaPhuong.wardCode}>
                  {xaPhuong.fullName}
                </option>
              ))
            : null}
        </select>
      );
    };

    return (
      <Form
        form={addressForm}
        initialValues={{
          provinceCode: tinhThanhPhoCompany,
          districtCode: huyenQuanCompany,
          wardCode: xaPhuongCompany,
          address: candidate?.address.address,
        }}
        onFinish={handleSubmit}
        style={{
          margin: " 40px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div className="FormAddressCandidate" style={{ padding: "35px" }}>
          <div  className="titleAddress"  style={{ fontSize: "22px", fontWeight: "700" }}>
            Địa chỉ ứng viên
          </div>
          <Form.Item
            name="provinceCode"
            label="Tỉnh/Thành phố *"
            onChange={(e) =>  addressForm.setFieldsValue({ provinceCode: e.target.value })}
            style={{ fontWeight: "500" }}
          >
            <TinhThanhPhoSelector
              onSelectTinhThanhPho={(value) =>  addressForm.setFieldsValue({ provinceCode: value })}
            />
          </Form.Item>
          <Form.Item
            name="districtCode"
            label="Quận/Huyện *"
            onChange={(e) =>  addressForm.setFieldsValue({ districtCode: e.target.value })}
            style={{ fontWeight: "500" }}
          >
            <HuyenQuanSelector
              onSelectHuyenQuan={(value) =>
                addressForm.setFieldsValue({ districtCode: value })}
            />
          </Form.Item>
          <Form.Item
            name="wardCode"
            label="Xã/Phường *"
            onChange={(e) =>  addressForm.setFieldsValue({ wardCode: e.target.value })  }
            style={{ fontWeight: "500" }}
          >
            <XaPhuongSelector onSelectXaPhuong={(value) => addressForm.setFieldsValue({ wardCodeCode: value }) }/>
          </Form.Item>
          <Form.Item
            label="Số nhà và tên đường"
            name="address"
            style={{ fontWeight: "500" }}>
            <Input style={{ borderRadius: "5px" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "12%", borderRadius: "5px" }}>
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
        <Menu.Item key="basic-info" icon={<IdcardOutlined />} style={{ fontWeight: "500", marginLeft: "25px" }}>
          Thông tin cơ bản
        </Menu.Item>
        <Menu.Item key="study" icon={<IdcardOutlined />} style={{ fontWeight: "500" }}>
          Học tập
        </Menu.Item>
        <Menu.Item key="experience" icon={<IdcardOutlined />} style={{ fontWeight: "500" }}>
          Kinh nghiệm
        </Menu.Item>
        <Menu.Item key="address" icon={<IdcardOutlined />} style={{ fontWeight: "500" }}>
          Địa điểm
        </Menu.Item>
      </Menu>
      {current === "basic-info" && <BasicInfoForm />}
      {current === "study" && <StudyForm />}
      {current === "experience" && <ExperienceForm />}
      {current === "address" && <AddressForm />}
    </>
  );
}
const mountNode = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ProfileCandidate />
  </Provider>,
  mountNode
);
