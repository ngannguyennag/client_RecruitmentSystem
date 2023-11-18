import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
              <img src="img/J.png"></img>
            <Link to="/"> ANJWork </Link>
        </div>
        <ul className="menu-list" >
          <li>
            <Link to="/jobs"> Việc Làm </Link>
          </li>
          <li>
            <Link to="/detail_companies"> Công ty </Link>
          </li>
          <li>
            <Link to="/career"> Nghề nghiệp </Link>
          </li>
          <li>
            <Link to="/myjobs"> Việc của tôi </Link>
          </li>
         
        </ul>
    
      </section>
    </div>
  );
}
export default Header;
