import React, { useState, useEffect } from 'react'
import './Welcome.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


var goc = [
    ['a', 'e', 'r'],
    ['b', 'n', 'q'],
    ['c', 'j', 'm'],
    ['d', 'f', 'i'],
    ['g', 'u', 'l'],
    ['h', 'x', 't'],
    ['o', 'k', 'v'],
    ['p', 'w', 's']
]
var hoi = []
function makeHoi() {
    var currentIndex = goc.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = goc[currentIndex];
        goc[currentIndex] = goc[randomIndex];
        goc[randomIndex] = temporaryValue;
    }
    // console.log(goc);
    for (let i = 0; i < 8; i++) {
        hoi.push(goc[i][Math.floor(Math.random() * 3)])
    }
}


makeHoi()
function Welcome() {
    const [next, setNext] = useState(false);
    const [aw, setAw] = useState('');
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
    const clickToBt = () =>{
        getImg()
        console.log(aw)
        let a =''
        for(let i = 0; i < 20; i++){
            if(hoi[i]){
                a = a + hoi[i]
            }
        }
        if(aw == a){
            setNext(true)
        } else {
            alert("You are wrong!!!");
        }
    }
    return (
        <div className='wc__bg'>
            {next?(
                <div className='wc__ct'>
                <div>
                    Welcome To TindUET
                </div>
                <button className='wc__bt1' onClick={c}>
                    Start
                </button>
            </div>):(
                <div className='wc__ct'>
                <div>
                    {hoi}
                </div>
                <div className='wc__'>
                    <input className='wc__ip' onChange={(event) => (setAw(event.target.value))}>
                    </input>
                    <button className='wc__bt' onClick={clickToBt}>
                        Done
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Welcome
