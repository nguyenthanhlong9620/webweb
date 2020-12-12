import React from 'react'
import './Logo.css'

function Logo({size}) {
    return (
        <div>
            <img src={'/images/Logo1.png'} className={size}/>
        </div>
    )
}

export default Logo
