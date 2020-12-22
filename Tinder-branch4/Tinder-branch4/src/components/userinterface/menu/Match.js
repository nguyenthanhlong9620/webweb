import './Like.css'
import React,{useState} from 'react';
import axios from 'axios'
import CardFriend from './CardFriend';

function Match() {
    const [dataMatch,setDataMatch] = useState([])
    const [x,sx] = useState(true)
    // if(listWaiting){
    //     return (
    //         <>
    //         <div>hello</div>
    //         {db.map((l) => (
    //             // <CardNotifi name={l.id}/>
    //             <div>hello</div>
    //         ))}
    //         </>
    //     )
    // } else {
    //     return(
    //         <></>
    //     )
    // }

    const getData = () =>{
        const article = { id: localStorage.getItem('id') };
        axios.post('http://localhost:1000/listFriendsReact', article)
            .then(response => setDataMatch(response.data));
    }
    // getData()
    if(x){
        getData()
        sx(false)
    }
    return (
        <div>
            {dataMatch ? (<>{dataMatch.map((l) => (<CardFriend id={l.user_id} name={l.name} info={l.des} profilePic={l.file_name} active='1'/>))}</>):(<></>)}
        </div>
    )
}

export default Match