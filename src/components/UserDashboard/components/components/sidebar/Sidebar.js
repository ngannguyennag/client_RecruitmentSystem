import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link} from "react-router-dom";
import { getAccountInfo } from '../../../../../actions/UserAction';
import "./Sidebar.css";
import {
  AppstoreOutlined,
  SettingOutlined,
  HeartOutlined,
  UnorderedListOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { SignoutUser } from '../../../../../actions/UserAction';
function Sidebar(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.getAccountInfo.user);
  const userSignin = useSelector((state) => state.userSignin.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const onSignOut = () => {
    dispatch(SignoutUser());
  };
  useEffect(() => {
    if (!users && token) {
      dispatch(getAccountInfo(token));
    }
  }, [dispatch, token, users]);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {/* <img src={users.imgUrl}></img> */}
      </div>
      <div className="sidebar-list">
        {/* <Link to="/user" className={'sidebar-list-item'}>
          <span>
            <AppstoreOutlined></AppstoreOutlined>
          </span>
          <p>Tổng quan</p>
        </Link> */}
        <Link to="/user/profile-candidate" className={'sidebar-list-item'}>
          <span>
            <UserOutlined />
          </span>
          <p>Hồ sơ ứng viên</p>
        </Link>
        <Link to="/user/user-list-application" className={'sidebar-list-item'}>
          <span>
            <UnorderedListOutlined />
          </span>
          <p>Danh sách ứng tuyển</p>
        </Link>
        {/* <Link to="/user/manage-job" className={'sidebar-list-item'}>
          <span>
            <HeartOutlined />    
          </span>
          <p>
            Công việc đã lưu
          </p>
        </Link> */}
        <Link to="/admin/notification" className={'sidebar-list-item'}>
          <span>
            <SettingOutlined />          
          </span>
          <p>
            Cài đặt tài khoản
          </p>
        </Link>
        <Link to="/user/manage-company" className={'sidebar-list-item'}>
          <span>
            <NotificationOutlined />
          </span>
          <p>
            Thông báo
          </p>
        </Link>
        <Link to="/hr/logout" className={'sidebar-list-item'} onClick={onSignOut}>
          <span>
            <LogoutOutlined />
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
