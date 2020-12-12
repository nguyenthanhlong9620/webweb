import React, {useState} from 'react'
import Chat from './Chat'
import './Menu.css'
import NavbarMenu from '../NavbarMenu';
import Match from './Match';
import Like from './Like';

function Menu({activeScreenChat}) {
    const [messege, setMessege] = useState(false)
    const [match, setMatch] = useState(true)
    const [like, setLike] = useState(false)

    const clickToMatch = () =>{
        setLike(false);
        setMessege(false);
        setMatch(true);
    }
    const clickToLike = () =>{
        setLike(true);
        setMessege(false);
        setMatch(false);
    }
    const clickToMessege = () =>{
        setLike(false);
        setMessege(true);
        setMatch(false);
    }

    return (
    <div className='menu'>
        <NavbarMenu messege={clickToMessege} like={clickToLike} match={clickToMatch} active='false'/>
        <div className={messege ? 'active__messege' : 'nonactive__messege'}>
            <Chat activeScreenChat = {activeScreenChat}/>
        </div>
        <div className={like ? 'active__like' : 'nonactive__like'}>
            <Like/>
        </div>
        <div className={match ? 'active__match' : 'nonactive__match'}>
            <Match/>
        </div>
    </div>
    )
}

export default Menu