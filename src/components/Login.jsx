import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      userName, password
    });
    setToken(token);
  }

  return(
    <div className='login-form'>
        <h3> Please Log In </h3>
        <form onSubmit={handleSubmit}>
        <label>
            <p>Username</p>
            <input type="text" onChange={e => setUsername(e.target.value)} />
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