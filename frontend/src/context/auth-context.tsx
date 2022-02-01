import React, { useState } from "react";
import axios from 'axios';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: undefined,
  token: undefined,
};

export const ContextProvider = props => {
  const [state, setState] = useState(initialState);

  const login = async (email, password) => {
    setState({
        isLoginPending: true,
        loginError: undefined, 
        isLoggedIn: false,
        token: undefined,
    })

    try {
       const res = await fetchLogin(email, password);
       setState({
           isLoginPending: false,
           isLoggedIn: true,
           loginError: undefined,
            token: res.data.token,
       });
    } catch (error) {
        setState({
            isLoginPending: false,
            isLoggedIn: false,
            loginError: error,
            token: undefined
        })
    }
  };

  const logout = () => {
    setState(initialState);
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// fake login
const fetchLogin = async (email, password) => {
    // this is a sample api just for now
    // Work with Greg on this integreation
    const api = '/login';
    return await axios.post(api, {
        email,
        password
    });
  };