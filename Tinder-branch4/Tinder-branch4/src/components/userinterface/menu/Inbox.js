import { Avatar } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import './Inbox.css'
import { firestore } from '../../../firebase'
import moment from 'moment'


function Inbox({db, activeScreenChat}){
    const [message, setMessage] = useState('')
    const ref = firestore.collection('Message').doc(localStorage.getItem('id')).collection(`${db.user_id}`);
    const click = () =>{
        activeScreenChat(db.name, db)
    }
    function getDb() {
        ref.orderBy('date').onSnapshot((sn) => {
            sn.forEach((doc) => {
                setMessage(doc.data())
            });
        })  
    }
    useEffect(() => {
        getDb()
    }, [])
    return (
        <div className='boxChat' onClick={click}>
            <Avatar className='boxChat__image' src={db.file_name}/>
            <div className='boxChat__details'>
                <h2>{db.name}</h2>
                {message.name == localStorage.getItem('name') ? (<p>{'You: ' + message.message}</p>) : (<p>{message.message}</p>)}
            </div>
            {message.date &&(<p className='boxChat__timestamp'>{moment(message.date).fromNow()}</p>)}
        </div>
    )
}

export default Inbox
