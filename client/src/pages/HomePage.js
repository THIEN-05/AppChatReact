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
        // Lọc các tài khoản không phải của người dùng hiện tại
        const filteredAccounts = response.data.filter(account => (account.username !== username && account.email !== email));
        setAccounts(filteredAccounts);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  };

  // Chạy liên tục để hiển thị danh sách tài khoản
  useEffect(() => {
    showAccount();
    setIdUserCurrent(localStorage.getItem('id'));
  });


  useEffect(() => {
    // Sẽ chạy mỗi khi nhận được dữ liệu từ server
    // Hiển thị ra dữ liệu
    const handleReceiveMessage = (data) => {
      const messageContainer = document.querySelector('.messages');
      const newMessage = document.createElement('li');
      const finalMessage = document.createElement('p');
      // data.sender === id_user_current ? 'Send-message' : 
      newMessage.classList.add('Receive-message');
      finalMessage.textContent = data.message;
      newMessage.appendChild(finalMessage);
    };
    socket.on('receive-message', handleReceiveMessage);
    socket.on('chat-history', handleChatHistory);
  
    return () => {
      // Xóa event listener khi component bị unmount (Bị gỡ khỏi cây DOM)
      socket.off('receive-message', handleReceiveMessage);
      socket.off('chat-history', handleChatHistory);
    };
  },);


  useEffect(() => {
    // Xóa toàn bộ tin nhắn khi id_user_send thay đổi

    const messageContainer = document.querySelector('.messages');
    while (messageContainer.firstChild) {
      messageContainer.removeChild(messageContainer.firstChild);
    }
    // Load tin nhắn cũ khi kết nối với user khác
    socket.on('load-messages', (messages) => {
      const messageContainer = document.querySelector('.messages');
      messages.forEach((msg) => {
        const newMessage = document.createElement('li');
        newMessage.classList.add(msg.sender === id_user_current ? 'Send-message' : 'Receive-message');
        const finalMessage = document.createElement('p');
        finalMessage.textContent = msg.message;
        messageContainer.appendChild(newMessage);
        newMessage.appendChild(finalMessage);
      });
    });
    return () => {
      socket.off('load-messages');
    };
  }, [id_user_send]);


  // Kết nối 2 user vào chung 1 room
  const handleAccountClick = async (id) => {
    setIdUserSend(id);
    socket.emit('join-room', {
      id_user_send: id,
      id_user_current: id_user_current
    });
    alert(`Kết nối được với user ${id}`);
  };


  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    setTimeout(() => { navigate("/") }, 500);
  };


  // Xử lý gửi tin nhắn
  const handleSendMessage = (event) => {
    if (event.key === 'Enter') {
      const text = event.target.value;
      setMessage(text);
      const messageContainer = document.querySelector('.messages');
      const newMessage = document.createElement('li');
      const finalMessage = document.createElement('p');
      finalMessage.classList.add('Send-message');
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
            {

            }
          </ul>
        </div>
        <div className='text-box'>
          <input
            type="text"
            placeholder="Text a message"
            id="msg-text"
            onKeyDown={handleSendMessage}
          />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;