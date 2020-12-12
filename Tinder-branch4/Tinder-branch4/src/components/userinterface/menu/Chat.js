import React, {useState, useRef} from 'react'
import Inbox from './Inbox'
import './Chat.css'

function Chat({activeScreenChat}) {
    // const data = useRef(null)
    return (
        <>
        {/* {chatScreen?(<ScreenChat name='Lisa' status='1 minutes ago' active={active}/>)
        :(
            <div className='inBox'> */}
                <Inbox
                    name="Lisa"
                    profilePic="https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg"
                    message="Em nhớ anh quá :<<<"
                    timestammp="1 minutes ago"
                    activeScreenChat = {activeScreenChat}
                />
                <Inbox
                    name="Cẩm Nhung"
                    profilePic="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/93679806_540891779906309_2397043989749432320_o.jpg?_nc_cat=105&ccb=2&_nc_sid=174925&_nc_ohc=u5W7ieE3XQEAX-iJ9Bx&_nc_ht=scontent-hkt1-1.xx&oh=cabd47f1195940b77a173377854e978d&oe=5FD71DA1"
                    message="Hoàng ơi! Cậu làm đồ họa máy tính đến đâu rồi ?"
                    timestammp="35 minutes ago"
                    activeScreenChat = {activeScreenChat}
                />
            {/* </div>)} */}
        </>
    )
}

export default Chat
