import React from 'react';
import { Link } from 'react-router-dom';
import './TinderButton.css'


function TinderButton({children, onClick}) {
    return (
    <div>
        <button className="Tdbt" onClick={onClick}>{children}</button>
    </div>
    )
}

export default TinderButton