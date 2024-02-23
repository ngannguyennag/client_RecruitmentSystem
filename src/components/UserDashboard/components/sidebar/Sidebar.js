import React, {useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link} from "react-router-dom";
import { getCandidateInfo } from '../../../../actions/CandidateAction';
import "./Sidebar.css";
import {
  SettingOutlined,
  UnorderedListOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import { signOut } from '../../../../actions/AuthenticationAction';
function Sidebar(props) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.getCandidateInfo.user);
  const userSignin = useSelector((state) => state.userSignIn.userInfo);
  const token = userSignin ? JSON.parse(localStorage.getItem('userInfo')).access_token : null;
  const onSignOut = () => {
    dispatch(signOut());
  };
  useEffect(() => {
    if (!users && token) {
      dispatch(getCandidateInfo(token));
    }
  }, [dispatch, token, users]);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {/* <img src={users.imgUrl}></img> */}
      </div>
      <div className="sidebar-list">
        <Link to="/candidate/profile-candidate" className={'sidebar-list-item'}>
          <span>
            <UserOutlined />
          </span>
          <p>Hồ sơ ứng viên</p>
        </Link>
        <Link to="/candidate/list-application" className={'sidebar-list-item'}>
          <span>
            <UnorderedListOutlined />
          </span>
          <p>Danh sách ứng tuyển</p>
        </Link>
        <Link to="/candidate/manage-account" className={'sidebar-list-item'}>
          <span>
            <SettingOutlined />          
          </span>
          <p>
            Cài đặt tài khoản
          </p>
        </Link>
        <Link to="/candidate/notification" className={'sidebar-list-item'}>
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
