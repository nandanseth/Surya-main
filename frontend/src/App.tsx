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
        <Route path="/claims" component={Claims} />
        <Route path="/reports" component={Reports} />
        <Route path="/home" component={PolicyHome} />
        <Route path="/policies/:slug" component={PolicyPage} />
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
    </UrlProvider>
  );
}

export default App;
