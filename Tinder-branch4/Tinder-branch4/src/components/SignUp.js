import React, {useState} from 'react';
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
import Logo from './Logo';
import axios from 'axios';

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

export default function SignUp({clickToSignIn,clickToForgot}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const classes = useStyles();

  const handleSubmit = async(event) => {
    if(email == '' || name == '' || password == '' || rpassword ==''){
      setError(true)
    } else {
      event.preventDefault();
      const dataSignUp = await
      axios({
        method: 'post',
        url: 'http://localhost:1000/register_react',
        data: {
          email: email,
          fullname: name,
          password: password,
          confirmPassword: rpassword,
        }
      });
      if(dataSignUp.data == 'Error'){
        setError(true)
      }
      else if(dataSignUp.data == 'User is valid') {
        alert("User is valid !!!")
      }
      else{
        setError(false)
        alert("Register Success !!!")
        window.location.replace("/");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo size='medium'/>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          {error?(
            <>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            error
            onChange={(event) => setName(event.target.value)}
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
            error
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="rpassword"
            label="Re-enter your Password"
            type="password"
            error
            id="rpassword"
            //autoComplete="current-password"
            onChange={(event) => setRpassword(event.target.value)}
          />
            </>
          ):(
            <>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(event) => setName(event.target.value)}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="rpassword"
            label="Re-enter your Password"
            type="password"
            id="rpassword"
            //autoComplete="current-password"
            onChange={(event) => setRpassword(event.target.value)}
          />
            </>
          )}
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={clickToForgot}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant="body2" onClick={clickToSignIn}>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}