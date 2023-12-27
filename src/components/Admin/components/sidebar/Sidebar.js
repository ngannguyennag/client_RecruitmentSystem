import React from "react";
import { useDispatch} from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  OrderedListOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {SignoutUser} from '../../../../actions/UserAction';
function Sidebar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const onSignOut = () => {
    dispatch(SignoutUser());
  };
  // const { orderPendding } = useSelector((state) => state.allOrder);
  // let totalNewOrder
  // if(orderPendding){
  //   totalNewOrder = orderPendding.length
  // }
  // useEffect(() => {
  //   const getNewOrder = () => {
  //     dispatch(GetAllOrderPendding());
  //   }
  //   getNewOrder()
  // }, [dispatch]);
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="/img/J.png"></img>
      </div>
      <div className="sidebar-list">
        <Link to="/admin" className={'sidebar-list-item'}>
          <span>
            <AppstoreOutlined></AppstoreOutlined>
          </span>
          <p>Dashboard</p>
        </Link>
        <Link to="/admin/customer" className={'sidebar-list-item'}>
          <span>
            <UsergroupAddOutlined></UsergroupAddOutlined>
          </span>
          <p>Quản lý ứng viên</p>
        </Link>
        <Link to="/admin/manage-account" className={'sidebar-list-item'}>
          <span>
            <ShopOutlined></ShopOutlined>
          </span>
          <p>Quản lý tài khoản</p>
        </Link>
        <Link to="/admin/manage-company" className={'sidebar-list-item'}>
          <span>
            <OrderedListOutlined></OrderedListOutlined>
          </span>
          <p>
            Quản lý công ty
            {/* <div className="admin-order-new">
                {totalNewOrder}
              </div> */}
          </p>
        </Link>
        <Link to="/admin/manage-job" className={'sidebar-list-item'}>
          <span>
            <OrderedListOutlined></OrderedListOutlined>
          </span>
          <p>
            Quản lý công việc
          </p>
        </Link>
        <Link to="/admin/notification" className={'sidebar-list-item'}>
          <span>
            <NotificationOutlined/>
          </span>
          <p>
            Thông báo
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
        {/* <Link to="/admin/chat" className={location.pathname === '/admin/chat' ? 'sidebar-list-item active': 'sidebar-list-item'}>
          <span>
            <WechatOutlined></WechatOutlined>
          </span>
          <p>Chat</p>
        </Link> */}
      </div>
    </div>
  );
}

export default Sidebar;
