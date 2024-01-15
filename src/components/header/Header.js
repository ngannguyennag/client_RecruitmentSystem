import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { signOut } from "../../actions/AuthenticationAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import {Link} from "react-router-dom";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo, error } = userSignin;
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);
  const [menu, setMenu] = useState(true);
  const handleSignout = () => {
    dispatch(signOut());
  };
  const SearchProduct = async (e) => {
    e.preventDefault()
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch('')
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
              <img src="img/J.png"></img>
            <Link to="/"> ANJWork </Link>
        </div>
        {/* <div className="search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm việc làm, công ty, kỹ năng"
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <SearchOutlined onClick={(e) => SearchProduct(e)}></SearchOutlined>
            <span>
              <button type="submit" onClick={(e) => SearchProduct(e)}>Search</button>
            </span>
          </form>
        </div> */}
        <ul className="menu-list" id={menu ? "hidden" : ""}>
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
            <Link to="register"> Đăng kí </Link>
            <Link to="login"> Đăng nhập </Link>
        </div>
      </section>
    </div>
  );
}
export default Header;
