import React, {useState} from 'react'
import CardNotifi from './CardNotifi'
import axios from 'axios'

function Notification() {
    const [dataListWaiting,setDataListWaiting] = useState([])
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
        axios.post('http://localhost:1000/listWaiting', article)
            .then(response => setDataListWaiting(response.data));
        //console.log(dataListWaiting)
    }

    

    // const clickToLike = (id__) =>{
    //     const article = { userLogin_id: localStorage.getItem('id'), reqUser_id: id__ };
    //     axios.post('http://localhost:1000/acceptReact', article)
    //         .then(response => console.log(response));
    //         console.log('UserID ' + localStorage.getItem('id'))
    //         console.log('reqID ' + id__)
    // }

    if(x){
        getData()
        sx(false)
    }

    return(
        <>
        {/* <div>dung buon</div>
        <div>
            <div onClick={console.log('buon')}>
                Edit
            </div>
        </div>
        <div>
            <div onClick={console.log('buon lan 2')}>
                Edit
            </div>
        </div> */}

        {/* <CardNotifi name={'đcmmmm'} id__={'22'}/> */}
            {dataListWaiting ? (<div>{dataListWaiting.map((l) => (<CardNotifi name={l.name} req_id={l.user_id} profilePic={l.file_name}/>))}</div>):(<></>)}
        </>
    )
}

export default Notification
