import React from 'react'
import './App.css';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function setToken(userToken) 
{
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() 
{
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const token = getToken();
  if(!token)
  {
    return(<Login setToken={setToken} />)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
