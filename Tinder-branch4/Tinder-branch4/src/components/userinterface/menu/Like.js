import './Like.css'
import React,{useState} from 'react';
import axios from 'axios'
import CardFriend from './CardFriend';

function Like() {
    const [dataLike,setDataLike] = useState([])
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
        axios.post('http://localhost:1000/listSendingReact', article)
            .then(response => setDataLike(response.data));
    }
    // getData()

    


    if(x){
        getData()
        sx(false)
    }
    return (
        <div>
            {dataLike ? (<>{dataLike.map((l) => (<CardFriend name={l.name} info={l.description} id={l.user_id} profilePic={l.file_name}/>))}</>):(<></>)}
        </div>
    )
}

export default Like
