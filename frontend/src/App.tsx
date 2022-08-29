import 'react-toastify/dist/ReactToastify.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { positions, Provider } from 'react-alert'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AlertTemplate from 'react-alert-template-basic'
import Claims from './pages/claims'
import PolicyHome from './pages/home'
import PolicyPage from './pages/policies/policy'
import Reports from './pages/reports'
import SignIn from './pages/sign-in'

const options = {
    timeout: 2000,
    position: positions.BOTTOM_CENTER,
}

function App() {
    return (
        <Provider template={AlertTemplate} {...options}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>
                    <Routes>
                        <Route
                            element={<Claims />}
                            path="/claims"
                            // title="Claims | Surya"
                        />
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
    )
}

export default App
