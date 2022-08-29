import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const PROJECT_DEFAULT = {
  sqFt: 0,
  projectType: '',
  status: '',
  description: '',
  budget: 0,
  locationId: 0,
  agencyId: 0,
  developers: []
};

function ProjectForm() {
  const [project, setProject] = useState(PROJECT_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/api/agency')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setAgencies(data))
    .catch(console.log);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/developer')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setDevelopers(data))
    .catch(console.log);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/developer')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setCheckedState(new Array(data.length).fill(false)))
    .catch(console.log);
  }, []);

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

  const handleCheckbox = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const projectDevs = updatedCheckedState.reduce(
      (devs, currentState, index) => {
        if (currentState === true) {
          devs.push(developers[index]);
          return devs;
        }
        return devs;
      },
      []
    );

    const newProject = { ...project };
    newProject['developers'] = projectDevs;
    setProject(newProject);
    console.log(newProject);
  }

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
          <label htmlFor="projectType">Project Type:</label>
          <select id="projectType" name="projectType" className="form-control"
            value={project.projectType} onChange={handleChange}>
            <option value="">Select Project Type</option>
            <option value="RES">Residential</option>
            <option value="IND">Industrial</option>
            <option value="COM">Commercial</option>
            <option value="AGR">Agricultural</option>
            <option value="REC">Recreational</option>
            <option value="INS">Institutional</option>
            <option value="TRA">Transportation</option>
            <option value="MIX">Mixed-Urban</option>
            <option value="NAT">Natural</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" className="form-control"
            value={project.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="PRO">Proposed</option>
            <option value="REV">In Review</option>
            <option value="APP">Approved</option>
            <option value="CON">Under Construction</option>
            <option value="COM">Completed</option>
            <option value="CAN">Canceled</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input id="description" name="description" type="text" className="form-control"
            value={project.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sqFt">Sq. Ft:</label>
          <input id="sqFt" name="sqFt" type="number" className="form-control"
            value={project.sqFt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget:</label>
          <input id="budget" name="budget" type="number" className="form-control"
            value={project.budget} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="agency">Agency:</label>
          <select id="agency" name="agencyId" className="form-control"
            value={project.agencyId} onChange={handleChange}>
            <option value="">Choose Agency</option>
            {agencies.map(agency => (
              <option value={agency.agencyId} key={agency.agencyId}>{agency.name}</option>
            ))}
          </select>
        </div>
        <label htmlFor="developers">Developers:</label>
        <div className="form-group" id="developers">
          {developers.map((developer, index) => {
            return (
              <div className="developers-list-name">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={developer.name}
                  value={developer.name}
                  checked={checkedState[index]}
                  onChange={() => handleCheckbox(index)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{developer.name}</label>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <button className="btn btn-success mr-2" type="submit">
            <i className="bi bi-file-earmark-check"></i> {id ? 'Update Project' : 'Add Project'}
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