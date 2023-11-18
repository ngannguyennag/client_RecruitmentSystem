import React from 'react'
import './Home.css'
import logoCompany from './images/company.jpg'

const Home = () => {
    return (
        <div className='hero' id='hero'>
            <div className='contentCompany'>
                <div className='logoCompany'>
                    <img src={logoCompany} alt='logoCompany' />
                </div>
                <div className='nameCompany'>
                    Ngân Hàng TMCP Đầu Tư & Phát Triển Việt Nam (BIDV)
                <li>
                    <i> Đà Nẵng ,Hà Nội, Hồ Chí Minh,... </i>
                    <i> | https://tuyendung.bidv.com.vn/</i> 
                    
                </li>
                <li>
                <i> Banking </i>
                    <i> | Find us on...</i>     
                </li>
               
                </div>
                <button href='/' className='button'>Follow</button>
            </div>
        </div>
    )
}

export default Home
