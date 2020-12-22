import { Avatar, Button, IconButton } from '@material-ui/core';
import React, {useState} from 'react';
import { yellow } from '@material-ui/core/colors';
import StarRateIcon from "@material-ui/icons/StarRate";
import CloseIcon from "@material-ui/icons/Close";
import './CardNotifi.css';
import axios from 'axios'


function CardNotifi({req_id ,name, profilePic, active, clickToCancel}){
    const clickCancel = () =>{
        const article = { user_id: localStorage.getItem('id'), userSending: req_id};
        axios.post('http://localhost:1000/cancel_notification', article)
        document.location.reload()
    }
    const clickToLike = () =>{
        const article = { userLogin_id: localStorage.getItem('id'), reqUser_id: req_id };
        axios.post('http://localhost:1000/acceptReact', article)
            .then(response => console.log(response));
            console.log('UserID ' + localStorage.getItem('id'))
            console.log('reqID ' + req_id)
        document.location.reload()
    }
    return (
        <>
        <div className='CardNotifi'>
            <div className='CardNotifi__info'>
                <Avatar className='CardNotifi__image' alt={name} src={profilePic}/>
                <div className='CardNotifi__details'>
                    <p>{name} đã thích bạn</p>
                </div>
            </div>
            <div className='CardNotifi__button'>
                <IconButton className='CardNotifi__superLike' onClick={clickToLike}>
                            <StarRateIcon/>
                </IconButton>
                        
                <IconButton className='CardNotifi__CloseIcon' onClick={clickCancel}>
                            <CloseIcon/>
                </IconButton>
            </div>
        </div>
        </>
    )
}

export default CardNotifi