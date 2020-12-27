import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/pages/Home'
import Footer from './components/Footer';
import NavbarMenu from './components/userinterface/NavbarMenu';
import User from './components/pages/User';
import InfoSetting from './components/userinterface/InfoSetting';
import Test from './test';
import Welcome from './components/pages/Welcome'

const id = localStorage.getItem('id');

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/user' exact component={User}/>
          <Route path='/infoSetting' exact component={InfoSetting}/>
          <Route path='/test' exact component={Welcome}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
