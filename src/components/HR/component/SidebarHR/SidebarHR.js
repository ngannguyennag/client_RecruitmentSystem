import React from "react";
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
import {SignoutUser} from '../../../../actions/UserAction'
function SidebarHR(props) {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(SignoutUser());
  };
  const users = useSelector(state => state.getAccountInfo.user);
  return (
    <div className="sidebarHR">
      <div className="sidebarHR-list">
      <div className="sidebarHR-top">
        <i className="accountHR" >
        {users?.imgUrl ? (
              <img src={users.imgUrl} alt="Profile" />
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
        <Link to="/hr/list_interview" className={'sidebarHR-list-item'}>
          <span>
          <ContactsOutlined />
          </span>
          <p>
            Danh sách phỏng vấn
          </p>
        </Link>
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
