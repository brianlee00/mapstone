import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const PROJECT_DEFAULT = {
  sqFt: 0,
  projectType: null,
  status: null,
  description: '',
  budget: 0,
  locationId: 0,
  agencyId: 0,
  developers: null
};

function ProjectForm() {
  const [project, setProject] = useState(PROJECT_DEFAULT);
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/project/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setProject(data))
        .catch(console.log);
    }
  }, [id]);

  const handleChange = (event) => {
    const newProject = { ...project };
    newProject[event.target.name] = event.target.value;

    setProject(newProject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateProject();
    } else {
      addProject();
    }
  };

  const addProject = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    };

    fetch('http://localhost:8080/api/project', init)
      .then(response => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (data.projectId) {
          history.push('/projects');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const updateProject = () => {
    project.projectId = id;
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    };
  
    fetch(`http://localhost:8080/api/project/${id}`, init)
      .then(response => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (!data) {
          history.push('/projects');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <h2 className="mb-4">{id ? 'Update Project' : 'Add Project'}</h2>

      {errors.length > 0 && (
        <div className="alert alert-danger">
          <p>The following errors were found:</p>
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sqFt">Sq. Ft:</label>
          <input id="sqFt" name="sqFt" type="text" className="form-control"
            value={project.sqFt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="projectType">Project Type:</label>
          <input id="projectType" name="projectType" type="text" className="form-control"
            value={project.projectType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input id="status" name="status" type="text" className="form-control"
            value={project.status} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input id="description" name="description" type="date" className="form-control"
            value={project.description} onChange={handleChange} />
        </div>
        <div class="form-group">
          <label for="budget">Budget:</label>
          <input id="budget" name="budget" type="number" className="form-control"
            value={project.budget} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <button className="btn btn-success mr-2" type="submit">
            <i className="bi bi-file-earmark-check"></i> {id ? 'Update Field Agent' : 'Add Field Agent'}
          </button>
          <Link className="btn btn-warning" to="/projects">
            <i className="bi bi-stoplights"></i> Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default ProjectForm;