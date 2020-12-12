import React from 'react';
import '../App.css';
import {Button} from './Button';
import './HeroSection.css';
import WhatshotIcon from '@material-ui/icons/Whatshot';


function HeroSection() {
    return (
        <div className='hero-container'>
            <video src="/videos/video (2).mp4" autoPlay look muted loop />
            <h1>Match. Chat. Date.</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <Button
                className='btns'
                buttonStyle='btn--primary'
                buttonSize='btn--large'
                >
                    GET STARTED
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
