import io from "socket.io-client";
import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Axios from "axios";
import './Home.css';
const connectDB = require('../dataBase');
// Kết nối dataBase
connectDB();
// Kết nối server socket
const socket = io("http://localhost:5000");

function HomePage() {
  const [accounts, setAccounts] = useState([]);

  const showAccount = () => {

    Axios.get('http://localhost:5000/users/display')
      .then((response) => {
        setAccounts(response.data);

      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  };
  useEffect(() => {
    showAccount();
  }, []);

  return (
    <Container id='main-container' className='d-grid h-100'>
      <div className='left-rectangle'>

        <h2>Accounts</h2>
        <ul className='account-display'>
          {accounts.map((account) => (
            <li>
              <p>Username: {account.username}</p>
              <p>Email: {account.email}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='right-rectangle'>
        <input
          type='text'
          placeholder='Type something...'
        />
        <Button>Submit</Button>
      </div>
    </Container>
  );
}

export default HomePage;