import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { firestore } from '../../../firebase';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40vw',
    marginBottom: '3vh'
  },
  media: {
    height: 0,
    paddingTop: '100.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function PostCard({db,name,img,activeChange}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dbp, setDbp] = useState([{ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: '', time: '', date: '', img: db.photo_name }]);
  const ref = firestore.collection('Message').doc(localStorage.getItem('id')).collection(`${db.user_id}`);
  const ref1 = firestore.collection('Message').doc(`${db.user_id}`).collection(localStorage.getItem('id'));
  const [time,setTime] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const postReport = () =>{
    const article = { user_id: localStorage.getItem("id"), content: `${localStorage.getItem("id")} đã báo cáo bài viết số ${db.id_post} của ${db.user_id}`, reportedID: db.user_id };
        axios.post('http://localhost:1000/sending_report', article)
    setAnchorEl(null);
  }
  const postDelete = () =>{
    const article = { id_post: db.id_post};
        axios.post('http://localhost:1000/delete_post', article)
        document.location.reload()
  }
  const postChange = () =>{
    activeChange(db.id_post)
  }
  function setupDb(e) {
    if (e) {
        var today = new Date();
        var now = moment().format();
        setDbp({ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: e, time: today.getHours() + ":" + today.getMinutes(), date: now, img: db.photo_name })
    }
}
const sendMessage = (e) => {
  ref.doc().set(dbp)
  ref1.doc().set(dbp)
  e.preventDefault()
  setDbp({ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: '', time: '', date: '', img: db.photo_name })
}

const getTime = () =>{
  setTime(moment(db.createdAt).fromNow());
}
  useEffect(() => {
    getTime()
  }, [])

  return (
    <>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={img}/>
        }
        action={<>
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          {name == localStorage.getItem('name') ? (<Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={postChange}>Change</MenuItem>
          <MenuItem onClick={postDelete}>Delete</MenuItem>
        </Menu>

          ):(
            <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={postReport}>Report</MenuItem>
        </Menu>
          )}
          
        </>
        }
        title={name}
        subheader={time}
      />
      <CardMedia
        className={classes.media}
        image={db.photo_name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {db.content}
        </Typography>
      </CardContent>
      {name != localStorage.getItem('name') &&
        <CardActions disableSpacing>
                <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Comment"
                    fullWidth
                    value={dbp.message}
                    margin="normal"
                    onChange={(e) => setupDb(e.target.value)}
                    />
                <IconButton aria-label="add to favorites" onClick={sendMessage}>
                    <SendIcon/>
                </IconButton>
        </CardActions>}
    </Card>
    </>
  );
}
