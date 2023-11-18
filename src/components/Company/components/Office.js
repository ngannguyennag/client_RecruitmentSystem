import React from 'react'
import office1 from './images/office1.jpg'
import office2 from './images/office2.jpg'
import office3 from './images/office3.jpg'
import office4 from './images/office4.jpg'
import office5 from './images/office5.jpg'
import office6 from './images/office6.jpg'
import office7 from './images/office7.jpg'
import office8 from './images/office8.jpg'

import './Office.css'

const Office = () => {
    return (
        <div className='office' id='office'>
            <div className='container'>
                <h2>Our Office</h2>
                <span className='line'></span>
                <div className='row'>
                    <ul className='ourOffice'>
                    <li className='card'>
                        <img src={office1} alt='office1'/> 
                    </li>
                    <li className='card'>
                        <img src={office2} alt='office2'/> 
                    </li>
                    <li className='card'>
                        <img src={office3} alt='office3'/> 
                    </li>
                    <li className='card'>
                        <img src={office4} alt='office4'/> 
                    </li>
                    <li className='card'>
                        <div className='cardText'>
                        {/* <h3>ADDRESS</h3> */}
                        <p>ADDRESS</p>
                        <p>Tháp BIDV - 194 Trần Quang Khải, Hoàn Kiếm, Hà Nội</p>
                        <p>Hotline: 19009247</p>
                        <p>Email: tuyendung.tcns@bidv.com.vn</p>
                        <p>190 Chi nhánh trên toàn quốc</p>
                        </div>
                        
                    </li>
                    <li className='card'>
                        <img src={office5} alt='office5'/> 
                    </li>
                    <li className='card'>
                        <img src={office6} alt='office6'/> 
                    </li>
                    <li className='card'>
                        <img src={office7} alt='office7'/> 
                    </li>
                    <li className='card'>
                        <img src={office8} alt='office8'/> 
                    </li>
                    </ul>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Office
