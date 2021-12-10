import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import store from '../utils/redux/store';
import { setTokenAction } from '../utils/redux/actions/userActions';

async function loginUser(credentials) 
{
  return fetch('http://localhost:5001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json());
}
export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email, password
    });
    if(response.token) {
      store.dispatch(setTokenAction(response.token))
      setToken(response.token);
      navigate('/dashboard');
    }
  }

  return(
    <div className='login-form'>
        <h3> Please Log In </h3>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Username</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}