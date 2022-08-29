import React, { useEffect, useState } from 'react'

export const AuthContext = React.createContext(null)

const initialState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: undefined,
    data: undefined,
}

const userStorageKey = 'user'

export const ContextProvider = (props) => {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const loggedInUser = localStorage.getItem(userStorageKey)
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setState(foundUser)
        }
    }, [])

    const login = async (email, password) => {
        setState({
            isLoginPending: true,
            loginError: undefined,
            isLoggedIn: false,
            data: undefined,
        })

        try {
            const res = await fetchLogin(email, password)
            const json = await res.json()
            setState({
                isLoginPending: false,
                isLoggedIn: true,
                loginError: undefined,
                data: json,
            })
            localStorage.setItem(userStorageKey, json)
        } catch (error) {
            setState({
                isLoginPending: false,
                isLoggedIn: false,
                loginError: error,
                data: undefined,
            })
        }
    }

    const logout = () => {
        setState(initialState)
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
    )
}

// fake login
const fetchLogin = async (email, password) => {
    // this is a sample api just for now
    // Work with Greg on this integreation
    const api = '/login'
    return await fetch(api, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    })
}
