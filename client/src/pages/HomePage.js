import io from "socket.io-client";
import { Container, Button } from 'react-bootstrap';
// Thư viện để điều hướng trang
import { Link, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Axios from "axios";
import './Home.css';
const connectDB = require('../dataBase');
// Kết nối dataBase
connectDB();
// Kết nối server socket
const socket = io("http://localhost:5000");

function HomePage() {
  // Sử dụng để điều hướng trang  
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [id_user_send, setIdUserSend] = useState('');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const id_user_current = localStorage.getItem('id');


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
  }, []);

  const handleAccountClick = (id) => {
    setIdUserSend(id);
    alert(id_user_send);
    alert(id_user_current);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    setTimeout(() => { navigate("/") }, 500);
  };
  return (
    <Container id='main-container' className='d-grid h-100'>
      <div className='left-rectangle'>
        <button className="logout" onClick={handleLogout}>Logout</button>
        <h2>User: </h2>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>id: {id_user_current}</p>
        <h2>Accounts</h2>
        <ul className='account-display'>
          {accounts.map((account) => (
            <li key={account._id} onClick={() => handleAccountClick(account.id)}>
              <p>Username: {account.username}</p>
              <p>Email: {account.email}</p>
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
          <input type="text" placeholder="Text a message" id="msg-text" />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;