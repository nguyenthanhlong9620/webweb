import React, { useState, useEffect } from 'react'
import UserInterfaceHeader from '../userinterface/UserInterfaceHeader'
import TinderCards from '../userinterface/swipeScreen/TinderCards'
import Menu from '../userinterface/menu/Menu'
import './User.css'
import queryString from 'query-string';
import ScreenChat from '../userinterface/menu/ScreenChat'
import Menu1 from '../userinterface/menu1/Menu1'
import FriendProfile from '../userinterface/swipeScreen/FriendProfile'
import ChangeProfile from '../userinterface/menu1/ChangeProfile'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import auth from "../../auth";
import axios from 'axios';

function User({ location }) {
    const uid = auth.checkLogin();
    const [profile, setProfile] = useState(false)
    const [changeProfile, setChangeProfile] = useState(false)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [screenChat, setScreenChat] = useState(false)
    const { id } = queryString.parse(location.search);


    const handleSubmit = async(event) => {
          event.preventDefault();
          const dataList = await
          axios({
            method: 'get',
            url: 'http://localhost:1000/listUser',
            data: {
              id: '21'
            }
          });
          localStorage.setItem('listCardTinder', dataList)
          console.log('list' + localStorage.getItem('listCardTinder'))
        }
      
    const activeProfile = () => {
        setProfile(true);
    }
    const unactiveProfile = () => {
        setProfile(false);
    }

    const activeChangeProfile = () => {
        setChangeProfile(true);
    }

    const unactiveChangeProfile = () => {
        setChangeProfile(false);
    }

    const activeScreenChat = (a, b) => {
        setName(a)
        setStatus(b)
        setScreenChat(true);
    }
    const unActiveScreenChat = () => {
        setScreenChat(false);
    }
    useEffect(() => {
        console.log('lc: ' + location);
        console.log('id: ' + id);
    });

    return (
        <>
            <Route path="/">
                {uid ? <Redirect to={`/user?id=${uid}`} /> : <Redirect to="/" />}
            </Route>
            {profile && <FriendProfile unProfile={unactiveProfile} />}
            {changeProfile && <ChangeProfile unProfile={unactiveChangeProfile} />}
            <UserInterfaceHeader />
            <div className='userDisplay'>
                <div className='Menu'>
                    <Menu activeScreenChat={activeScreenChat} />
                </div>
                <div className='swipeDisplay'>
                    {screenChat ? (<ScreenChat unActiveScreenChat={unActiveScreenChat} name={name} status={status} />) : (<TinderCards profile={activeProfile} />)}
                </div>
                <div className='Menu'>
                    <Menu1 changeProfile={activeChangeProfile} />
                </div>
                <button onClick={handleSubmit}>click</button>
            </div>
        </>
    )
}

export default User;