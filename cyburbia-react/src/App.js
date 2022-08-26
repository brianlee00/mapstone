import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AgencyList from './AgencyList';
import AgencyForm from './AgencyForm';



function App() {
    return (
      <Router>
  
        <Switch>
          <Route exact path ="/agencies">
            <AgencyList />
          </Route>
          <Route exact path={['/agencies/add']}>
            <AgencyForm />
          </Route>
          <Route exact path={['/agencies/edit/:id']}>
            <AgencyForm />
          </Route>
          
        </Switch>
  
      </Router>
    );
  }
  
  export default App;
  
