import React, {useState} from 'react'
import '../menu/Menu.css'
import NavbarMenu from '../NavbarMenu';
import Profile from './Profile';
import Notification from './Notification';
import ChangeAvatar from './ChangeAvatar';
import axios from 'axios';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';


function Menu1({changeProfile, image, activeChangeAvtart, activeWall}) {
    const name = localStorage.getItem('name');
    const sex = localStorage.getItem('sex');
    const age = localStorage.getItem('age');
    const des = localStorage.getItem('des');
    const [profile, setProfile] = useState(true)
    const [notification, setNotification] = useState(false)
    const [t,sett] = useState(false)
    const [h, seth] = useState(false)

    // const getData = () =>{
    //     const article = { id: localStorage.getItem('id') };
    //     axios.post('http://localhost:1000/listWaiting', article)
    //         .then(response => setDataListWaiting(response.data));
    //     console.log(dataListWaiting)
    // }
    const clickToProfile = () =>{
        setProfile(true);
        setNotification(false);
    }
    const clickToNotification = () =>{
        setProfile(false);
        setNotification(true);
    }

    return (
    <div className='menu'>
        <NavbarMenu profile={clickToProfile} notification={clickToNotification}/>
        {profile ? (<div className={'active__profile'}><Profile activeWall={activeWall} activeChangeAvtart={activeChangeAvtart} image={image} changeProfile={changeProfile} name={name} sex={sex} age={age} des={des}/></div>) : (<></>)}
        {notification ? (<div className={'active__notification'}><Notification/></div>) : (<></>)}
    </div>
    )
}

export default Menu1