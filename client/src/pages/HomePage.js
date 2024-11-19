import io from "socket.io-client";
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from "axios";
import './Home.css';
const connectDB = require('../dataBase');
connectDB();
const socket = io("http://localhost:5000");

function HomePage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [id_user_send, setIdUserSend] = useState('');
  const [id_user_current, setIdUserCurrent] = useState('');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const [message, setMessage] = useState('');

  const showAccount = () => {
    Axios.get('http://localhost:5000/users/display')
      .then((response) => {
        const filteredAccounts = response.data.filter(account => (account.username !== username && account.email !== email));
        setAccounts(filteredAccounts);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  };

  useEffect(() => {
    showAccount();
    setIdUserCurrent(localStorage.getItem('id'));
  }, []);
 

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const messageContainer = document.querySelector('.messages');
      const newMessage = document.createElement('li');
      const finalMessage = document.createElement('p');
      newMessage.classList.add('Receive-message');
      finalMessage.textContent = data.message;
      messageContainer.appendChild(newMessage);
      newMessage.appendChild(finalMessage);
      
    };

    socket.on('receive-message', handleReceiveMessage);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
    };

  }, [socket]);

  // Xóa toàn bộ tin nhắn khi id_user_send thay đổi
  useEffect(() => {
    const messageContainer = document.querySelector('.messages');
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild);
    }
  }, [id_user_send]);

  const handleAccountClick = async (id) => {
    setIdUserSend(id);
    socket.emit('join-room', {
      id_user_send: id,
      id_user_current: id_user_current
    });
    alert(`Kết nối được với user ${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    setTimeout(() => { navigate("/") }, 500);
  };

  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      const text = event.target.value;
      setMessage(text);

      const messageContainer = document.querySelector('.messages');
      const newMessage = document.createElement('li');
      const finalMessage = document.createElement('p');
      newMessage.classList.add('Send-message');
      finalMessage.textContent = text;
      messageContainer.appendChild(newMessage);
      newMessage.appendChild(finalMessage);

      socket.emit('send-message', {
        id_user_send: id_user_send,
        id_user_current: id_user_current,
        message: text
      });
      event.target.value = '';
      
    }
  };

  return (
    <Container id='main-container' className='d-grid h-100'>
      <div className='left-rectangle'>
        <button className="logout" onClick={handleLogout}>Logout</button>
        <h2>User: </h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>id: {id_user_current}</p>
        <p>Đang kết nối với user id: {id_user_send}</p>
        <h2>Accounts</h2>
        <ul className='account-display'>
          {accounts.map((account) => (
            <li key={account._id} onClick={() => handleAccountClick(account.id)}>
              <p>Username: {account.username}</p>
              <p>Email: {account.email}</p>
              <p>id: {account.id}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='right-rectangle'>
        <div className='messageContainer'>
          <ul className='messages'>
            {/* Messages will be displayed here */}
          </ul>
        </div>
        <div className='text-box'>
          <input
            type="text"
            placeholder="Text a message"
            id="msg-text"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;