import React from "react";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";

function DetailPage(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default DetailPage;
