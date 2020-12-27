import React, { useCallback } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './Profile.css';
import auth from "../../../auth";
import { Button } from '@material-ui/core';
  
  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 22,
      height: 22,
    background: 'white',
    borderRadius:100,
    },
  }))(AddCircleIcon);

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

function Profile({changeProfile, name, sex, age, des, image, activeChangeAvtart, activeWall}) {
  const db = [{
    user_id: localStorage.getItem('id'),
    age: localStorage.getItem('age'),
    sex: localStorage.getItem('sex'),
    description: localStorage.getItem('des'),
    name:localStorage.getItem('name'),
    file_name: image  
  }]
  const classes = useStyles();
  const logout = useCallback(() => {
    auth.logout();
  }, []);
  const clickToName = () =>{
    activeWall(db[0])
  }
  
  localStorage.setItem('avatar' , image)

  return (
    <>
        <div className='profile'>
        <div className='avatar'>
          <Badge
            overlap="circle"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            badgeContent={<SmallAvatar/>}
        >
            <Avatar className={classes.large} src={image} onClick={activeChangeAvtart}/>
          </Badge>
            
            </div>
            <div>
                <h2 className='tWall' onClick={clickToName}>{name}</h2>
                <p>{sex}, {age} years old</p>
                <p>{des}</p>
            </div>
        </div>
        <div className='bottom__'>
            <div className='button__' onClick={changeProfile}>
              Edit
            </div>
            <div className='button__' onClick={logout}>
              Log Out
            </div>
        </div>
    </>
  );
}

export default Profile