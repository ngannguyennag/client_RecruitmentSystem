import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../../../../store";
import { Menu, Form, Input, Upload, Button, Avatar, List } from "antd";
import {
  IdcardOutlined,
  FileImageOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getProvince,
  getDistrict,
  getWards,
  getDetailCompany,
  updateCompanyAddress,
  updateCompanyBasicInfo,
  updateCompanyDesc,
  uploadCompanyImage,
  updateCompanyMedia,
} from "../../../../actions/CompanyAction";

const { TextArea } = Input;

export default function HRFileCompany(props) {
  const dispatch = useDispatch();

  const [basicInfoForm] = Form.useForm();
  const [imgDescForm] = Form.useForm();
  const [mediaForm] = Form.useForm();
  const [addressForm] = Form.useForm();

  const [current, setCurrent] = useState("basic-info");

  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLicense, setCompanyLicense] = useState([]);
  const [companyImage, setCompanyImage] = useState([]);

  const company = useSelector((state) => state.getDetailCompany.company);
  const userSignin = useSelector((state) => state.userSignin.userInfo);
  const token = userSignin
    ? JSON.parse(localStorage.getItem("userInfo")).access_token
    : null;

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (!company && token) dispatch(getDetailCompany(token));
  }, [company, dispatch, token]);

  // Company logo upload handler
  const handleLogoUpload = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);

      dispatch(uploadCompanyImage(token, formData, "logo")).then(
        (uploadedImageUrl) => {
          setCompanyLogo(uploadedImageUrl);
        }
      );
    }
  };

  const handleAddLicense = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);

      dispatch(uploadCompanyImage(token, formData, "license"))
        .then((uploadedImageUrl) => {
          if (companyLicense === undefined) {
            setCompanyLicense([uploadedImageUrl]);
          } else {
            const newImageList = [...companyLicense, uploadedImageUrl];
            setCompanyLicense(newImageList);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleDeleteLicense = (index) => {
    const newImageList = companyLicense.filter((_, i) => i !== index);
    setCompanyLicense(newImageList);
  };

  const handleAddImage = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);

      dispatch(uploadCompanyImage(token, formData, "image"))
        .then((uploadedImageUrl) => {
          console.log(uploadedImageUrl);
          if (companyImage === undefined) {
            setCompanyImage([uploadedImageUrl]);
          } else {
            const newImageList = [...companyImage, uploadedImageUrl];
            setCompanyImage(newImageList);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  console.log(companyImage);

  const handleDeleteImage = (index) => {
    const newImageList = companyImage.filter((_, i) => i !== index);
    setCompanyImage(newImageList);
  };

  useEffect(() => {
    if (company) {
      basicInfoForm.setFieldsValue({
        companyShortName: company?.companyShortName,
        companyFullName: company?.companyFullName,
        companyFoundedYear: company?.companyFoundedYear,
        companySize: company?.companySize,
        companyMst: company?.companyMst,
        companyIndustry: company?.companyIndustry.industryId,
      });
      setCompanyLogo(company?.companyLogo);
      setCompanyLicense(company?.companyLicense?.split(";"));

      imgDescForm.setFieldsValue({
        companyIntroduction: company?.companyIntroduction,
      });
      setCompanyImage(company?.companyImage?.split(";"));

      mediaForm.setFieldsValue({
        phoneNumber: company?.phoneNumber,
        email: company?.email,
        facebookUrl: company?.facebookUrl,
        linkedinUrl: company?.linkedinUrl,
        youtubeUrl: company?.youtubeUrl,
        website: company?.website,
      });
    }
  }, [company, basicInfoForm, imgDescForm, mediaForm]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList) {
      return e.fileList;
    }
    return [];
  };

  const BasicInfoForm = () => {
    const industryData = useSelector((state) => state.getIndustry.industry);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    let industryCompany = "";

    if (!(company === undefined)) {
      industryCompany = company.companyIndustry.industryId;
    }

    useEffect(() => {
      setSelectedIndustry(industryCompany);
    }, [industryCompany]);

    const IndustrySelector = ({ onSelectIndustry }) => {
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedIndustry(selectedValue);
        onSelectIndustry(selectedValue);
      };

      return (
        <select value={selectedIndustry} onChange={handleSelectChange}>
          <option value="">Chọn lĩnh vực hoạt động</option>
          {industryData && industryData.length > 0
            ? industryData.map((industry) => (
                <option value={industry.industryId} key={industry.industryId}>
                  {industry.industryNameVI}
                </option>
              ))
            : null}
        </select>
      );
    };

    const handleSubmit = () => {
      const values = basicInfoForm.getFieldsValue();
      values.companyLogo = companyLogo;
      values.companyLicense = companyLicense.join(";");
      console.log(values);
      dispatch(updateCompanyBasicInfo(token, values));
    };

    return (
      <Form
        form={basicInfoForm}
        onFinish={handleSubmit}
        className="formHR"
        style={{
          margin: " 40px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div className="fileCompany">
          <div className="titleCompany" style={{ margin: "20px 0 0 70px" }}>
            Thông tin cơ bản
          </div>
          <Form.Item name="companyLogo" getValueFromEvent={normFile}>
            <Upload
              onChange={(info) => handleLogoUpload(info.file)}
              showUploadList={false}
            >
              {companyLogo ? (
                <Avatar
                  size={150}
                  src={companyLogo}
                  style={{
                    marginTop: "80px",
                    border: "3px solid #b6e4fc",
                    cursor: "pointer",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              ) : (
                <div>
                  <div className="sidebarHR-top">
                    <i className="accountHR">
                      <img
                        src="img/company.png"
                        alt="avatar"
                        style={{
                          marginTop: "80px",
                          border: "3px solid #b6e4fc",
                          cursor: "pointer",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </i>
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <div
            className="formBasicInfoCompany"
            style={{
              backgroundColor: "white",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Form.Item
              name="companyShortName"
              label="Tên viết tắt *"
              style={{
                margin: "20px 60px 0 25px",
                width: "30%",
                fontWeight: "500",
              }}
            >
              <Input style={{ borderRadius: "3px" }} />
            </Form.Item>
            <Form.Item
              name="companyFullName"
              label="Tên đầy đủ *"
              style={{
                margin: "20px 40px 0 0",
                width: "55%",
                fontWeight: "500",
              }}
            >
              <Input style={{ borderRadius: "5px", flex: "1" }} />
            </Form.Item>
            <Form.Item
              name="companyIndustry"
              label="Lĩnh vực hoạt động *"
              style={{
                margin: "20px 60px 0 25px",
                width: "55%",
                fontWeight: "500",
              }}
            >
              <IndustrySelector
                onSelectIndustry={(value) =>
                  basicInfoForm.setFieldsValue({ companyIndustry: value })
                }
              />
            </Form.Item>
            <Form.Item
              name="companyFoundedYear"
              label="Năm thành lập *"
              style={{
                margin: "20px 40px 0 0",
                width: "30%",
                fontWeight: "500",
              }}
            >
              <Input style={{ borderRadius: "5px" }} />
            </Form.Item>
            <Form.Item
              name="companySize"
              label="Số lượng nhân sự *"
              style={{
                margin: "20px 60px 0 25px",
                width: "42.5%",
                fontWeight: "500",
              }}
            >
              <Input style={{ borderRadius: "5px" }} />
            </Form.Item>
            <Form.Item
              name="companyMst"
              label="Mã số thuế *"
              style={{
                margin: "20px 40px 0 0",
                width: "42.5%",
                fontWeight: "500",
              }}
            >
              <Input style={{ borderRadius: "5px" }} />
            </Form.Item>
            <Form.Item
              name="companyLicense"
              label="Giấy phép kinh doanh *"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{
                margin: "20px 0 0 25px",
                width: "100%",
                fontWeight: "500",
              }}
            >
              {companyLicense && companyLicense.length > 0 ? (
                <div style={{ display: "flex" }}>
                  <List
                    grid={{ gutter: 20, column: 2 }}
                    dataSource={companyLicense}
                    renderItem={(item, index) => (
                      <List.Item>
                        <img
                          src={item}
                          alt={`company license ${index}`}
                          style={{
                            height: "400px",
                            cursor: "pointer",
                          }}
                        />
                        <DeleteOutlined
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteLicense(index)}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ) : null}
              <Upload
                showUploadList={false}
                onChange={(img) => handleAddLicense(img.file)}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <PlusOutlined
                    style={{ fontSize: "24px", marginBottom: "10px" }}
                  />
                  <div> Upload </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item
              className="form-item"
              style={{ width: "10%", marginLeft: "25px" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", borderRadius: "5px" }}
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    );
  };

  const ImageDescriptionForm = () => {
    const handleSubmit = () => {
      const values = imgDescForm.getFieldsValue();
      values.companyImage = companyImage.join(";");
      console.log(values);
      dispatch(updateCompanyDesc(token, values));
    };

    return (
      <div
        className="formImageCompany"
        style={{
          margin: " 40px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <Form
          form={imgDescForm}
          onFinish={handleSubmit}
          style={{ padding: "40px 40px 30px 25px" }}
        >
          <Form.Item
            name="companyImage"
            label="Hình ảnh *"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{
              margin: "20px 0 0 25px",
              width: "100%",
              fontWeight: "500",
            }}
          >
            {companyImage && companyImage.length > 0 ? (
              <div style={{ display: "flex" }}>
                <List
                  grid={{ gutter: 20, column: 2 }}
                  dataSource={companyImage}
                  renderItem={(item, index) => (
                    <List.Item>
                      <img
                        src={item}
                        alt={`company images ${index}`}
                        style={{
                          height: "400px",
                          cursor: "pointer",
                        }}
                      />
                      <DeleteOutlined
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteImage(index)}
                      />
                    </List.Item>
                  )}
                />
              </div>
            ) : null}
            <Upload
              showUploadList={false}
              onChange={(img) => handleAddImage(img.file)}
            >
              <div
                style={{
                  marginLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <PlusOutlined
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                />
                <div> Upload </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            name="companyIntroduction"
            label="Giới thiệu công ty (tối đa 5000 từ)"
            style={{ fontWeight: "500" }}
          >
            <TextArea rows={8} style={{ backgroundColor: "#e6f7ff" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "10%", borderRadius: "5px" }}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const MediaAndSocialForm = () => {
    const handleSubmit = () => {
      const values = mediaForm.getFieldsValue();
      dispatch(updateCompanyMedia(token, values));
    };

    return (
      <Form
        form={mediaForm}
        onFinish={handleSubmit}
        style={{
          margin: " 40px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div className="FormMediaSocialCompany" style={{ padding: "35px" }}>
          <div
            className="titleMedia"
            style={{ fontSize: "22px", fontWeight: "700" }}
          >
            Truyền thông và mạng xã hội
          </div>
          <Form.Item
            label="Số điện thoại liên hệ"
            name="phoneNumber"
            style={{ fontWeight: "500", marginTop: "20px" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
            />
          </Form.Item>
          <Form.Item
            label="Email liên hệ "
            name="email"
            style={{ fontWeight: "500" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
            />
          </Form.Item>
          <Form.Item
            label="Facebook"
            name="facebookUrl"
            style={{ fontWeight: "500" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
            />
          </Form.Item>
          <Form.Item
            label="Linkedin"
            name="linkedinUrl"
            style={{ fontWeight: "500" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
            />
          </Form.Item>
          <Form.Item
            label="Youtube"
            name="youtubeUrl"
            style={{ fontWeight: "500" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
            />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            style={{ fontWeight: "500" }}
          >
            <Input
              style={{ borderRadius: "5px", backgroundColor: "#e6f7ff" }}
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

  const AddressForm = () => {
    const handleSubmit = () => {
      const values = addressForm.getFieldsValue();
      dispatch(updateCompanyAddress(token, values));
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

    if (!(company === undefined)) {
      tinhThanhPhoCompany = company.companyAddress.provinceCode;
      huyenQuanCompany = company.companyAddress.districtCode;
      xaPhuongCompany = company.companyAddress.wardCode;
    }

    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
      setSelectedHuyenQuan(huyenQuanCompany);
    }, [huyenQuanCompany]);
    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
      setSelectedXaPhuong(xaPhuongCompany);
    }, [xaPhuongCompany]);
    useEffect(() => {
      // Cập nhật giá trị của selectedIndustry khi industryCompany thay đổi
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
                <option
                  value={tinhThanhPho.provinceCode}
                  key={tinhThanhPho.provinceCode}
                >
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
                <option
                  value={huyenQuan.districtCode}
                  key={huyenQuan.districtCode}
                >
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
          address: company?.companyAddress.address,
        }}
        onFinish={handleSubmit}
        style={{
          margin: " 40px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div className="FormAddressCompany" style={{ padding: "35px" }}>
          <div
            className="titleAddress"
            style={{ fontSize: "22px", fontWeight: "700" }}
          >
            Địa chỉ công ty
          </div>
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
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item
          key="basic-info"
          icon={<IdcardOutlined />}
          style={{ fontWeight: "500", marginLeft: "25px" }}
        >
          Thông tin cơ bản
        </Menu.Item>
        <Menu.Item
          key="image-description"
          icon={<FileImageOutlined />}
          style={{ fontWeight: "500" }}
        >
          Hình ảnh & mô tả
        </Menu.Item>
        <Menu.Item
          key="media-socialnetwork"
          icon={<IdcardOutlined />}
          style={{ fontWeight: "500" }}
        >
          Truyền thông và mạng xã hội
        </Menu.Item>
        <Menu.Item
          key="address"
          icon={<IdcardOutlined />}
          style={{ fontWeight: "500" }}
        >
          Địa chỉ liên hệ
        </Menu.Item>
      </Menu>
      {current === "basic-info" && <BasicInfoForm />}
      {current === "image-description" && <ImageDescriptionForm />}
      {current === "media-socialnetwork" && <MediaAndSocialForm />}
      {current === "address" && <AddressForm />}
    </>
  );
}
const mountNode = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <HRFileCompany />
  </Provider>,
  mountNode
);
