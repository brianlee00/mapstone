import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ProjectForm />
    </Router>
  );
}

export default App;