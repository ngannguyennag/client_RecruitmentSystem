import React from "react";
import {
  BellOutlined,
  BankOutlined,
  FileSearchOutlined,
  SolutionOutlined, 
  UserOutlined
} from "@ant-design/icons";
import "./DashBoard.css";
import { Bar } from 'react-chartjs-2';
export default function DashBoard() {
    // const data = {
    //   labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    //   datasets: [
    //     {
    //       label: 'Số lượng',
    //       backgroundColor: 'rgba(75,192,192,0.4)',
    //       borderColor: 'rgba(75,192,192,1)',
    //       borderWidth: 1,
    //       hoverBackgroundColor: 'rgba(75,192,192,0.6)',
    //       hoverBorderColor: 'rgba(75,192,192,1)',
    //       data: [12, 19, 3, 5, 2],
    //     },
    //   ],
    // };
    // const options = {
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // };
    return (
      <section id="dashboard">
        <div className="dashboard">
          <div className="dashboard-top">
            <div className="dashboard-top-content">
              <li className="dashboard-top-content-avatar">
                <span style={{ color: '#0e599f', fontSize: '16px' }}>Welcome back, Admin</span>
              </li>
              <li className="dashboard-top-content-bell">
                <BellOutlined></BellOutlined>
              </li>
            </div>
          </div>

          <div className="dashboard-middle">
            <div className="dashboard-middle-statistic">
              <div className="dashboard-middle-statistic-content">
                <li>
                  <div>
                    {/* <h2>Biểu đồ cột</h2> */}
                    {/* <Bar data={data} options={options} /> */}
                  </div>
                  <div className="dashboard-middle-statistic-icon">
                    <UserOutlined />
                  </div>
                  <div className="dashboard-middle-statistic-title">
                    <span className="total">20</span>
                    <span className="title">Số lượng ứng viên</span>
                  </div>
                </li>
              </div>
              <div className="dashboard-middle-statistic-content">
                <li>
                  <div className="dashboard-middle-statistic-icon">
                  <BankOutlined />
                  </div>
                  <div className="dashboard-middle-statistic-title">
                    <span className="total">6</span>
                    <span className="title">Số lượng công ty</span>
                  </div>
                </li>
              </div>
              <div className="dashboard-middle-statistic-content">
                <li>
                  <div className="dashboard-middle-statistic-icon">
                  <FileSearchOutlined />
                  </div>
                  <div className="dashboard-middle-statistic-title">
                    <span className="total">18</span>
                    <span className="title">Số lượng công việc</span>
                  </div>
                </li>
              </div>
              <div className="dashboard-middle-statistic-content">
                <li>
                  <div className="dashboard-middle-statistic-icon">
                  <SolutionOutlined />
                  </div>
                  <div className="dashboard-middle-statistic-title">
                    <span className="total">20</span>
                    <span className="title">Số lượt ứng tuyển</span>
                  </div>
                </li>
              </div>
            </div>
          </div>

          <div className="dashboard-new">
            <div className="dashboard"></div>
            <div className="dashboard"></div>
          </div>
        </div>
      </section>
    );
  }
