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
import StartButton from '../userinterface/swipeScreen/StartButton';
import Hope from '../userinterface/swipeScreen/Hope'

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
    const [f, setf] = useState(false)


    const handleSubmit = () => {
        //   event.preventDefault();
        //   const dataList = await
        //   axios({
        //     method: 'post',
        //     url: 'http://localhost:1000/listUser',
        //     data: {
        //       id: '41'
        //     }
        //   });
        // //   localStorage.setItem('listCardTinder', dataList)
        // //   console.log('list' + localStorage.getItem('listCardTinder'))
        // setDataListUser(dataList.data)
        // console.log(dataList.data)
        const article = { id: '41' };
        axios.post('http://localhost:1000/listUser', article)
            .then(response => setDataListUser(response.data));
            console.log(dataListUser)
            setBt(false)
            seth(true)
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
        setCard(false);
    }
    const unActiveScreenChat = () => {
        setScreenChat(false);
        setCard(true);
    }
    useEffect(() => {
        console.log('lc: ' + location);
        console.log('id: ' + id);
        
    });

    const hopeeee = () => {
        seth(false)
        setCard(true)
        console.log('xin chao cuoc doi')
    }

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
                    {screenChat ? (<ScreenChat unActiveScreenChat={unActiveScreenChat} name={name} status={status} />) : (<></>)}
                    {card ? (<TinderCards profile={activeProfile} dataListUser = {dataListUser} />) : (<></>)}
                    {h ? (<Hope click={hopeeee}/>):(<></>)}
                    {bt ? (<StartButton click={handleSubmit} />):(<></>)}
            
                </div>
                <div className='Menu'>
                    <Menu1 changeProfile={activeChangeProfile} />
                </div>
            </div>
        </>
    )
}

export default User;