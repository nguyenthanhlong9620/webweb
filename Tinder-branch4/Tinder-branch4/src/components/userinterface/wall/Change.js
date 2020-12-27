import React, {useState} from 'react'
import './Change.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import axios from 'axios';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    img: {
      width: theme.spacing(28),
      height: theme.spacing(35),
    },
    rp: {
        width: theme.spacing(40),
    }
  }));
function Change({unChange, id}) {
    const classes = useStyles();
    const [ct, setCt] = useState('');

    const pushChange = () => {
        const article = {id_post: id, content: ct};
        axios.post('http://localhost:1000/update_post', article)
        document.location.reload()
    }

    const exit = () =>{
        unChange();
    }

    return (
        <div className='change__bg-modal'>
            <div className='change__window'>
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
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    defaultValue={''}
                                    onChange={(event) => setCt(event.target.value)}
                                />
                    </div>
                    <div className= "profile__swipeButtons">
                        <IconButton className="profile__swipeButtons__left" onClick={pushChange}>
                            <DoneIcon fontSize='large'/>
                        </IconButton>
                    </div>
            </div>
        </div>
    )
}

export default Change
