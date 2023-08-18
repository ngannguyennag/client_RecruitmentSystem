
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany} from '../../../../actions/CompanyAction';
import axios from 'axios';
import './AdminManageCompany.css';

function AdminManageCompany(props) {
    const dispatch = useDispatch();
    const [companyId, setCompanyId] = useState('');
    const [name, setName] = useState('');
    const companies = useSelector(state => state.companies.company);
    const token = JSON.parse(localStorage.getItem('userInfo')).access_token;
    const [isLoading, setIsLoading] = useState(false);
    const [updatedCompanies, setUpdatedCompanies] = useState([]); 
    useEffect(() => {
        dispatch(getAllCompany(token));
    }, [dispatch]);
    useEffect(() => {
        setUpdatedCompanies(companies); 
    }, [companies]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = companies[companies.length - 1].id;
        axios.post('http://localhost:3000/users', { id: id, companyId: companyId, name: name })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const handleDeleteCompany = (companyId, token) => {
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

    console.log(updatedCompanies);
    console.log(setUpdatedCompanies);

    return (
        <div className="admin-company">
            <span>Danh sách các công ty</span>
            {
                isLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div className="admin-company-list">
                        <div className="form-div">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Nhập vào id công ty" onChange={e => setCompanyId(e.target.value)}  style={{width: "250px", height:"35px"}} />
                                <input type="text" placeholder="Nhập vào tên công ty" onChange={e => setName(e.target.value)}  style={{width: "250px", height:"35px"}}/>
                                <button  style={{width: "50px", height:"35px"}}>Add</button>
                            </form>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>CompanyId</th>
                                    <th>Tên công ty</th>
                                    <th>Địa chỉ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedCompanies && updatedCompanies.map((item, index) => ( // Render danh sách từ updatedUsers thay vì users
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.companyId}</td>
                                        <td>{item.companyName}</td>
                                        <td>{item.companyAddress}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button onClick={() => handleDeleteCompany(item.id, token)}>Delete</button>
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
