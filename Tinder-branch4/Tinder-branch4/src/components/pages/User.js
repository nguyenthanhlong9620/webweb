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
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import auth from "../../auth";
import axios from 'axios';
import StartButton from '../userinterface/swipeScreen/StartButton';
import Hope from '../userinterface/swipeScreen/Hope';
import Trust from '../userinterface/swipeScreen/Trust';
import ChangeAvatar from '../userinterface/menu1/ChangeAvatar';
import Wall from '../userinterface/wall/Wall'

function User({ location }) {
    const [dataListUser, setDataListUser] = useState([])
    const uid = auth.checkLogin();
    const [profile, setProfile] = useState(false)
    const [changeProfile, setChangeProfile] = useState(false)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [screenChat, setScreenChat] = useState(false)
    const [card, setCard] = useState(false)
    const [bt, setBt] = useState(true)
    const { id } = queryString.parse(location.search);
    const [h, seth] = useState(false)
    const [t, sett] = useState(false)
    const [changeAvatar, setchangeAvatar] = useState(false);
    const [wall, setWall] = useState(false)
    const [dbWall, setdbWall] = useState([])
    const [dbm, setdbm] = useState([])
    const [xx,sxx] = useState(false)

    const handleSubmit = () => {
        const article = { user_id: localStorage.getItem('id') };
        axios.post('http://localhost:1000/testt', article)
            .then(response => setDataListUser(response.data));
        console.log(dataListUser)
        setBt(false)
        seth(true)
        setCard(true)
    }

    const activeChangeProfile = () => {
        setChangeProfile(true);
    }

    const unactiveChangeProfile = () => {
        setChangeProfile(false);
    }

    const activeScreenChat = (a , id1) => {
        setdbm(id1)
        setName(a)
        setScreenChat(true);
        setCard(false);
        setBt(false)
        setWall(false)
    }

    const unActiveScreenChat = () => {
        setScreenChat(false)
        setBt(true)
        setWall(false)
    }

    const activeWall = (db) => {
        setdbWall(db)
        setScreenChat(false);
        setCard(false);
        setBt(false)
        setWall(true)
    }
    const unActiveWall = () => {
        setScreenChat(false)
        setCard(false);
        setBt(true)
        setWall(false)
    }

    const activeChangeAvtart = () =>{
        setchangeAvatar(true)
    }

    const unActiveChangeAvtart = () =>{
        setchangeAvatar(false)
    }

    useEffect(() => {
        // console.log('lc: ' + location);
        console.log('id: ' + id);

    });

    const [img, setImg] = useState()
    const [x, sx] = useState(true)

    const getImg = () => {
        const article = { profileId: localStorage.getItem('profileId') };
        axios.post('http://localhost:1000/listImage', article)
            .then(response => setImg(response.data));
    }

    const hopeeee = () => {
        seth(false)
        setCard(false)
        sett(true)
        console.log('xin chao cuoc doi')
    }

    const trustt = () => {
        setCard(true)
        sett(false)
        console.log('thanh cong khong =(((')
    }

    if (x) {
        getImg()
        console.log(localStorage.getItem("profileId"))
        sx(false)
    }

    try {
        return (
            <>
                <Route path="/">
                    {uid ? <Redirect to={`/user?id=${uid}`} /> : <Redirect to="/" />}
                </Route>
                {changeProfile && <ChangeProfile unProfile={unactiveChangeProfile} />}
                {changeAvatar&& <ChangeAvatar unActiveChangeAvtart={unActiveChangeAvtart}/>}
                <UserInterfaceHeader />
                <div className='userDisplay'>
                    <div className='Menu'>
                        <Menu activeScreenChat={activeScreenChat} activeWall={activeWall}/> 
                    </div>
                    <div className='swipeDisplay'>
                        {t ? (<Trust click={trustt} />) : (<></>)}
                        {card ? (<TinderCards dataListUser={dataListUser} />) : (<></>)}
                        {screenChat ? (<ScreenChat unActiveScreenChat={unActiveScreenChat} dbm={dbm} name={name} status={status} />) : (<></>)}
                        {wall && <Wall unActiveWall={unActiveWall} db={dbWall}/>}
                        {h ? (<Hope click={hopeeee} />) : (<></>)}
                        {bt ? (<StartButton click={handleSubmit} />) : (<></>)}
                    </div>
                    {img ? (<div className='Menu'><Menu1 activeWall={activeWall} activeChangeAvtart ={activeChangeAvtart} changeProfile={activeChangeProfile} image={img[img.length - 1].file_name}/></div>) : (<></>)}
                </div>
            </>
        )
    } catch (error) {
        return (
            <>
                <Route path="/">
                    {uid ? <Redirect to={`/user?id=${uid}`} /> : <Redirect to="/" />}
                </Route>
                {changeProfile && <ChangeProfile unProfile={unactiveChangeProfile} />}
                {changeAvatar&& <ChangeAvatar unActiveChangeAvtart={unActiveChangeAvtart}/>}
                <UserInterfaceHeader />
                <div className='userDisplay'>
                    <div className='Menu'>
                    <Menu activeScreenChat={activeScreenChat} activeWall={activeWall}/> 
                    </div>
                    <div className='swipeDisplay'>
                        {t ? (<Trust click={trustt} />) : (<></>)}
                        {card ? (<TinderCards dataListUser={dataListUser} />) : (<></>)}
                        {screenChat ? (<ScreenChat unActiveScreenChat={unActiveScreenChat} dbm={dbm} name={name} status={status} />) : (<></>)}
                        {wall && <Wall unActiveWall={unActiveWall} db={dbWall}/>}
                        {h ? (<Hope click={hopeeee} />) : (<></>)}
                        {bt ? (<StartButton click={handleSubmit} />) : (<></>)}
                    </div>
                    {img ? (<div className='Menu'><Menu1 activeWall={activeWall} activeChangeAvtart ={activeChangeAvtart} changeProfile={activeChangeProfile} image={''}/></div>) : (<></>)}
                </div>
            </>
        )
    }

        
    }

export default User;