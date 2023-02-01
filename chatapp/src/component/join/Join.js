import './join.css'
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import {useState} from 'react'

export let user;
const loginHandle = ()=>{
		user = document.getElementById('joinInput').value;
		document.getElementById('joinInput').value ="";
	}


const Join = ()=> {
const [name, setName] = useState();
	
  return (
    <div className="join-page">
	<div className="container">
	<img src={logo} alt="chat" />
		<h1>C CHAT</h1>
		<input type="text" id="joinInput" onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name..." />
		<Link onClick={(e)=>!name?e.preventDefault():null} to ="/chat"><button onClick={loginHandle} className="btn">Login</button></Link>
	</div>
    </div>
  );
}

export default Join;
