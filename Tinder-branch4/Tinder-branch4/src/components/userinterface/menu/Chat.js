import React, {useState, useEffect} from 'react'
import Inbox from './Inbox'
import './Chat.css'
import axios from 'axios';

function Chat({activeScreenChat}) {
    const [dataMatch,setDataMatch] = useState([])
    const [x,sx] = useState(true)
    const getData = () =>{
        const article = { id: localStorage.getItem('id') };
        axios.post('http://localhost:1000/listFriendsReact', article)
            .then(response => setDataMatch(response.data));
    }
    if(x){
        getData()
        sx(false)
    }

    return (
        <>
        {/* {chatScreen?(<ScreenChat name='Lisa' status='1 minutes ago' active={active}/>)
        :(
            <div className='inBox'> */}
            {dataMatch.map((h) => (<Inbox
                    activeScreenChat = {activeScreenChat}
                    db = {h}
                />))}
            {/* </div>)} */}
        </>
    )
}

export default Chat
