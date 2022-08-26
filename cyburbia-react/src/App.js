import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import NotFound from './components/NotFound';
import AgencyForm from './components/AgencyForm';
import AgencyList from './components/AgencyList';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/developers">
          <DeveloperList />
        </Route>
        <Route path={['/developers/add', '/developers/edit:id']}>
          <DeveloperForm />
        </Route>
        <Route path="/agencies">
          <AgencyList />
        </Route>
        <Route path={['agencies/add', '/agencies/edit:id']}>
          <AgencyForm />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;