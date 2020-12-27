import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import WindowLg from './WindowLg';
import './WindowLg.css';
import {Button} from './Button';
import Logo1 from './Logo1';
import HeroSection from './HeroSection';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [login, setLogin] = useState(false);

    const loginClick = () => {
        setLogin(!login);
        window.scrollTo(0, 0);
    }
    const click_about_us = () =>{
        window.scrollTo({
            top: 1550,
            behavior: 'smooth'
          })
    }
    const click_s = () =>{
        window.scrollTo({
            top: 800,
            behavior: 'smooth'
          })
    }
    const click_sx = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
    }


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <=960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        <Logo1/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={click_sx}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={click_s}>
                                Services
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={click_about_us}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
                <WindowLg login={login} close={loginClick}/>
                <HeroSection signup={loginClick}/>
        </>
    )
}

export default Navbar;