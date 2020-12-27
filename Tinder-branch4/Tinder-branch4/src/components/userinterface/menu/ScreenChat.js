import { Avatar } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import './ScreenChat.css'
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton";
import { firestore } from '../../../firebase';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
// const db = [
//     {
//         name: 'Lisa',
//         avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
//         message: 'Anh ơi',
//     },
//     {
//         name: 'Lisa',
//         avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
//         message: 'Anh code xong chưa',
//     },
//     {
//         name: 'Lisa',
//         avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
//         message: 'Anh có mệt lắm không',c
//     },
//     {
//         name: 'Lisa',
//         avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
//         message: 'Em nhớ anh quá :<<<',
//     },
// ]
const useStyles = makeStyles((theme) => ({
    img: {
        width: theme.spacing(28),
        height: theme.spacing(35),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
}));

localStorage.setItem('uname', 'nono')


function ScreenChat({ name, unActiveScreenChat, dbm }) {
    const classes = useStyles();
    const [db, setDb] = useState([]);
    const [dbp, setDbp] = useState([{ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: '', time: '', date: '', img: '' }]);
    // const ref = firestore.collection('Message').doc(localStorage.getItem('id')).collection(dbm.req_user_id);
    // const ref1 = firestore.collection('Message').doc(dbm.req_user_id).collection(localStorage.getItem('id'));
    const ref = firestore.collection('Message').doc(localStorage.getItem('id')).collection(`${dbm.user_id}`);
    const ref1 = firestore.collection('Message').doc(`${dbm.user_id}`).collection(localStorage.getItem('id'));
    const ref2 = firestore.collection('Active');
    const [loanding, setLoanding] = useState(false)


    function getDb() {
        setLoanding(true)
        ref.orderBy('date').onSnapshot((sn) => {
            const items = [];
            sn.forEach((doc) => {
                items.push(doc.data());
                doc.ref.update({})
            });
            setDb(items);
            setLoanding(false)
        }) 
    }

    if(localStorage.getItem('uname') != name){
        getDb();
        localStorage.setItem('uname', name)
    }

    function setupDb(e) {
        if (e) {
            var today = new Date();
            var now = moment().format();
            setDbp({ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: e, time: today.getHours() + ":" + today.getMinutes(), date: now, img: '' })
        }
    }


    useEffect(() => {
        getDb();
    }, []);





    const scrollbar = useRef(null);
    const [widthBox, setWidthBox] = useState(0)
    const [heightBox, setHeightBox] = useState(0)


    const sendMessage = (e) => {
        ref.doc().set(dbp)
        ref1.doc().set(dbp)
        e.preventDefault()
        setDbp({ name: localStorage.getItem('name'), avatar: localStorage.getItem('avatar'), message: '', time: '', date: '', img: '' })
    }

    const sizeCalculation = () => {
        setWidthBox(window.innerWidth / 2)
        setHeightBox(window.innerHeight - 98)
    }

    useEffect(() => {
        try {
            scrollbar.current.scrollToBottom();
            sizeCalculation();
        } catch (error) {

        }
    });

    window.addEventListener('resize', sizeCalculation);
    if (loanding) {
        return (
            <div className='loanding'>
                <CircularProgress />
            </div>)
    } else {
        return (
            // style={{ width: widthBox, height: heightBox }}
            <>
                <div className='navbarChat'>
                    <IconButton className='back' onClick={unActiveScreenChat}>
                        <ArrowBackIosIcon />
                    </IconButton>

                    <div className='name'>
                        <h2>{dbm.name}</h2>
                    </div>
                    <IconButton className='infor'>
                        <InfoIcon />
                    </IconButton>
                </div>
                <div className='chatScreen'>
                    <Scrollbars style={{ width: widthBox, height: heightBox }} ref={scrollbar}>
                        {db.map((message) => (message.name != localStorage.getItem('name')) ? (
                            message.img ? (
                                <div className='message__box__img'>
                                    <Avatar src={message.avatar} alt={message.name} />
                                    <div className='chatScreen__message'>
                                        <div>
                                            <div className='chatScreen__text__img'>{message.message}</div>
                                            <Avatar variant="rounded" className={classes.img} src={message.img} />
                                        </div>
                                        <p className='chatScreen__time'>{message.time}</p>
                                    </div>
                                </div>
                            ) : (
                                    <div className='chatScreen__message'>
                                        <Avatar src={message.avatar} alt={message.name} />
                                        <div className='chatScreen__text'>{message.message}</div>
                                        <p className='chatScreen__time'>{message.time}</p>
                                    </div>
                                )
                        ) : (
                            message.img ? (
                                <div className='chatScreen__message'>
                                    <div className='chatScreen__boxTextUser'>
                                        <p className='chatScreen__time1'>{message.time}</p>
                                            <div className='chatScreen__textUser__img1'>
                                                <div className='chatScreen__textUser__img'>
                                                    {message.message}
                                                </div>
                                                <Avatar variant="rounded" className={classes.img} src={message.img} />
                                            </div>
                                    </div>
                                </div>
                            ) : (
                                    <div className='chatScreen__message'>
                                        <div className='chatScreen__boxTextUser'>
                                            <p className='chatScreen__time1'>{message.time}</p>
                                            <div className='chatScreen__textUser'>
                                                {message.message}
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                    </Scrollbars>
                    <form className='chatScreen__input'>
                        <input type='text' value={dbp.message} onChange={(e) => setupDb(e.target.value)} placeholder='Type a message...' className='chatScreen__inputField' />
                        <button type='submit' className='chatScreen__inputButton' onClick={sendMessage}>SEND</button>
                    </form>
                </div>
            </>
        )
    }
}

export default ScreenChat