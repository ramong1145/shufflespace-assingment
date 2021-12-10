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
  const [isRegistering, setIsRegistering] = useState(false);
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
    setIsRegistering(!isRegistering)
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
        if(data.StatusCode == 200) {
          setIsRegistering(!isRegistering);

        }
      })
    })()
  }

  return(
    <div className='login-form'>
        <h3> {!isRegistering ? "Enter your new subscription credentials" : "Please Login"}</h3>
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
            {isRegistering && <button type="submit">Submit</button>}
        </div>
        </form>
        <br />
        {isRegistering && <button onClick={handleNewRegistry}> Create a new Login </button>}
        <br />
        {!isRegistering && <button onClick={handleCreateLogin}> Create </button>}
        {!isRegistering && <button onClick={handleNewRegistry}> Cancel </button>}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}