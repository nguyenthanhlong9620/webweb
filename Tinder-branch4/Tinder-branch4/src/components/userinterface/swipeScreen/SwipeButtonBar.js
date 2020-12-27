import React, { useState } from 'react'
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from "@material-ui/core/IconButton"
import "./SwipeButtonBar.css"
import FriendProfile from './FriendProfile';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BlockIcon from '@material-ui/icons/Block';
import Report from './Report'
import axios from 'axios';

function SwipeButtonBar({left, right, db}) {
    const [profile, setProfile] = useState(false)
    const [report, setReport] = useState(false)
    const activeProfile = () => {
        setProfile(true)
        // const article = { user_id: id };
        // axios.post('http://localhost:1000/details_Infor', article)
        //     .then(response => console.log(response.data));
    }
    const unactiveProfile = () => {
        setProfile(false);
    }
    // const getData = (id) =>{
    //     const article = { user_id: id };
    //     axios.post('http://localhost:1000/details_Infor', article)
    //         .then(response => setDb(response.data));
    // }
    const activeReport = () => {
        setReport(true)
    }
    const unactiveReport = () => {
        setReport(false);
    }
    return (
        <>
        {profile && <FriendProfile unProfile={unactiveProfile} db = {db} left={left} right={right}/>}
        {report && <Report unReport={unactiveReport} rpID={db.user_id}/>}
        <div className= "swipeButtons">
            <IconButton className="swipeButtons__left" onClick={left}>
                <CloseIcon fontSize='large'/>
            </IconButton>
            <IconButton className="swipeButtons__right" onClick={right}>
                <FavoriteIcon fontSize='large'/>
            </IconButton>
            <IconButton className="ReportProblemIcon" onClick = {activeReport}>
                <ReportProblemIcon fontSize='large'/>
            </IconButton>            <IconButton className="swipeButtons__lightning" onClick={activeProfile}>
                <MoreHorizIcon fontSize='large'/>
            </IconButton>
        </div>
        </>
    )
}

export default SwipeButtonBar