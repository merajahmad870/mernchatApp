import {user} from '../join/Join'
import socketIO from 'socket.io-client'
import {useEffect, useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './chat.css'
import sendImg from '../../images/send.png'
import closeicon from '../../images/closeIcon.png'
import Message from '../message/Message'
import {Link} from 'react-router-dom'


const ENDPOINT = "https://backendchatapp-3d2o.onrender.com/";
let socket;
const Chat = ()=>{
	const [id, setId] = useState("");
	const [messages, setMessages] = useState([]);
	
	const send = ()=>{
		const message = document.getElementById("chatInput").value;
		socket.emit('message', {message, id});
		document.getElementById("chatInput").value = "";
	}
	
	
	useEffect(()=>{
		 socket = socketIO(ENDPOINT, {transports:['websocket']})
		socket.on('connect', ()=>{
			console.log('user connected');
			setId(socket.id)
		})
		
		socket.emit('joined',{user});
		//console.log(socket)
		socket.on('welcome', (data)=>{
			setMessages([...messages, data])
			console.log(data.user, data.message);
		})
		socket.on('userJoined', (data)=>{
			setMessages([...messages, data])
		console.log(data.user, data.message);
	})
	socket.on('leave', (data)=>{
		setMessages([...messages, data])
		console.log(data.user, data.message)
	})
	
	return ()=>{
	 socket.off();
	}
		
	},[])
	
	//console.log(messages)
	
	useEffect(()=>{
		socket.on('sendMessage', (data)=>{
			setMessages([...messages, data])
			console.log(data.user, data.message);
		})
		return ()=>{
			socket.off();
	}
		
	},[messages])
	return (
		 <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
					<h2>C CHAT</h2>
					<Link to="/" ><img src={closeicon} alt="close" /></Link>
				</div>
		         <ScrollToBottom className="chatBox">
				 {
					 messages.map((item, i)=>
					 <Message message={item.message} user={item.id===id? '': item.user} classs={item.id===id?`right`: `left`} />
					 
					 )
				 }
				 </ScrollToBottom>
		             <div className="inputBox">
					 <input onKeyPress={(e)=>e.key==='Enter' ? send() : 'null'} type="text" id="chatInput" />
					 <button onClick={send} className="sendBtn"><img src={sendImg} alt="send" /></button>
		             </div>
		          
		      
		
		    </div>
		</div>
	)
	
}

export default Chat;


