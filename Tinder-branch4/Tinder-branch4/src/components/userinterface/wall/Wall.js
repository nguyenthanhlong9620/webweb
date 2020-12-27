import React, {useEffect, useState} from 'react'
import ListPost from './ListPost'
import './Wall.css'
import InfoWall from './InfoWall'
import { Scrollbars } from 'react-custom-scrollbars'
import ImageIcon from '@material-ui/icons/Image';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Button } from '@material-ui/core'
import ImgList from './ImgList'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import Change from './Change'


localStorage.setItem('unamee', 'nono')
function Wall({unActiveWall, db}) {
    const [widthBox,setWidthBox] = useState(0)
    const [heightBox,setHeightBox] = useState(0)
    const [post, setPost] = useState(true)
    const [photo, setPhoto] = useState(false)
    const [dbPost, setDbPost] = useState([])
    const [change, setChange] = useState(false)
    const [changeId, setChangeId] = useState('')

    const activeChange = (id) =>{
        setChange(true)
        setChangeId(id)
    }
    const unChange = () =>{
        setChange(false)
    }

    function getDbPost(){
        const article = { user_id: db.user_id };
            axios.post('http://localhost:1000/list_post', article)
                .then(response => setDbPost(response.data));
    }
    useEffect(() => {
            getDbPost()
    }, [])

    const clickPost = () =>{
        setPost(true)
        setPhoto(false)
    }
    const clickPhoto = () =>{
        setPost(false)
        setPhoto(true)
    }

    const sizeCalculation = () => {
        setWidthBox(window.innerWidth/2)
        setHeightBox(window.innerHeight)
    }

    useEffect(() => {
        try {
            sizeCalculation();
        } catch (error) {
            
        }
    });
    if(localStorage.getItem('unamee') != db.user_id){
        getDbPost();
        localStorage.setItem('unamee', db.user_id)
    }

    window.addEventListener('resize', sizeCalculation);
    return (
        <>
         {change && <Change id={changeId}/>}
        <Scrollbars style={{ width: widthBox, height: heightBox }}>
            <Button className='wall__back' onClick={unActiveWall}>
                    <ArrowBackIosIcon/>
            </Button>
            <div className='wall__info'>
                <InfoWall db = {db}/>
            </div>
            <div className='box__hr'>
                <div className='hhrr'/>
            </div>
            <div className='box__post'>
                <Button className={post?'box__post__bt':'box__post__brt'} onClick={clickPost}>
                    <TelegramIcon/>
                    Posts
                </Button>
                <Button className={photo?'box__post__bt':'box__post__brt'} onClick={clickPhoto}>
                    <ImageIcon/>
                    Photos
                </Button>
            </div>
            <div className='wall'>
                {post&&<ListPost dbPost={dbPost} name={db.name} img={db.file_name} activeChange={activeChange}/>}
                {photo&&<ImgList dbPost={dbPost}/>}
            </div>
        </Scrollbars>
        </>
    )
}

export default Wall
