import React from 'react'
import './App.css';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();
  
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
