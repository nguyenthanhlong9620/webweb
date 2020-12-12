import React from 'react';
import PersonIcon from "@material-ui/icons/Person";
import Logo from '../Logo';
import ForumIcon from '@material-ui/icons/Forum';
import './UserInterfaceHeader.css';
import IconButton from "@material-ui/core/IconButton"

function UserInterfaceHeader() {
    return (
        <div className="header">
            <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
            </IconButton>
            <IconButton>
                <Logo size='small'/>
            </IconButton>
            <IconButton>
                <ForumIcon className="header__icon" fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default UserInterfaceHeader