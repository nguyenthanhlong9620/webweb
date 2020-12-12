import React, {useState} from 'react'
import './FriendProfile.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
    img: {
      width: theme.spacing(28),
      height: theme.spacing(35),
    },
  }));
  let i = 0;
function FriendProfile({unProfile}) {

    const [img, setImg] = useState([
        'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
        'https://kenh14cdn.com/2019/7/6/s11-15624058651631006795186.jpg',
        'https://kenh14cdn.com/2019/7/6/s9-15624058651551231049471.jpg',
        'https://kenh14cdn.com/2019/7/6/s13-15624058651701270275259.jpg',

    ])
    const[avatar, setAvatar] = useState(img[i]);
    const classes = useStyles();

    const nextImgRight = () =>{
        let s = img.length;
        i++;
        if(i >= s){
            i = 0;
        } else if(i <= 0){
            i = s - 1;
        }
        setAvatar(img[i]);
    }

    const nextImgLeft = () =>{
        let s = img.length;
        i--;
        if(i >= s){
            i = 0;
        } else if(i < 0){
            i = s - 1;
        }
        setAvatar(img[i]);
    }

    const exit = () =>{
        i = 0;
        unProfile();
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
                        <div className='profile__img'>
                            <IconButton className="nextButton" onClick={nextImgLeft}>
                                <ChevronLeftIcon fontSize='large'/>
                            </IconButton>
                            <div className='profile__avatar'>
                                    <Avatar variant="rounded" className={classes.img} src={avatar}/>
                            </div>
                            <IconButton className="nextButton" onClick={nextImgRight}>
                                <ChevronRightIcon fontSize='large'/>
                            </IconButton>
                        </div>
                        <h2>Lisa</h2>
                        <p>Nữ, 20 tuổi</p>
                        <p>IG: Lisa.BlackPink</p>
                        <p>Có phải bố anh là dân tổ nên đã dậy anh học úp vỉa vào tym emmmm.</p>
                    </div>
                    <div className= "profile__swipeButtons">
                        <IconButton className="profile__swipeButtons__left">
                            <CloseIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className="profile__swipeButtons__star">
                            <StarRateIcon fontSize='large'/>
                        </IconButton>
                        <IconButton className="profile__swipeButtons__right">
                            <FavoriteIcon fontSize='large'/>
                        </IconButton>
                    </div>
            </div>
        </div>
    )
}

export default FriendProfile
