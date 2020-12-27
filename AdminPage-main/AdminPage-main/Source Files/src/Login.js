import React, { useState } from 'react'
import App from './App'
import './Login.css'
import axios from 'axios';

function Login() {
    const [ac, setAc] = useState('')
    const [pw, setPw] = useState('')
    const [lg, setlg] = useState(false)
    const [xx, setxx] = useState('xxx')
    // const clicklogin = () =>{
    //     localStorage.setItem('li', 1)
    //     document.location.reload()
    // }


    const clicklogin = () =>{
        const article = {admin_name: ac};
        axios.post('http://localhost:1000/login_admin', article).then(response => setxx(response.data[0].password));}

        if(pw == xx){
            localStorage.setItem('li',1)
        }

    if(localStorage.getItem('li')){
        return(<App/>)
    } else{
    return (
    <div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
                <input type="text" class="form-control" placeholder="username" onChange={(event) => setAc(event.target.value)}/>
                <input type="password" class="form-control" placeholder="password" onChange={(event) => setPw(event.target.value)}/>
                <button onClick={clicklogin}>login</button>
			</div>
		</div>
	</div>
    )
}
};

export default Login