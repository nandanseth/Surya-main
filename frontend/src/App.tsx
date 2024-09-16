import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { positions, Provider } from 'react-alert'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AlertTemplate from 'react-alert-template-basic'
import Settings from './pages/settings'
import PolicyHome from './pages/home'
import Quickrate from './pages/quickrate'
import PolicyPage from './pages/policies/policy'
import Reports from './pages/reports'
import SignIn from './pages/sign-in'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'

const options = {
    timeout: 2000,
    position: positions.BOTTOM_CENTER,
}

function App() {

    // const {authenticate, isAuthenticated, isAuthenticating, hasAuthError, authError, user, logout, account} = useMoralis();
    // const [userAuth, setUserAuth] = useState(false)

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         if (user.get('ethAddress') === '0x8146E16c915f6f620e31d9d2aE10a2Bb3736d9D3') {
    //             setUserAuth(true)
    //         } else {
    //             setUserAuth(false)
    //         }
    //     }
        
    // }, [userAuth])

    return (
        <>
        <Provider template={AlertTemplate} {...options}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                    <Routes>
                        {/* <Route
                            element={<Claims />}
                            path="/claims"
                            // title="Claims | Surya"
                        /> */}
                        <Route
                            element={<Reports />}
                            path="/reports"
                            // title="Reports | Surya"
                        />
                        <Route
                            element={<PolicyHome />}
                            path="/home"
                            // title="Home | Surya"
                        />
                        <Route
                            element={<Quickrate />}
                            path="/quickrate"
                            // title="Home | Surya"
                        />
                        <Route
                            element={<Settings />}
                            path="/settings"
                            // title="Home | Surya"
                        />
                        <Route
                            element={<PolicyPage />}
                            path="/policies/:slug"
                            // title="Policies | Surya"
                        />
                        <Route
                            element={<SignIn />}
                            path="/"
                            // title="Sign In | Surya"
                        />
                    </Routes>
                </Router>
            </LocalizationProvider>
        </Provider>
        </>
    )
}

export default App
