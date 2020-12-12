import { Avatar, Button, IconButton } from '@material-ui/core';
import React, {useState} from 'react';
import { yellow } from '@material-ui/core/colors';
import StarRateIcon from "@material-ui/icons/StarRate";
import './CardNotifi.css';


function CardNotifi({name, profilePic, active}){
    return (
        <div className='CardNotifi'>
            <div className='CardNotifi__info'>
                <Avatar className='CardNotifi__image' alt={name} src={profilePic}/>
                <div className='CardNotifi__details'>
                    <p>{name} và bạn đã MATCH, giờ các bạn có thể trò chuyện với nhau.</p>
                </div>
            </div>
            <StarRateIcon style={{color: yellow[500]}}/>
        </div>
    )
}

export default CardNotifi