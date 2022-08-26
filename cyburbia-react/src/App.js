import ProjectList from './components/ProjectList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ProjectList />
    </Router>
  );
}

export default App;