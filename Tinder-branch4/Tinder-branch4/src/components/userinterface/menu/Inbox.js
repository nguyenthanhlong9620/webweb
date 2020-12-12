import { Avatar } from '@material-ui/core'
import React, {useState} from 'react'
import './Inbox.css'


function Inbox({name, timestammp, profilePic, message, activeScreenChat}){
    const click = () =>{
        activeScreenChat(name,timestammp)
    }
    return (
        <div className='boxChat' onClick={click}>
            <Avatar className='boxChat__image' alt={name} src={profilePic}/>
            <div className='boxChat__details'>
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
            <p className='boxChat__timestamp'>{timestammp}</p>
        </div>
    )
}

export default Inbox
