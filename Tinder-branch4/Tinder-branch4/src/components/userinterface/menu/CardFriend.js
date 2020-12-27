import { Avatar, Button, IconButton } from '@material-ui/core';
import React, {useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import ForumIcon from '@material-ui/icons/Forum';
import axios from 'axios'
import './CardFriend.css';


function CardFriend({name, profilePic, info, active, id, activeWall, db, activeScreenChat}){
    const clickCancelLike = () =>{
        const article = { user_id: localStorage.getItem('id'), userResponse: id};
        axios.post('http://localhost:1000/cancel_like', article)
        document.location.reload()
    }
    const clickCancelMatch = () =>{
        const article = { user_id: localStorage.getItem('id'), userSending: id};
        axios.post('http://localhost:1000/cancel_match', article)
        document.location.reload()
    }
    const click = () =>{
        activeWall(db)
    }
    const clickToMessage = () =>{
        activeScreenChat(name, db)
        console.log(db)
    }
    if(active){
        return (
            <div className='cardFriend' onClick={click}>
                <div className='cardFriend__info'>
                    <Avatar className='cardFriend__image' alt={name} src={profilePic}/>
                    <div className='cardFriend__details'>
                        <h2>{name}</h2>
                        <p>{info}</p>
                    </div>
                </div>
                <div className='cardFriend__button'>
                    <>
                        <IconButton className='cardFriend__CloseIcon' onClick={clickCancelMatch}>
                            <CloseIcon/>
                        </IconButton>
                    </>
                </div>
            </div>
        )
    } else
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
                <IconButton className='cardFriend__CloseIcon' onClick={clickCancelLike}>
                    <CloseIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default CardFriend
