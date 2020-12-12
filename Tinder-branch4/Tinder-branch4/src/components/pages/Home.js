import React from 'react'
import '../../App.css'
import Cards from '../Cards'
import Footer from '../Footer'
import HeroSection from '../HeroSection'
import Navbar from '../Navbar'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import auth from "../../auth";

function Home() {
    const id = auth.checkLogin();
    console.log("UUUUUU", id);
    return(
        <>
            <Route path="/">
                {id ?  <Redirect to = {`/user?id=${id}`} /> : <Redirect to="/" />}
            </Route>
            <Navbar/>
            <HeroSection />
            <Cards />
            <Footer/>
        </>
    )
}

export default Home;