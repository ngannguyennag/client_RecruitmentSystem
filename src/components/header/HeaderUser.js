// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./Header.css";
// import { SignoutUser } from "../../actions/UserAction";
// import { useHistory } from "react-router";
// import { searchProduct } from "../../actions/ProductAction";
// import {Link} from "react-router-dom";

// import {
//     UserOutlined
//   } from "@ant-design/icons";

// function HeaderUser(props) {
//   const dispatch = useDispatch();
//   const history = useHistory();

  

//   const [showAccount, setShowAccount] = useState(false);
//   const [showAccount2, setShowAccount2] = useState(false);

//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo, error } = userSignin;
//   const [search, setSearch] = useState("");
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const amount = cartItems.reduce((a, b) => a + b.qty, 0);

//   const [menu, setMenu] = useState(true);

//   const handleSignout = () => {
//     dispatch(SignoutUser());
//   };
//   const AccountMenu = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//     const handleIconClick = () => {
//       setIsMenuOpen(!isMenuOpen);
//     };
//   const SearchProduct = async (e) => {
//     e.preventDefault()
//     await history.push("/search");
//     dispatch(searchProduct(search));
//     setSearch('')
//   };

//   return (
//     <div className="header">
//       <section id="menu">
//         <div className="logo">
//               <img src="img/J.png"></img>
//             <Link to="/"> ANJWork </Link>
//         </div>
//         <ul className="menu-list" id={menu ? "hidden" : ""}>
//           <li>
//             <Link to="/jobs"> Việc Làm </Link>
//           </li>
//           <li>
//             <Link to="/companies"> Công ty </Link>
//           </li>
//           <li>
//             <Link to="/career"> Nghề nghiệp </Link>
//           </li>
//           <li>
//             <Link to="/myjobs"> Việc của tôi </Link>
//           </li>
         
//         </ul>
//         <div className="create-account">
//             <i className="account-icon" onClick={handleIconClick}>
//                 <UserOutlined />
//             </i>
//             {isMenuOpen && (
//                 <ul className="account-menu">
//                 <li>Quản lý tài khoản</li>
//                 <li>Đăng xuất</li>
//                 <li>Thông báo việc làm</li>
//                 </ul>
//             )}
//         </div>
//         </section>
//     </div>)
//     };
// };
// export default HeaderUser;
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./Header.css";
// import { SignoutUser } from "../../actions/UserAction";
// import { useHistory } from "react-router";
// import { searchProduct } from "../../actions/ProductAction";
// import { Link } from "react-router-dom";

// import { UserOutlined } from "@ant-design/icons";

// function HeaderUser(props) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [showAccount, setShowAccount] = useState(false);
//   const [showAccount2, setShowAccount2] = useState(false);

//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo, error } = userSignin;
//   const [search, setSearch] = useState("");
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const amount = cartItems.reduce((a, b) => a + b.qty, 0);

//   const [menu, setMenu] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSignout = () => {
//     dispatch(SignoutUser());
//   };

//   const AccountMenu = () => {
//     const handleIconClick = () => {
//       setIsMenuOpen(!isMenuOpen);
//     };

//     return (
//       <div className="create-account">
//         <i className="account-icon" onClick={handleIconClick}>
//           <UserOutlined />
//         </i>
//         {isMenuOpen && (
//           <ul className="account-menu">
//             <li>Hồ sơ của tôi</li>
//             <li>Quản lý tài khoản</li>
//             <li>Đăng xuất</li>
//           </ul>
//         )}
//       </div>
//     );
//   };

//   const handleMenuToggle = () => {
//     setMenu(!menu);
//   };

//   const SearchProduct = async (e) => {
//     e.preventDefault();
//     await history.push("/search");
//     dispatch(searchProduct(search));
//     setSearch("");
//   };

//   return (
//     <div className="header">
//       <section id="menu">
//         <div className="logo">
//           <img src="img/J.png"></img>
//           <Link to="/"> ANJWork </Link>
//         </div>
//         <ul className={`menu-list ${menu ? "hidden" : ""}`}>
//           <li>
//             <Link to="/jobs"> Việc Làm </Link>
//           </li>
//           <li>
//             <Link to="/companies"> Công ty </Link>
//           </li>
//           <li>
//             <Link to="/career"> Nghề nghiệp </Link>
//           </li>
//           <li>
//             <Link to="/myjobs"> Việc của tôi </Link>
//           </li>
//         </ul>
//         <AccountMenu />
//       </section>
//     </div>
//   );
// }

// export default HeaderUser;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";

import { UserOutlined,FileOutlined,SettingOutlined,BellOutlined,LogoutOutlined  } from "@ant-design/icons";

function HeaderUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignout = () => {
    dispatch(SignoutUser());
  };

  const AccountMenu = () => {
    const handleIconClick = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
      <div className="create-account">
        <i className="account-icon" onClick={handleIconClick}>
          <UserOutlined />
        </i>
        {isMenuOpen && (
          <ul className="account-menu">
            <li>Hồ sơ của tôi</li>
            <li>Quản lý tài khoản</li>
            <li>Đăng xuất</li>
          </ul>
        )}
      </div>
    );
  };

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch("");
  };

  const handleIconClick = () => {
    setShowAccount2(!showAccount2);
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <img src="/img/J.png"></img>
          <Link to="/"> ANJWork </Link>
        </div>
        <ul className={`menu-list ${menu ? "hidden" : ""}`}>
          <li>
            <Link to="/jobs"> Việc Làm </Link>
          </li>
          <li>
            <Link to="/companies"> Công ty </Link>
          </li>
          <li>
            <Link to="/career"> Nghề nghiệp </Link>
          </li>
          <li>
            <Link to="/myjobs"> Việc của tôi </Link>
          </li>
        </ul>
        <div className="create-account">
          <i className="account-icon" onClick={handleIconClick}>
            <UserOutlined />
          </i>
          {showAccount2 && (
            <ul className="account-menu">
              <li className="file">
                <i className="account-icon-menu"><FileOutlined/></i>
                Hồ sơ của tôi
            </li>
              <li className="file">
              <i className="account-icon-menu"><SettingOutlined/></i>
                Quản lý tài khoản</li>
              <li className="file">
              <i className="account-icon-menu"><BellOutlined/></i>
                Thông báo việc làm</li>
              <li className ="file" onClick={handleSignout}>
              <i className="account-icon-menu"><LogoutOutlined/></i>
                Đăng xuất</li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default HeaderUser;
