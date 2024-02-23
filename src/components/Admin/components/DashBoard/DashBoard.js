import React, { useEffect, useState } from "react";
import {
  BellOutlined,
  BankOutlined,
  FileSearchOutlined,
  SolutionOutlined, 
  UserOutlined
} from "@ant-design/icons";
import "./DashBoard.css";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidate, getAllCandidateDashboard } from "../../../../actions/CandidateAction";
import { getAllCompany } from "../../../../actions/CompanyAction";
import { getAllJob } from "../../../../actions/JobAction";
import { getRecruitment } from "../../../../actions/RecruitmentAction";

export default function DashBoard() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
  const allCandidate = useSelector(state => state.candidateDashboard.candidateDashboard);
  const allCompany = useSelector(state => state.companyAll.companyAll);
  const allJob = useSelector(state => state.jobAll.jobAll);
  const allRecruitment = useSelector(state => state.recruitmentAll.recruitment);

  useEffect(() => {
    dispatch(getAllCandidateDashboard(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllJob(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getRecruitment());
  }, [dispatch]);

  const numberOnMonth = (data, month, year) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (data) {
      const untilMonth = data?.filter((d) => {
          const noMonth = new Date(Date.UTC(...d.createDate)).getMonth();
          const noYear = new Date(Date.UTC(...d.createDate)).getFullYear();
          return noYear < year || (noYear === year && noMonth <= month);
      });
      if (year === currentYear && month > currentMonth) {
          return 0;
      }
      return untilMonth.length;
  }
    return 0;
  };
  
  const getLastFiveYears = () => {
      const currentYear = new Date().getFullYear();
      const lastFiveYears = [];
      for (let i = 0; i < 5; i++) {
          lastFiveYears.push(currentYear - i);
      }
      return lastFiveYears;
  };
    
const [activeYearCandidate, setActiveYearCandidate] = useState(getLastFiveYears()[0]);
const [activeYearCompany, setActiveYearCompany] = useState(getLastFiveYears()[0]);
const [activeYearJob, setActiveYearJob] = useState(getLastFiveYears()[0]);
const [activeYearRecruitment, setActiveYearRecruitment] = useState(getLastFiveYears()[0]);

const handleYearClickCandidate = (year) => {
    setActiveYearCandidate(year);
};

const handleYearClickCompany = (year) => {
    setActiveYearCompany(year);
};

const handleYearClickJob = (year) => {
  setActiveYearJob(year);
};

const handleYearClickRecruiment = (year) => {
  setActiveYearRecruitment(year);
};

function generateChartOptions(name, data) {
    return {
        series: [{
            name: name,
            data: data
        }],
        options: {
            color: ['#6ab04c'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    };
}

function generateMonthlyData(data, activeYear) {
  var monthlyData = [];
  for (let i = 1; i <= 12; i++) {
      monthlyData.push(numberOnMonth(data, i, activeYear));
  }
  return monthlyData;
}
const candidateChartOptions = generateChartOptions('#candidate', generateMonthlyData(allCandidate, activeYearCandidate));
const companyChartOptions = generateChartOptions('#company', generateMonthlyData(allCompany, activeYearCompany));
const jobChartOptions = generateChartOptions('#job', generateMonthlyData(allJob, activeYearJob));
const recruitmentChartOptions = generateChartOptions('#recruitment', generateMonthlyData(allRecruitment, activeYearRecruitment));

    return (
      <section id="dashboard">
        <div className="dashboard">
          <div className="dashboard-top">
            <div className="dashboard-top-content">
              <li className="dashboard-top-content-avatar">
                <span style={{ color: '#0e599f', fontSize: '16px' }}>Welcome back, Admin</span>
              </li>
              {/* <li className="dashboard-top-content-bell">
                <BellOutlined></BellOutlined>
              </li> */}
            </div>
          </div>

          <div className="dashboard-middle">
            <div className="dashboard-middle-statistic">

              <div className="dashboard-middle-statistic-content">
                <div className="dashboard-middle-statistic-title">
                    <span className="title">Số lượng ứng viên: {allCandidate?.length}
                    </span>
                </div>                
                <div className="dashboard-middle-chart">
                  <h3>Biểu đồ số lượng ứng viên</h3>
                  <div className="tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    {getLastFiveYears().reverse().map((year) => (
                      <div
                          key={year}
                          className={activeYearCandidate === year ? "tab active" : "tab"}
                          onClick={() => handleYearClickCandidate(year)}
                          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', bcandidate: '1px solid #ccc', bcandidateRadius: '5px', backgroundColor: activeYearCandidate === year ? '#ccc' : 'inherit' }}
                      >
                          {year}
                      </div>
                    ))}
                  </div>
                  <Chart
                    options={candidateChartOptions.options}
                    series={candidateChartOptions.series}
                    type='bar'
                    width="380"
                  />
                </div>
              </div>
              <div className="dashboard-middle-statistic-content">
                <div className="dashboard-middle-statistic-title">
                    <span className="title">Số lượng công ty: {allCompany?.length}
                    </span>
                </div>                
                <div className="dashboard-middle-chart">
                  <h3>Biểu đồ số lượng công ty</h3>
                  <div className="tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    {getLastFiveYears().reverse().map((year) => (
                      <div
                          key={year}
                          className={activeYearCompany === year ? "tab active" : "tab"}
                          onClick={() => handleYearClickCompany(year)}
                          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', bcandidate: '1px solid #ccc', bcandidateRadius: '5px', backgroundColor: activeYearCompany === year ? '#ccc' : 'inherit' }}
                      >
                          {year}
                      </div>
                    ))}
                  </div>
                  <Chart
                    options={companyChartOptions.options}
                    series={companyChartOptions.series}
                    type='bar'
                    width="380"
                  />
                </div>
              </div>

              <div className="dashboard-middle-statistic-content">
                <div className="dashboard-middle-statistic-title">
                    <span className="title">Số lượng công việc: {allJob?.length}
                    </span>
                </div>                
                <div className="dashboard-middle-chart">
                  <h3>Biểu đồ số lượng công việc</h3>
                  <div className="tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    {getLastFiveYears().reverse().map((year) => (
                      <div
                          key={year}
                          className={activeYearJob === year ? "tab active" : "tab"}
                          onClick={() => handleYearClickJob(year)}
                          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', bcandidate: '1px solid #ccc', bcandidateRadius: '5px', backgroundColor: activeYearJob === year ? '#ccc' : 'inherit' }}
                      >
                          {year}
                      </div>
                    ))}
                  </div>
                  <Chart
                    options={jobChartOptions.options}
                    series={jobChartOptions.series}
                    type='bar'
                    width="380"
                  />
                </div>
              </div>
              <div className="dashboard-middle-statistic-content">
                <div className="dashboard-middle-statistic-title">
                    <span className="title">Số lượng ứng tuyển: {allRecruitment?.length}
                    </span>
                </div>                
                <div className="dashboard-middle-chart">
                  <h3>Biểu đồ số lượng ứng tuyển</h3>
                  <div className="tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    {getLastFiveYears().reverse().map((year) => (
                      <div
                          key={year}
                          className={activeYearRecruitment === year ? "tab active" : "tab"}
                          onClick={() => handleYearClickRecruiment(year)}
                          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', bcandidate: '1px solid #ccc', bcandidateRadius: '5px', backgroundColor: activeYearRecruitment === year ? '#ccc' : 'inherit' }}
                      >
                          {year}
                      </div>
                    ))}
                  </div>
                  <Chart
                    options={recruitmentChartOptions.options}
                    series={recruitmentChartOptions.series}
                    type='bar'
                    width="380"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }