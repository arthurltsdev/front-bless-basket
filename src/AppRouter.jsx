// AppRouter.js
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Regiscomplete from './pages/Regiscomplete';
import Register from './pages/Register';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component = {Home} />
        <Route path="/registration-complete" exact component = {Regiscomplete} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
