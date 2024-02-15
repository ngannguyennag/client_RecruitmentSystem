import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SidebarHR.css";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  SendOutlined,
  OrderedListOutlined,
  UserOutlined,
  ContactsOutlined,
  SolutionOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch } from 'react-redux';
import {signOut} from '../../../../actions/AuthenticationAction'
import { companyLogoUrl, getDetailCompany } from "../../../../actions/CompanyAction";
function SidebarHR(props) {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOut());
  };
  const company = useSelector(state => state.getDetailCompany.company);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access_token;
  useEffect(() => {
    if (!company && token) dispatch(getDetailCompany(token));
  }, [company, dispatch, token]);
  return (
    <div className="sidebarHR">
      <div className="sidebarHR-list">
      <div className="sidebarHR-top">
        <i className="accountHR" >
        {company?.companyLogo ? (
              <img src={company?.companyLogo} alt="Profile" />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
        </i>
      </div>
        <Link to="/hr" className={'sidebarHR-list-item'}>
          <span>
            <AppstoreOutlined></AppstoreOutlined>
          </span>
          <p>Tổng quan</p>
        </Link>
        <Link to="/hr/file_company" className={'sidebarHR-list-item'}>
          <span>
            <UsergroupAddOutlined></UsergroupAddOutlined>
          </span>
          <p>Hồ sơ doanh nghiệp</p>
        </Link>
        <Link to="/hr/create_work" className={'sidebarHR-list-item'}>
          <span>
          <SendOutlined />
          </span>
          <p>Tạo công việc</p>
        </Link>
        <Link to="/hr/manage_work" className={'sidebarHR-list-item'}>
          <span>
            <OrderedListOutlined></OrderedListOutlined>
          </span>
          <p>
            Quản lý công việc
          </p>
        </Link>
        <Link to="/hr/list_application" className={'sidebarHR-list-item'}>
          <span>
          <SolutionOutlined />
          </span>
          <p>
            Danh sách ứng tuyển
          </p>
        </Link>
        {/* <Link to="/hr/list_interview" className={'sidebarHR-list-item'}>
          <span>
          <ContactsOutlined />
          </span>
          <p>
            Danh sách phỏng vấn
          </p>
        </Link> */}
        <Link to="/hr/notification" className={'sidebarHR-list-item'}>
          <span>
          <NotificationOutlined />
          </span>
          <p>
            Thông báo
          </p>
        </Link>
        <Link to="/hr/logout" className={'sidebarHR-list-item'} onClick={onSignOut}>
          <span>
          <LogoutOutlined/>
          </span>
          <p>
            Đăng xuất
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SidebarHR;
