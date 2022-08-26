import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;