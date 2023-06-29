import { Col, Row, Form, Input, Button } from "antd";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // ConfirmEmail
  const onConfirm = async (values) => {
    let token = params.get("token");
    const data = await axios
      .get(
        "http://localhost:8080/api/v1/auth/register/confirm?token=" + token,
        {}
      )
      .then((res) => {
        // alert(res.data.message);
        window.location.assign("/login");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    onConfirm();
  });

  return <></>;
};

export default ConfirmEmail;