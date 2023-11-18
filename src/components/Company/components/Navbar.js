import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'
import { HomeOutlined, InboxOutlined, InfoCircleFilled, BankOutlined} from "@ant-design/icons";
import '../index.css'
const NavbarCompany = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMenu = () => setClick(false)
    return (
        <div className='headerCompany'>
            <nav className='navbarCompany'>
                <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}
                </div>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to='hero' spy={true} smooth={true} offset={-100} duration={500} onclick={closeMenu} >
                            <i className="account-icon-menu"><HomeOutlined /></i>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='about' spy={true} smooth={true} offset={-100} duration={500} onclick={closeMenu} >
                            <i className="account-icon-menu"><InboxOutlined /></i>
                            Jobs      
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='office' spy={true} smooth={true} offset={-100} duration={500} onclick={closeMenu} >
                            <i className="account-icon-menu"><BankOutlined /></i>
                            Office
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='demo' spy={true} smooth={true} offset={-150} duration={500} onclick={closeMenu} >
                            <i className="account-icon-menu"><InfoCircleFilled /></i>
                            Stories
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarCompany
