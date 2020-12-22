import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/pages/Home'
import Footer from './components/Footer';
import NavbarMenu from './components/userinterface/NavbarMenu';
import User from './components/pages/User';
import InfoSetting from './components/userinterface/InfoSetting';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Test() {
    let history = useHistory();
    const [x,sx] = useState(true)
    const getImg = () => {
        const article = { user_id: localStorage.getItem('id') };
        console.log(localStorage.getItem('id'))
        axios.post('http://localhost:1000/profileId', article)
            .then(response => localStorage.setItem("profileId",response.data[0].id));
    }
    const c = () =>{
      console.log(localStorage.getItem("profileId"))
      history.push(`/user?id=${localStorage.getItem('id')}`);
    }

  return (
    <>
    <div>Welcome to Tinduet</div>
      <button onClick={getImg}>Start</button>
      <button onClick={c}>click</button>
    </>
  );
}

export default Test;
