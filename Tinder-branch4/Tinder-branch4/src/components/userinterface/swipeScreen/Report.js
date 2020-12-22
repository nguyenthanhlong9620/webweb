import React, {useState} from 'react'
import './FriendProfile.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    img: {
      width: theme.spacing(28),
      height: theme.spacing(35),
    },
    rp: {
        width: theme.spacing(40),
    }
  }));
function FriendProfile({unReport, rpID}) {
    const classes = useStyles();
    const [ct, setCt] = useState('');

    const pushReport = () => {
        unReport();
        console.log(localStorage.getItem("id"),ct,rpID)
        const article = { user_id: localStorage.getItem("id"), content: ct, reportedID: rpID };
        axios.post('http://localhost:1000/sending_report', article)
        
    }

    const exit = () =>{
        unReport();
    }

    return (
        <div className='profile__bg-modal'>
            <div className='profile__window'>
                    <div className='exitIcon' onClick={exit}>
                        <Link>
                            <CloseIcon/>
                        </Link>
                    </div>
                    <div className='profile__infomation'>
                            <h2>Report</h2>
                            <TextField
                                    className={classes.rp}
                                    label="Content"
                                    multiline
                                    rows={18}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    defaultValue={''}
                                    onChange={(event) => setCt(event.target.value)}
                                />
                    </div>
                    <div className= "profile__swipeButtons">
                        <IconButton className="profile__swipeButtons__right" onClick={exit}>
                            <CloseIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className="profile__swipeButtons__left" onClick={pushReport}>
                            <ReportProblemIcon fontSize='large'/>
                        </IconButton>
                    </div>
            </div>
        </div>
    )
}

export default FriendProfile
