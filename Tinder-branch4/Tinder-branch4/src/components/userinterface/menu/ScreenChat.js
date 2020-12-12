import { Avatar } from '@material-ui/core'
import React, {useState, useEffect, useRef} from 'react'
import './ScreenChat.css'
import { Scrollbars } from 'react-custom-scrollbars'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from "@material-ui/core/IconButton"
const db = [
    {
        name: 'Lisa',
        avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
        message: 'Anh ơi',
    },
    {
        name: 'Lisa',
        avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
        message: 'Anh code xong chưa',
    },
    {
        name: 'Lisa',
        avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
        message: 'Anh có mệt lắm không',
    },
    {
        name: 'Lisa',
        avatar: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
        message: 'Em nhớ anh quá :<<<',
    },
]
function ScreenChat({name,status,unActiveScreenChat}) {
    const scrollbar = useRef(null);
    const [widthBox,setWidthBox] = useState(0)
    const [heightBox,setHeightBox] = useState(0)
    const [message, setMessage] = useState('')
    const [allMessage, setAllMessage] = useState(db)
    const sendMessage = (e) =>{
        if(message != ''){
            setAllMessage([...allMessage,{message: message}]);
        }
        e.preventDefault();
        setMessage('');
    }

    const sizeCalculation = () => {
        setWidthBox(window.innerWidth/2)
        setHeightBox(window.innerHeight - 98)
    }

    useEffect(() => {
        scrollbar.current.scrollToBottom();
        sizeCalculation();
    });

    window.addEventListener('resize', sizeCalculation);
    return (
        // style={{ width: widthBox, height: heightBox }}
        <>
            <div className='navbarChat'>
                
                    <IconButton className='back' onClick={unActiveScreenChat}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                
                <div className='name'>
                    <h2>{name}</h2>
                    <div>{status}</div>
                </div>
                    <IconButton className='infor'>
                        <InfoIcon/>
                    </IconButton>
            </div>
            <div className='chatScreen'>
                <Scrollbars style={{ width: widthBox, height: heightBox }} ref={scrollbar}>
                {allMessage.map((message) => message.name ? (
                        <div className='chatScreen__message'>
                            <Avatar src={message.avatar} alt={message.name}/>
                            <div className='chatScreen__text'>{message.message}</div>
                        </div>
                    ):(
                        <div className='chatScreen__message'>
                            <div className='chatScreen__textUser'>{message.message}</div>
                        </div>
                    ))}
                </Scrollbars>
                <form className='chatScreen__input'>
                    <input type='text' value={message} onChange={(e) => setMessage(e.target.value) } placeholder='Type a message...' className='chatScreen__inputField'/>
                    <button type='submit' className='chatScreen__inputButton' onClick={sendMessage}>SEND</button>
                </form>
            </div>
        </>
    )
}

export default ScreenChat
