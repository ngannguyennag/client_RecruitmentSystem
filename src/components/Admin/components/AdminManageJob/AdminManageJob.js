
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJob} from '../../../../actions/JobAction';
import axios from 'axios';
import './AdminManageJob.css';

function AdminManageCompany(props) {
    const dispatch = useDispatch();
    const [jobId, setJobId] = useState('');
    const [name, setName] = useState('');
    const jobs = useSelector(state => state.jobs.job);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedJobs, setUpdatedJobs] = useState([]); 
    useEffect(() => {
        dispatch(getAllJob(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedJobs(jobs); 
    }, [jobs]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = jobs[jobs.length - 1].id;
        axios.post('http://localhost:3000/users', { id: id, jobId: jobId, name: name })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    const FormatDate = (time) => {
        var dateFormat = new Date(time * 1000);
        return dateFormat.getDate() +
            "/" + (dateFormat.getMonth() + 1) +
            "/" + dateFormat.getFullYear();
    }
    const handleDeleteJob = (jobId, token) => {
        // setIsLoading(true);
        // dispatch(deleteCompany(userId, token))
        // .then(() => {
        //         dispatch(getAllCompany);
        //         setIsLoading(false);
        //         setUpdatedCompanies(companies);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setIsLoading(false); // Ẩn loading nếu xóa không thành công
        //     });
    }

    return (
        <div className="admin-job">
            <span>Danh sách công việc</span>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-job-list">
                        <div className="form-div">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Nhập vào id công việc" onChange={e => setJobId(e.target.value)}  style={{width: "250px", height:"35px"}} />
                                <input type="text" placeholder="Nhập vào tên công việc" onChange={e => setName(e.target.value)}  style={{width: "250px", height:"35px"}}/>
                                <button  style={{width: "50px", height:"35px"}}>Add</button>
                            </form>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>JobId</th>
                                    <th>Tên công việc</th>
                                    <th>Ngày đăng tuyển</th>
                                    <th>Ngày hết hạn</th>
                                    <th>Cấp bậc</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedJobs && updatedJobs.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.jobId}</td>
                                        <td>{item.jobName}</td>
                                        <td>{FormatDate(item.createdAt)}</td>
                                        <td>{FormatDate(item.expiresDate)}</td>
                                        <td>{item.jobLevel}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button onClick={() => handleDeleteJob(item.id, token)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
}

export default AdminManageCompany;
