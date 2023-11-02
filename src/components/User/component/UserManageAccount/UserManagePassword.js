import { Col, Row, Form, Input, Button } from "antd";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import "./UserManageAccount.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { changePassword } from "../../../../actions/UserAction";
const UserManagePassword = () => {
  // useEffect(() => {
  //   dispatch(changePassword());
  // }, [dispatch]);
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  // const onSubmit = managePassword => {
  //   console.log(managePassword);
  //     if(confirmPassword === setConfirmPassword) {
  //         dispatch(changePassword(managePassword))            
  //     } else{
  //         alert("wrong change password")
  //     }
  // }
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const onFinish = async (values) => {
    // const { currentPassword, newPassword  } = { ...values };
    const { currentPassword, newPassword } = { ...values };
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const password = await axios
      .put("http://localhost:8080/api/v1/user/changePassword?token=" + token, {
        currentPassword, newPassword
      })
      .then((res) => {
        window.location.assign("/usermanage")
      })
      .catch((err) => console.log(err));
  };
  const on = async (values) => {
    let token = params.get("token");
    const { password, } = { ...values };
    const newPassword = await axios
      .put("http://localhost:8080/api/v1/user/changePassword", {
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
          // onSubmit = {onSubmit}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="form-forgot-password"
        >
          {/* <div className="imgLogo">
          <img src="img/J.png"></img>
        </div> */}
          <h2> Thay đổi mật khẩu</h2>
          <div className="title-email">
            <div className="title-formNew">
              <Form.Item
                label="Mật khẩu hiện tại"
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
                name="currentPassword"
              >
                <Input.Password />
              </Form.Item>
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
                name="newPassword"
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
                      if (!value || getFieldValue("newPassword") === value) {
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
          <h4>Mật mã tại ANJWork luôn được mã hóa và bảo mật tuyệt đối</h4>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit-email" style={{ height: '40px', width: '100px', marginRight: '20px' }}>
              <Link to='usermanage'>Hủy</Link>
            </Button>
            {/* <form onSubmit={handleSubmit(onSubmit)} class="form-login"> */}
            <Button type="primary" htmlType="submit" className="btn-submit-email" style={{ height: '40px', width: '100px' }}>
              Thay đổi
            </Button>
            {/* </form> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserManagePassword;

// import { Col, Row, Form, Input, Button } from "antd";
// // import { Link, useSearchParams, useParams } from "react-router-dom";
// // import { useEffect } from "react";
// import React from "react";
// import "./UserManageAccount.css";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const UserManageAccount = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);

//   const onFinish = async (values) => {
//     let token = params.get("token");
//     const { password } = { ...values };
//     const newPassword = await axios
//       .post(
//         "http://localhost:8080/api/v1/auth/reset_password?token=" + token,
//         {
//           password,
//         }
//       )
//       .then((res) => {
//         window.location.assign("/login");
//       })
//       .catch((err) => console.log(err));
//   };

//   const onFinishFailed = (err) => {
//     console.log(err);
//   };

//   return (
//     <div className="reset-password-wrapper">
//       <div className="reset-password">
//         <Form
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           layout="vertical"
//           className="form-forgot-password"
//         >
//           {/* <div className="imgLogo">
//           <img src="img/J.png"></img>
//         </div> */}
//           <h2> Thay đổi mật khẩu</h2>
//           <div className="title-email">
//             <div className="title-formNew">
//               <Form.Item
//                 label="Mật khẩu hiện tại"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng nhập mật khẩu",
//                   },
//                   {
//                     min: 6,
//                     message: "Mật khẩu phải lớn hơn 6 ký tự",
//                   },
//                 ]}
//                 name="password"
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 label="Nhập mật khẩu mới"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Vui lòng nhập mật khẩu",
//                   },
//                   {
//                     min: 6,
//                     message: "Mật khẩu phải lớn hơn 6 ký tự",
//                   },
//                 ]}
//                 name="newPassword"
//               >
//                 <Input.Password />
//               </Form.Item>
//               <Form.Item
//                 label="Nhập lại mật khẩu"
//                 name="confirmPassword"
//                 dependencies={["newPassword"]}
//                 hasFeedback
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please confirm your password!",
//                   },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue("newPassword") === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error("Mật khẩu phải trùng khớp"));
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password />
//               </Form.Item>
//             </div>
//           </div>
//           <h4>Mật mã tại ANJWork luôn được mã hóa và bảo mật tuyệt đối</h4>
//           <Form.Item>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="btn-submit-email"
//                   style={{ height: "40px", width: "60%", backgroundColor:"rgb(181, 192, 202)" }}
//                 >
//                   Hủy
//                 </Button>
//               </Col>
//               <Col span={12}>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   className="btn-submit-email"
//                   style={{ height: "40px", width: "60%" }}
//                 >
//                   Thay đổi
//                 </Button>
//               </Col>
//             </Row>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default UserManageAccount;
