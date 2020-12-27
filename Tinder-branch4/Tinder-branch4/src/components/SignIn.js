import React ,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TinderCheckbox from './TinderCheckBox';
import Logo from './Logo';
import axios from 'axios';
import User from './pages/User';
import { useHistory } from 'react-router-dom';
import { firestore } from '../firebase';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: 'linear-gradient(45deg, #6bd4fe 30%, #88fcfc 90%)',
    border: 0,
    borderRadius: 3,
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function SignIn({clickToSignUp,clickToForgot}) {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState('');
  const [error, setError] = useState(false);



  const handleSubmit = async(event) => {
    if(email == '' || password ==''){
      setError(true);   
    } else {
      event.preventDefault();
      const dataSignIn = await
      axios({
        method: 'post',
        url: 'http://localhost:1000/login',
        data: {
          email: email,
          password: password
        }
      });
      console.log(dataSignIn);
      if(dataSignIn.data != 'a'){
        // localStorage.setItem('user_name',dataSignIn.data.name);
        if(dataSignIn.data.name){
          localStorage.setItem('name',dataSignIn.data.name);
          localStorage.setItem('sex',dataSignIn.data.sex);
          localStorage.setItem('age',dataSignIn.data.age);
          localStorage.setItem('des',dataSignIn.data.description);
          localStorage.setItem('like',dataSignIn.data.partner_sexual_type);
          localStorage.setItem('id',dataSignIn.data.user_id);
          localStorage.setItem('profileId',dataSignIn.data.id);


          history.push(`/user?id=${dataSignIn.data.user_id}`);
        } else {
          localStorage.setItem('id',dataSignIn.data);
          history.push(`/infoSetting?id=${dataSignIn.data}`);
        }
      } 
      else {
        setError(true);
      }
    }
  } 

  // useEffect(() => {
  //   handleSubmit()
  // })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo size='medium'/>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error?(<>
          <form className={classes.form} noValidate>
          <TextField
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TinderCheckbox>Remember me</TinderCheckbox>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={clickToForgot}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant="body2" onClick={clickToSignUp}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
          </>):(
            <>
            <form className={classes.form} noValidate>
          <TextField
            
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TinderCheckbox>Remember me</TinderCheckbox>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          <Grid container>
            <Grid item>
              <Link href='#' variant="body2" onClick={clickToSignUp}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
             </>
          )}
        
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}