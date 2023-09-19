// AppRouter.js
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
