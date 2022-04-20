import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import Claims from './pages/claims';
import PolicyHome from './pages/home';
import PolicyPage from './pages/policies/policy';
import Reports from './pages/reports';
import SignIn from './pages/sign-in';
import UrlProvider from './context/url-context';

function App() {
  return (
    <UrlProvider>
    <Router>
      <Switch>
        <Route path="/claims" component={Claims} title="Claims | Surya" />
        <Route path="/reports" component={Reports} title="Reports | Surya" />
        <Route path="/home" component={PolicyHome} title="Home | Surya" />
        <Route path="/policies/:slug" component={PolicyPage} title="Policies | Surya" />
        <Route exact path="/" component={SignIn} title="Sign In | Surya" />
      </Switch>
    </Router>
    </UrlProvider>
  );
}

export default App;
