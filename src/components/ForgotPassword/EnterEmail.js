import { Col, Row, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
const ResetPassword = () => {
  const [isSentEmail, setIsSentEmail] = useState(false);
  const onFinish = async (values) => {
    setIsSentEmail(true);
    const { email } = { ...values };
    await axios
      .post("http://localhost:8080/api/v1/auth/forgot_password", {
        email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <h2>Quên mật khẩu</h2>
        <div className="title-email">
        <div className="title-header"> Hãy nhập email vào khung bên dưới. Chúng tôi sẽ gửi thông tin để bạn thay đổi mật khẩu vào email của mình.</div>
        <div className="title-form">
        <Form.Item
          rules={[
            { required: true, message: "" },
            {
              type: "email",
              message: "Vui lòng nhập đúng định dạng email",
            },
          ]}
          name="email"
        >
          <Input />
        </Form.Item>
        </div> 
        </div>
          <Form.Item>
                  <Button type="primary" htmlType="submit" className="btn-submit-email" style={{height: '45px'}}>
                    Send Password Reset Link
                  </Button>   
          </Form.Item>
        {isSentEmail && (
          <p style={{ color: "red" }}>
            Link đổi mật khẩu đã được gửi đến mail của bạn
          </p>
        )}
        <Link to="/login" style={{"textDecoration":"underline"}} >Quay lại trang đăng nhập</Link>
        {/* <Link to="/register" style={{"textDecoration":"underline"}}>Đăng ký tài khoản mới</Link> */}
      </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
