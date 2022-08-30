import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

import MapTest from './components/MapTest';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route exact path="/projects">
          <ProjectList />
        </Route>
        <Route exact path={['/projects/add', '/projects/edit/:id']}>
          <ProjectForm />
        </Route>


        <Route exact path="/developers">
          <DeveloperList />
        </Route>
        <Route exact path={['/developers/add', '/developers/edit/:id']}>
          <DeveloperForm />
        </Route>
        <Route exact path="/agencies">
          <AgencyList />
        </Route>
        <Route exact path={['/agencies/add', '/agencies/edit/:id']}>
          <AgencyForm />
        </Route>
        <Route exact path="/projectdetails/:id">
          <ProjectDetails />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;