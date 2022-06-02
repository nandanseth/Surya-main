import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
          <Route component={Claims} path="/claims" title="Claims | Surya" />
          <Route component={Reports} path="/reports" title="Reports | Surya" />
          <Route component={PolicyHome} path="/home" title="Home | Surya" />
          <Route component={PolicyPage} path="/policies/:slug" title="Policies | Surya" />
          <Route component={SignIn} exact path="/" title="Sign In | Surya" />
        </Switch>
      </Router>
    </UrlProvider>
  );
}

export default App;
