import { Avatar, Button, IconButton } from '@material-ui/core';
import React, {useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import ForumIcon from '@material-ui/icons/Forum';
import './CardFriend.css';


function CardFriend({name, profilePic, info, active}){
    return (
        <div className='cardFriend'>
            <div className='cardFriend__info'>
                <Avatar className='cardFriend__image' alt={name} src={profilePic}/>
                <div className='cardFriend__details'>
                    <h2>{name}</h2>
                    <p>{info}</p>
                </div>
            </div>
            <div className='cardFriend__button'>
                {active?(
                    <IconButton className='cardFriend__superLike'>
                        <ForumIcon/>
                    </IconButton>
                ):(
                    <IconButton className='cardFriend__superLike'>
                        <StarRateIcon/>
                    </IconButton>
                )}
                <IconButton className='cardFriend__CloseIcon'>
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default CardFriend
