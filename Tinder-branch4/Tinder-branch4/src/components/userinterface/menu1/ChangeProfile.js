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

var today = new Date();
var nowYear = today.getFullYear();
const useStyles = makeStyles((theme) => ({
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
let i = 0;
function FriendProfile({ unProfile }) {
    const [main, setMain] = useState(true);
    const [chImg, setchImg] = useState(false);
    const [chInfo, setchInfo] = useState(false);
    const [imgUpload, setImgUpload] = useState('');
    const [birthday, setBirthday] = useState('2000-09-11');
    const [name, setName] = useState(localStorage.getItem('name'));
    const [des, setDes] = useState(localStorage.getItem('des'));
    const [age, setAge] = useState(localStorage.getItem('age'));
    const [sex, setSex] = useState(localStorage.getItem('sex'));
    const [like, setLike] = useState(localStorage.getItem('like'));

    const toMain = () => {
        setMain(true);
        setchImg(false);
        setchInfo(false);
    }
    const toImg = () => {
        setMain(false);
        setchImg(true);
        setchInfo(false);
    }
    const toInfo = () => {
        setMain(false);
        setchImg(false);
        setchInfo(true);
    }

    const [img, setImg] = useState([
        'https://scontent.fhph1-1.fna.fbcdn.net/v/t1.0-9/95569662_1105829716451378_5436510620490924032_o.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_ohc=pHjjLfHV1swAX_iIA5M&_nc_ht=scontent.fhph1-1.fna&oh=218ed06ae1be8376bbef20a3c78162d0&oe=5FD48909',
        'https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-9/121261169_1240352189665796_8135238816162148774_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=4rYI3p4XhZsAX95aydI&_nc_ht=scontent.fdad2-1.fna&oh=a405d168d76fe947a5610e22fe0b96eb&oe=5FDBEA2D',
        'https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/83077837_1032344893799861_4707954974473060352_o.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_ohc=GtqOsqrFeWYAX_K7kN9&_nc_ht=scontent.fhph1-2.fna&oh=a1a0c302fcfc2d96e6347e44ddd16c6d&oe=5FDF41B6',
        'https://scontent.fhph1-1.fna.fbcdn.net/v/t1.0-9/71110475_922836714750680_2446248612561158144_o.jpg?_nc_cat=111&ccb=2&_nc_sid=174925&_nc_ohc=KMeHezYayd8AX_cAuZB&_nc_ht=scontent.fhph1-1.fna&oh=371da262ce62c08acac18be97a19f494&oe=5FDC9025',
    ])
    const [avatar, setAvatar] = useState(img[i]);
    const classes = useStyles();
    const childRefs = useMemo(() => Array(img.length).fill(0).map(i => React.createRef()), [])

    const handleSubmit = async(event) => {
          setAge(nowYear - birthday.substr(0, 4))
          setMain(true);
          setchImg(false);
          setchInfo(false);

          localStorage.setItem("name", name);
          localStorage.setItem("age", age);
          localStorage.setItem("sex", sex);
          localStorage.setItem("des", des);
          localStorage.setItem("like", like);

        
          event.preventDefault();
          const dataSignIn = await
          axios({
            method: 'post',
            url: 'http://localhost:1000/edit_profile',
            data: {
              user_id: localStorage.getItem('id'),
              name: name,
              age: age,
              sex: sex,
              description: des,
              partner_sexual_type: like,
            }
          });
      }

      
    
    const nextImgRight = () => {
        let s = img.length;
        i++;
        if (i >= s) {
            i = 0;
        } else if (i <= 0) {
            i = s - 1;
        }
        setAvatar(img[i]);
    }

    const nextImgLeft = () => {
        let s = img.length;
        i--;
        if (i >= s) {
            i = 0;
        } else if (i < 0) {
            i = s - 1;
        }
        setAvatar(img[i]);
    }

    const exit = () => {
        i = 0;
        unProfile();
    }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () => {
            setImgUpload(document.getElementById('fileButton').value)
        }
        img.push({ imgUpload });
    }

    return (
        <div className='profile__bg-modal'>
            <div className='profile__window'>
                <div className='exitIcon' onClick={exit}>
                    <Link>
                        <CloseIcon />
                    </Link>
                </div>
                {main && <>
                    <div className='profile__infomation'>
                        <div className='profile__img'>
                            <IconButton className="nextButton" onClick={nextImgLeft}>
                                <ChevronLeftIcon fontSize='large' />
                            </IconButton>
                            <div className='profile__avatar'>
                                <Avatar variant="rounded" className={classes.img} src={avatar} />
                            </div>
                            <IconButton className="nextButton" onClick={nextImgRight}>
                                <ChevronRightIcon fontSize='large' />
                            </IconButton>
                        </div>
                        <h2>{name}</h2>
                        <p>{sex}, {age} years old</p>
                        <p>{des}</p>
                    </div>
                    <div className="profile__swipeButtons">
                        <Button className="profile__swipeButtons__left" onClick={toImg}>
                            <h2>Edit Photos</h2>
                        </Button>
                        <Button className="profile__swipeButtons__star" onClick={toInfo}>
                            <h2>Edit Information</h2>
                        </Button>
                    </div>
                </>}
                {chImg &&
                    <>
                        <div className='changeProfile__title'>
                            Edit Photo
                    </div>
                        <div className='changePhotos'>
                            {img.map((img, index) => (
                                <div>
                                    <Avatar ref={childRefs[index]} variant="rounded" className={classes.photo} src={img} />
                                </div>
                            ))}
                        </div>
                        <div className="changePhoto__button">
                            <Button className="profile__swipeButtons__left" onClick={toMain}>
                                <h2>Cancel</h2>
                            </Button>
                            <div>
                                <input id="fileButton" type="file" accept="image/*" hidden />
                                <Button className="profile__swipeButtons__star" onClick={fileUploadButton}>
                                    <h2>Upload Photos</h2>
                                </Button>
                                {imgUpload}
                            </div>
                            <Button className="profile__swipeButtons__star" onClick={toMain}>
                                <h2>Done</h2>
                            </Button>
                        </div>
                    </>}
                {chInfo &&
                    <>
                        <div className='changeProfile__title'>
                            Edit Information
                    </div>
                        <div className='changeInfo'>
                            <div>
                                <TextField label="Name" defaultValue={name} onChange={(event) => setName(event.target.value)}/>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Sex</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        defaultValue={'male'}
                                        onChange={(event) => setSex(event.target.value)}
                                    >
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'complex'}>Complex</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Like</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        defaultValue={'female'}
                                        onChange={(event) => setLike(event.target.value)}
                                    >
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                        <MenuItem value={'both'}>Both</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="YYYY-MM-DD"
                                    onChange={(event) => setBirthday(event.target.value)}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Information"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    defaultValue={des}
                                    onChange={(event) => setDes(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="chProfile">
                            <Button className="profile__swipeButtons__left" onClick={toMain}>
                                <h2>Cancel</h2>
                            </Button>
                            <Button className="profile__swipeButtons__star" onClick={handleSubmit}>
                                <h2>Done</h2>
                            </Button>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default FriendProfile
