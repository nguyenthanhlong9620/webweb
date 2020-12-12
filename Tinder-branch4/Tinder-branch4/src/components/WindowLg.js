import React, {useState,useEffect} from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn'; 
import './WindowLg.css';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import ForgotPass from './ForgotPass';

function WindowLg({login,close}) {
    const [sign_in, setSignIn] = useState(true);
    const [sign_up, setSignUp] = useState(false);
    const [forgot, setForgot] = useState(false);

    const signInClick = () => {
        setSignIn(true)
        setSignUp(false)
        setForgot(false)
    }

    const signUpClick = () => {
        setSignIn(false)
        setSignUp(true)
        setForgot(false)
    }

    const forgotClick = () => {
        setSignIn(false)
        setSignUp(false)
        setForgot(true)
    }

    useEffect(() => {
        if(!login){
            signInClick();
        }
      });

    return (
        <div className={login ? 'activeWindow' : 'nonActiveWindow'}>
            <div className='bg-modal'>
                <div className='modal-content'>
                    <div className='exitIcon' onClick={close}>
                        <Link>
                            <CloseIcon/>
                        </Link>
                    </div>
                    <div className={sign_up ? 'activesignUp' : 'nonActivesignUp'}>
                        <SignUp clickToSignIn={signInClick} clickToForgot={forgotClick}/>
                    </div>
                    <div className={sign_in ? 'activesignIn' : 'nonActivesignIn'}>
                        <SignIn clickToSignUp={signUpClick} clickToForgot={forgotClick}/>
                    </div>
                    <div className={forgot ? 'activeforgot' : 'nonActiveforgot'}>
                        <ForgotPass clickToSignUp={signUpClick} clickToSignIn={signInClick}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default WindowLg