import React from "react";
import { useDispatch} from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  BankOutlined,
  BarsOutlined,
  OrderedListOutlined,
  SafetyOutlined,
  LogoutOutlined,
  SlackOutlined,
  HddOutlined,
  GatewayOutlined,
  MacCommandOutlined,
} from "@ant-design/icons";
import {signOut} from '../../../../actions/AuthenticationAction';
function Sidebar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="sidebar">
      <div className="sidebar-top-admin">
      </div>
      <div className="sidebar-list">
        <Link to="/admin" className={'sidebar-list-item'}>
          <span>
            <AppstoreOutlined></AppstoreOutlined>
          </span>
          <p>Tổng quan</p>
        </Link>
        <Link to="/admin/manage-candidate" className={'sidebar-list-item'}>
          <span>
            <UsergroupAddOutlined></UsergroupAddOutlined>
          </span>
          <p>Quản lý ứng viên</p>
        </Link>
        <Link to="/admin/manage-company" className={'sidebar-list-item'}>
          <span>
          <BankOutlined />
          </span>
          <p>
            Quản lý công ty
          </p>
        </Link>
        <Link to="/admin/manage-job" className={'sidebar-list-item'}>
          <span>
            {/* <OrderedListOutlined></OrderedListOutlined> */}
            <BarsOutlined />
          </span>
          <p>
            Quản lý công việc
          </p>
        </Link>
        <Link to="/admin/manage-role" className={'sidebar-list-item'}>
          <span>
          <SafetyOutlined />
          </span>
          <p>
            Quản lý quyền
          </p>
        </Link>
        <Link to="/admin/manage-skill" className={'sidebar-list-item'}>
          <span>
          <MacCommandOutlined />
          </span>
          <p>
            Quản lý kỹ năng
          </p>
        </Link>
        <Link to="/admin/manage-degree" className={'sidebar-list-item'}>
          <span>
            <HddOutlined />
          </span>
          <p>
            Quản lý bằng cấp
          </p>
        </Link>
        <Link to="/admin/manage-category" className={'sidebar-list-item'}>
          <span>
            <OrderedListOutlined></OrderedListOutlined>
          </span>
          <p>
            Quản lý ngành nghề
          </p>
        </Link>
        <Link to="/admin/manage-jobtype" className={'sidebar-list-item'}>
          <span>
            {/* <OrderedListOutlined></OrderedListOutlined> */}
            <SlackOutlined />
          </span>
          <p>
            Quản lý loại hình công việc
          </p>
        </Link>
        <Link to="/admin/manage-industry" className={'sidebar-list-item'}>
          <span>
          <GatewayOutlined />
          </span>
          <p>
            Quản lý lĩnh vực hoạt động
          </p>
        </Link>
        <Link to="/hr/logout" className={'sidebar-list-item'} onClick={onSignOut}>
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

export default Sidebar;
