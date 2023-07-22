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
  const onFinish = async (values) => {
    let token = params.get("token");
    const { password } = { ...values };
    const newPassword = await axios
      .post("http://localhost:8080/api/v1/auth/reset_password?token=" + token, {
        password,
      })
      .then((res) => {
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
        <div className="imgLogo">
          <img src="img/J.png"></img>
        </div>
        <h2> Tạo lại mật khẩu của bạn</h2>
        <div className="title-email">
        <div className="title-formNew">
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
        </div>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit-email" style={{height: '40px'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div>
    </div>
  );
};

export default EnterNewPassword;
