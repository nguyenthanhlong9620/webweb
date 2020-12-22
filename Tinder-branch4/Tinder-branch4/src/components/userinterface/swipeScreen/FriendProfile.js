import React, {useState} from 'react'
import './FriendProfile.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    img: {
      width: theme.spacing(28),
      height: theme.spacing(35),
    },
  }));
function FriendProfile({unProfile, db, right , left}) {
    const classes = useStyles();

    const exit = () =>{
        unProfile();
    }

    const clickToCancel = () =>{
        left();
        unProfile();
    }

    const clickToLike = () =>{
        right();
        unProfile();
    }
    console.log(db)

    return (
        <div className='profile__bg-modal'>
            <div className='profile__window'>
                    <div className='exitIcon' onClick={exit}>
                        <Link>
                            <CloseIcon/>
                        </Link>
                    </div>
                    <div className='profile__infomation'>
                        <div className='profile__img'>
                            <div className='profile__avatar'>
                                    <Avatar variant="rounded" className={classes.img} src={db.file_name}/>
                            </div>
                        </div>
                        <h2>{db.name}</h2>
                        <p>{db.sex},{db.age} years old</p>
                        <p>{db.description}</p>
                    </div>
                    <div className= "profile__swipeButtons">
                        <IconButton className="profile__swipeButtons__left" onClick={clickToCancel}>
                            <CloseIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className="profile__swipeButtons__right" onClick={clickToLike}>
                            <FavoriteIcon fontSize='large'/>
                        </IconButton>
                    </div>
            </div>
        </div>
    )
}

export default FriendProfile
