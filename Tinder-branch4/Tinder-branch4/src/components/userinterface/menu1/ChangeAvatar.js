import React, { useState, useMemo } from 'react'
import './ChangeProfile.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import {storage} from '../../../firebase'

const useStyles = makeStyles((theme) => ({
    rp: {
        width: theme.spacing(40),
    },
    formControl: {
        minWidth: 120,
    },
    img: {
        width: theme.spacing(28),
        height: theme.spacing(35),
    },
    photo: {
        '&:hover': {
            border: '2px solid #ec5e6f',
            cursor: 'pointer',
        },
        border: '2px solid #62b4f9',
        width: theme.spacing(13),
        height: theme.spacing(18),
    }
}));

function ChangeAvatar(unActiveChangeAvtart) {
    const classes = useStyles();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
          console.log(e.target.files[0])
        }
      }
      const pushAvatar = () =>{
        const article = {profileId: localStorage.getItem('profileId'), linkImage: url};
        axios.post('http://localhost:1000/linkImage', article)
        document.location.reload()
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  //pushImgtoDb(url)
                  setUrl(url)
              });
          },
        );
      }

    return (
            <div className='profile__bg-modal'>
            <div className='profile__window'>
            <div className='exitIcon' onClick={unActiveChangeAvtart}>
                    <Link>
                        <CloseIcon />
                    </Link>
                </div>
            <div className='profile__infomation'>
                        <div className='profile__img'>
                            <div className='profile__avatar'>
                                <Avatar variant="rounded" className={classes.img} src={url} />
                            </div>
                        </div>
                        <h2></h2>
                        <p> years old</p>
                        <p></p>
                    </div>
                    <div className="profile__swipeButtons">
                    <input type="file" onChange={handleChange} />
                        <Button className="profile__swipeButtons__left" onClick={handleUpload}>
                            <h2>Up</h2>
                        </Button>
                        <Button className="profile__swipeButtons__star" onClick={pushAvatar}>
                            <h2>Done</h2>
                        </Button>
                    </div>
                    </div>
        </div>
    )
}

export default ChangeAvatar
