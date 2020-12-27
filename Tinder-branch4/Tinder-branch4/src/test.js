import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Test() {
    let history = useHistory();
    const [x,sx] = useState(true)
    const getImg = () => {
        const article = { user_id: localStorage.getItem('id') };
        console.log(localStorage.getItem('id'))
        axios.post('http://localhost:1000/profileId', article)
            .then(response => localStorage.setItem("profileId",response.data[0].id));
    }
    const c = () =>{
      console.log(localStorage.getItem("profileId"))
      history.push(`/user?id=${localStorage.getItem('id')}`);
    }

  return (
    <>
    <div>Welcome to Tinduet</div>
      <button onClick={getImg}>Start</button>
      <button onClick={c}>click</button>
    </>
  );
}

export default Test;
