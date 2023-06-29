import { Col, Row, Form, Input, Button } from "antd";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import "./ForgotPassword.css";
import axios from "axios";
import {useLocation} from "react-router-dom";
const EnterNewPassword = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
//   let { user_id } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
  const onFinish = async (values) => {
    // let token = searchParams.get("token");
    let token = params.get("token");
    const { password } = { ...values };
    // const data = {
    //   password,
    // //   user_id,
    // //   token,
    // };
    const newPassword = await axios
      .post("http://localhost:8080/api/v1/auth/reset_password?token=" + token, {
        password,
      })
      .then((res) => {
        // alert(res.data.message);
        window.location.assign("/login")
      })
      .catch((err) => console.log(err));
  };
  const onFinishFailed = (err) => {
    console.log(err);
  };

  return (
    <div className="reset-password-wrapper">
        <div className="reset-password">
        <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="form-forgot-password"
      >
        <h2>Đổi mật khẩu</h2>
        <div className="title-email">
        <div className="title-form">
        <Form.Item
          label="Nhập mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              message: "Mật khẩu phải lớn hơn 6 ký tự",
            },
          ]}
          name="password"
        >
          <Input.Password />
        </Form.Item>
        </div>
        </div>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu phải trùng khớp"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit-email" style={{height: '60px'}}>
            Submit
          </Button>
        </Form.Item>
        {/* <Link to="/login" style={{"textDecoration":"underline"}} >Quay lại trang đăng nhập</Link> */}
      </Form>
        </div>
    </div>
  );
};

export default EnterNewPassword;
