import { useState } from 'react';
import { setTokenAction } from '../utils/redux/actions/userActions';

export default function useToken() {
  
    const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    setToken(userToken);
    return dispatch => dispatch(setTokenAction(userToken))
    //dispatch(copyWorkOrderData(json))
    //localStorage.setItem('token', JSON.stringify(userToken));
  }

  return {
      setToken: saveToken,
      token
  }
}