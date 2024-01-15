import React from "react";
import {
  BellOutlined,
  SearchOutlined,
  FileTextOutlined,
  UserOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import "./DashBoardHR.css";
import ChartDashBoard from "./ChartDashBoard";
import { useDispatch } from 'react-redux';
import {signOut} from '../../../../actions/AuthenticationAction'
import { ScheduleOutlined } from "@ant-design/icons";


export default function DashBoardHR() {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <SearchOutlined></SearchOutlined>
              </span>
            </form>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <UserOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">72</span>
                  <span className="title">Lượt ứng tuyển</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                <ScheduleOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">25</span>
                  <span className="title">Công việc</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                <CommentOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">20</span>
                  <span className="title">Tin nhắn</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <FileTextOutlined></FileTextOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">18</span>
                  <span className="title">Hồ sơ gợi ý</span>
                </div>
              </li>
            </div>
          </div>
          {/* <ChartDashBoard></ChartDashBoard> */}
        </div>

        <div className="dashboard-new">
          <div className="dashboard"></div>
          <div className="dashboard"></div>
        </div>
      </div>
    </section>
  );
}
