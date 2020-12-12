import React from 'react';
import './NavbarMenu.css';

function NavbarMenu({messege,match,like,profile,notification,active}) {
    return (
        <div>
            {active?(<nav className='menuNav'>
                <div className='menuNav__item' onClick={like}>Like</div>
                <div className='menuNav__item' onClick={match}>Match</div>
                <div className='menuNav__item' onClick={messege} >Message</div>
                <div class='animation'/>
            </nav>):(<nav className='menuNav'>
                <div className='menuNav__item1' onClick={profile}>Profile</div>
                <div className='menuNav__item1' onClick={notification}>Notification</div>
                <div class='animation'/>
            </nav>)}
        </div>
    )
}

export default NavbarMenu