import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import Navbar from './components/Navbar';
import Home from './components/Home';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import NotFound from './components/NotFound';
import AgencyForm from './components/AgencyForm';
import AgencyList from './components/AgencyList';
import ProjectDetails from './components/ProjectDetails';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Login from './components/Login';
import Error from './components/Error';
import AuthContext from "./context/AuthContext";

const LOCAL_STORAGE_TOKEN_KEY = "cyburbiaToken";

function App() {

  const [user, setUser] = useState(null);

  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    // NEW: set the token in localStorage
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    // Decode the token
    const { sub: username, authorities: authoritiesString } = jwtDecode(token);

    // Split the authorities string into an array of roles
    const roles = authoritiesString.split(',');

    // Create the "user" object
    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };

    // Log the user for debugging purposes
    console.log(user);

    // Update the user state
    setUser(user);

    // Return the user to the caller
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  // NEW: If we haven't attempted to restore the login yet...
  // then don't render the App component
  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/projects">
            {user ? <ProjectList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path={['/projects/add', '/projects/edit/:id']}>
            {user ? <ProjectForm /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/developers">
            {user ? <DeveloperList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path={['/developers/add', '/developers/edit/:id']}>
            {user ? <DeveloperForm /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/agencies">
            {user ? <AgencyList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path={['/agencies/add', '/agencies/edit/:id']}>
            {user ? <AgencyForm /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/projectdetails/:id">
            <ProjectDetails />
          </Route>

          <Route>
            <NotFound />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;