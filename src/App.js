import React from 'react'
import './App.css';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
import useToken from './hooks/useToken';
import Layout from './components/Layout';


function App() {
  const { token, setToken } = useToken();
  
  if(!token)
  {
    return(<Login setToken={setToken} />)
  }

  return (
    <div className="App">
        <Layout>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Layout>
    </div>
  );
}

export default App;
