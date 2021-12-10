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
  const [isLoggingIn, setisLoggingIn] = useState(true);
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

  const handleNewRegistry = () => {
    setisLoggingIn(!isLoggingIn)
  }

  function handleCreateLogin() {
    (async () => {
      const response = await fetch('http://localhost:5001/login/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      response.json().then(data => {
        console.log(data)
        if(data.StatusCode === 200) {
          setisLoggingIn(!isLoggingIn);

        }
      })
    })()
  }

  return(
    <div className='login-form'>
        <h3> {!isLoggingIn ? "Enter your new subscription credentials" : "Please Login"}</h3>
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
            {isLoggingIn && <button type="submit">Submit</button>}
        </div>
        </form>
        <br />
        {isLoggingIn && <button onClick={handleNewRegistry}> Create a new Login </button>}
        <br />
        {!isLoggingIn && <button onClick={handleCreateLogin}> Create </button>}
        {!isLoggingIn && <button onClick={handleNewRegistry}> Cancel </button>}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}