import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './InfoWall.css'



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
    margin: 0,
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
    border: '3px solid white'
  },
  ct: {
    margin: 0,
    position: 'absolute',
    top: '43%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2'
  }
}));
function InfoWall({db}) {
    const classes = useStyles();
    return (
        <div className='ifw__ct'>
            <Avatar className={classes.large} src={db.file_name}/>
            <div className='ifw__ctn'/>
            <div className={classes.ct}>
                <h2>{db.name}</h2>
                <p>{db.sex}, {db.age} years old</p>
                <p>{db.description}</p>
            </div>
        </div>

    )
}

export default InfoWall
