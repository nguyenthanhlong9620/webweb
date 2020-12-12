import React from 'react'
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from "@material-ui/core/IconButton"
import "./SwipeButtonBar.css"

function SwipeButtonBar({left, star, right, profile}) {
    return (
        <div className= "swipeButtons">
            <IconButton className="swipeButtons__left" onClick={left}>
                <CloseIcon fontSize='large'/>
            </IconButton>
            <IconButton className="swipeButtons__star" onClick={star}>
                <StarRateIcon fontSize='large'/>
            </IconButton>
            <IconButton className="swipeButtons__right" onClick={right}>
                <FavoriteIcon fontSize='large'/>
            </IconButton>
            <IconButton className="swipeButtons__lightning" onClick={profile}>
                <MoreHorizIcon fontSize='large'/>
            </IconButton>
        </div>
    )
}

export default SwipeButtonBar