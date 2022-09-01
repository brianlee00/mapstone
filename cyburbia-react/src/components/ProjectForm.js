import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const PROJECT_DEFAULT = {
  sqFt: 0,
  projectType: '',
  status: '',
  description: '',
  budget: 0,
  locationId: 0,
  agencyId: 0,
  developerId: 0
};

const LOCATION_DEFAULT = {
  address: '',
  city: '',
  state: 'NEW_YORK',
  zipCode: ''
};

function ProjectForm() {

  const auth = useContext(AuthContext);

  const [project, setProject] = useState(PROJECT_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [location, setLocation] = useState(LOCATION_DEFAULT);
  const [locations, setLocations] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [currentView, setCurrentView] = useState('');
  const [isChecked,setIsChecked] = useState(false);

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
    .then(data => {
      setDevelopers(data);
      setCheckedState(new Array(data.length).fill(false));
    })
    .catch(console.log);
  }, []);

  useEffect(() => {
    setCurrentView('ADDSET');
    fetch('http://localhost:8080/api/location')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setLocations(data))
    .catch(console.log);
  }, []);

  useEffect(() => {
    if (id) {
      setCurrentView('EDIT');
      fetch(`http://localhost:8080/api/project/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => {
          setProject(data);
          fetch(`http://localhost:8080/api/location/${data.locationId}`)
          .then(response => {
            if (response.status === 200) { 
              return response.json();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .then(data => setLocation(data))
          .catch(console.log)
        })
        .catch(console.log);
    }
  }, [id]);

  const handleProjectChange = (event) => {
    const newProject = { ...project };
    newProject[event.target.name] = event.target.value;

    setProject(newProject);
  };
  
  const handleLocationChange = (event) => {
    const newLocation = { ...location};
    newLocation[event.target.name] = event.target.value;
    setLocation(newLocation);
  };

  const handleArrayChange = (event) => {

    fetch('http://localhost:8080/api/location')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setLocations(data))
      .catch(console.log);

  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateProject();
    } else {
      addProject();
    }
  };

  const handleSubmits = (event) => {

    event.preventDefault();
    if (id) {
      updateProject();
      updateLocation();
    } else {
      addProject();
      addLocation();
      
    }
  };

  const handleView = () => {
    setIsChecked(!isChecked);
    if (isChecked){
      setCurrentView('ADDSET');
    } else {
      setCurrentView('ADDL');
    }
  };

  const handleLocationSubmit = (event) => {

    event.preventDefault();
    if (project.locationId) {
      updateLocation();
    } else {
      addLocation();
    }
  };

  const addProject = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.token}`,
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.token}`,
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
        if (data) {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const addLocation = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(location)
    };

    fetch('http://localhost:8080/api/location', init)
      .then(response => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (data.locationId) {
          setCurrentView('ADD');
        } else {

          setErrors(data);
        }
      })
      .catch(console.log);
      
  };

  const updateLocation = () => {

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(location)
    };
  
    fetch(`http://localhost:8080/api/location/${location.locationId}`, init)
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
      <div className="container">
        <h2 className="mb-3 mt-3">{id ? 'Update Project' : 'Add Project'}</h2>
        
        <br />

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

        {currentView === 'ADDL' && (

          <>
            <div className="form-check">
              <input id="addLocation" name="addLocation" className="form-check-input" type="hidden"
                checked={!isChecked} onChange={handleView} />
              <input id="addLocation" name="addLocation" className="form-check-input" type="checkbox"
                checked={isChecked} onChange={handleView} />
              <label className="form-check-label" htmlFor="addLocation">Add Location</label>
            </div>
            <h2 className="mb-3 mt-3">{'Add New Project Location'}</h2>

            <form onSubmit={handleLocationSubmit}>
              <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input id="address" name="address" type="text" className="form-control"
                value={location.address} onChange={handleLocationChange} />
            </div>
            <div className="form-row ">
            <div className="form-group col-md-6">
              <label htmlFor="city">City:</label>
              <input id="city" name="city" type="text" className="form-control form-control-m"
                value={location.city} onChange={handleLocationChange} />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State:</label>
              <select id="state" name="state" className="form-control form-control-sm"
                value={location.state} onChange={handleLocationChange}>
                <option>ALABAMA</option>
                <option>ALASKA</option>
                <option>ARIZONA</option>
                <option>ARKANSAS</option>
                <option>CALIFORNIA</option>
                <option>COLORADO</option>
                <option>CONNECTICUT</option>
                <option>DELAWARE</option>
                <option>FLORIDA</option>
                <option>GEORGIA</option>
                <option>HAWAII</option>
                <option>IDAHO</option>
                <option>ILLINOIS</option>
                <option>INDIANA</option>
                <option>IOWA</option>
                <option>KANSAS</option>
                <option>KENTUCKY</option>
                <option>LOUISIANA</option>
                <option>MAINE</option>
                <option>MARYLAND</option>
                <option>MASSACHUSETTS</option>
                <option>MICHIGAN</option>
                <option>MINNESOTA</option>
                <option>MISSISSIPPI</option>
                <option>MISSOURI</option>
                <option>MONTANA</option>
                <option>NEBRASKA</option>
                <option>NEVADA</option>
                <option>NEW_HAMPSHIRE</option>
                <option>NEW_JERSEY</option>
                <option>NEW_MEXICO</option>
                <option>NEW_YORK</option>
                <option>NORTH_CAROLINA</option>
                <option>NORTH_DAKOTA</option>
                <option>OHIO</option>
                <option>OKLAHOMA</option>
                <option>OREGON</option>
                <option>PENNSYLVANIA</option>
                <option>RHODE_ISLAND</option>
                <option>SOUTH_CAROLINA</option>
                <option>SOUTH_DAKOTA</option>
                <option>TENNESSEE</option>
                <option>TEXAS</option>
                <option>UTAH</option>
                <option>VERMONT</option>
                <option>VIRGINIA</option>
                <option>WASHINGTON</option>
                <option>WEST_VIRGINIA</option>
                <option>WISCONSIN</option>
                <option>WYOMING</option>
                
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="zipCode">Zip Code:</label>
              <input id="zipCode" name="zipCode" type="text" className="form-control form-control-sm"
                value={location.zipCode} onChange={handleLocationChange} />
            </div>
            </div>
        
              <div className="mt-4">
                <button className="btn btn-success mr-2" type="submit">
                  <i className="bi bi-patch-check-fill"></i> Continue
                </button>
                <Link className="btn btn-warning" to="/projects">
                  <i className="bi bi-patch-exclamation"></i> Cancel
                </Link>

              </div>
            </form>
          </>

        )}
        {currentView === 'ADD' && (

          <>
            <form onSubmit={handleProjectSubmit}>
              <div className="form-group">
                <label htmlFor="projectType">Project Type:</label>
                <select id="projectType" name="projectType" className="form-control"
                  value={project.projectType} onChange={handleProjectChange}>
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
                  value={project.status} onChange={handleProjectChange}>
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
                  value={project.description} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="sqFt">Sq. Ft:</label>
                <input id="sqFt" name="sqFt" type="number" className="form-control"
                  value={project.sqFt} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input id="budget" name="budget" type="number" className="form-control"
                  value={project.budget} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="locationId">Project Location:</label>
                <select id="locationId" name="locationId" type="number" className="form-control"
                  value={project.locationId}  onMouseOver={handleArrayChange} onChange={handleProjectChange}>
                    <option>0</option>
                  {locations.map(location => (
                    <option key={location.locationId}>{location.locationId}</option>
                    
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="agency">Agency:</label>
                <select id="agency" name="agencyId" className="form-control"
                  value={project.agencyId} onChange={handleProjectChange}>
                  <option value="">Choose Agency</option>
                  {agencies.map(agency => (
                    <option value={agency.agencyId} key={agency.agencyId}>{agency.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="developer">Developer:</label>
                <select id="developer" name="developerId" className="form-control"
                  value={project.developerId} onChange={handleProjectChange}>
                  <option value="">Choose Developer</option>
                  {developers.map(developer => (
                    <option value={developer.developerId} key={developer.developerId}>{developer.name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button className="btn btn-success mr-2" type="submit">
                  <i className="bi bi-file-earmark-check"></i> {id ? 'Update Project' : 'Add Project'}
                </button>
                <Link className="btn btn-warning" to="/projects">
                  <i className="bi bi-patch-exclamation"></i> Cancel
                </Link>
              </div>
            </form>
          </>

        )}
        {currentView === 'ADDSET' && (

          <>
            <div className="form-check">
                
              <input id="addLocation" name="addLocation" className="form-check-input" type="hidden"
                checked={!isChecked} onChange={handleView} />
              <input id="addLocation" name="addLocation" className="form-check-input" type="checkbox"
                checked={isChecked} onChange={handleView} />
              <label className="form-check-label" htmlFor="addLocation">Add Location</label>
            </div>
            <br />
            <form onSubmit={handleProjectSubmit}>
              <div className="form-group">
                <label htmlFor="projectType">Project Type:</label>
                <select id="projectType" name="projectType" className="form-control"
                  value={project.projectType} onChange={handleProjectChange}>
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
                  value={project.status} onChange={handleProjectChange}>
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
                  value={project.description} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="sqFt">Sq. Ft:</label>
                <input id="sqFt" name="sqFt" type="number" className="form-control"
                  value={project.sqFt} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input id="budget" name="budget" type="number" className="form-control"
                  value={project.budget} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="locationId">Project Location:</label>
                <select id="locationId" name="locationId" type="number" className="form-control"
                  value={project.locationId}  onChange={handleProjectChange}>
                    <option>0</option>
                  {locations.map(location => (
                    <option key={location.locationId}>{location.locationId}</option>
                    
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="agency">Agency:</label>
                <select id="agency" name="agencyId" className="form-control"
                  value={project.agencyId} onChange={handleProjectChange}>
                  <option value="">Choose Agency</option>
                  {agencies.map(agency => (
                    <option value={agency.agencyId} key={agency.agencyId}>{agency.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="developer">Developer:</label>
                <select id="developer" name="developerId" className="form-control"
                  value={project.developerId} onChange={handleProjectChange}>
                  <option value="">Choose Developer</option>
                  {developers.map(developer => (
                    <option value={developer.developerId} key={developer.developerId}>{developer.name}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button className="btn btn-success mr-2" type="submit">
                  <i className="bi bi-file-earmark-check"></i> {id ? 'Update Project' : 'Add Project'}
                </button>
                <Link className="btn btn-warning" to="/projects">
                  <i className="bi bi-patch-exclamation"></i> Cancel
                </Link>
              </div>
            </form>
          </>
          
        )}
        {currentView === 'EDIT' && (
          
          <>
            <form onSubmit={handleSubmits}>
              <div className="form-group">
                <label htmlFor="projectType">Project Type:</label>
                <select id="projectType" name="projectType" className="form-control"
                  value={project.projectType} onChange={handleProjectChange}>
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
                  value={project.status} onChange={handleProjectChange}>
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
                  value={project.description} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="sqFt">Sq. Ft:</label>
                <input id="sqFt" name="sqFt" type="number" className="form-control"
                  value={project.sqFt} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget:</label>
                <input id="budget" name="budget" type="number" className="form-control"
                  value={project.budget} onChange={handleProjectChange} />
              </div>
              <div className="form-group">
                <label htmlFor="agency">Agency:</label>
                <select id="agency" name="agencyId" className="form-control"
                  value={project.agencyId} onChange={handleProjectChange}>
                  <option value="">Choose Agency</option>
                  {agencies.map(agency => (
                    <option value={agency.agencyId} key={agency.agencyId}>{agency.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="developer">Developer:</label>
                <select id="developer" name="developerId" className="form-control"
                  value={project.developerId} onChange={handleProjectChange}>
                  <option value="">Choose Developer</option>
                  {developers.map(developer => (
                    <option value={developer.developerId} key={developer.developerId}>{developer.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input id="address" name="address" type="text" className="form-control"
                  value={location.address} onChange={handleLocationChange} />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City:</label>
                  <input id="city" name="city" type="text" className="form-control"
                    value={location.city} onChange={handleLocationChange} />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="state">State:</label>
                  <select id="state" name="state" className="form-control"
                    value={location.state} onChange={handleLocationChange}>
                    <option>ALABAMA</option>
                    <option>ALASKA</option>
                    <option>ARIZONA</option>
                    <option>ARKANSAS</option>
                    <option>CALIFORNIA</option>
                    <option>COLORADO</option>
                    <option>CONNECTICUT</option>
                    <option>DELAWARE</option>
                    <option>FLORIDA</option>
                    <option>GEORGIA</option>
                    <option>HAWAII</option>
                    <option>IDAHO</option>
                    <option>ILLINOIS</option>
                    <option>INDIANA</option>
                    <option>IOWA</option>
                    <option>KANSAS</option>
                    <option>KENTUCKY</option>
                    <option>LOUISIANA</option>
                    <option>MAINE</option>
                    <option>MARYLAND</option>
                    <option>MASSACHUSETTS</option>
                    <option>MICHIGAN</option>
                    <option>MINNESOTA</option>
                    <option>MISSISSIPPI</option>
                    <option>MISSOURI</option>
                    <option>MONTANA</option>
                    <option>NEBRASKA</option>
                    <option>NEVADA</option>
                    <option>NEW_HAMPSHIRE</option>
                    <option>NEW_JERSEY</option>
                    <option>NEW_MEXICO</option>
                    <option>NEW_YORK</option>
                    <option>NORTH_CAROLINA</option>
                    <option>NORTH_DAKOTA</option>
                    <option>OHIO</option>
                    <option>OKLAHOMA</option>
                    <option>OREGON</option>
                    <option>PENNSYLVANIA</option>
                    <option>RHODE_ISLAND</option>
                    <option>SOUTH_CAROLINA</option>
                    <option>SOUTH_DAKOTA</option>
                    <option>TENNESSEE</option>
                    <option>TEXAS</option>
                    <option>UTAH</option>
                    <option>VERMONT</option>
                    <option>VIRGINIA</option>
                    <option>WASHINGTON</option>
                    <option>WEST_VIRGINIA</option>
                    <option>WISCONSIN</option>
                    <option>WYOMING</option>
                    
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input id="zipCode" name="zipCode" type="number" className="form-control"
                    value={location.zipCode} onChange={handleLocationChange} />
                </div>
              </div>
              <div className="mt-4">
                <button className="btn btn-success mr-2" type="submit">
                  <i className="bi bi-file-earmark-check"></i> {id ? 'Update Project' : 'Add Project'}
                </button>
                <Link className="btn btn-warning" to="/projects">
                  <i className="bi bi-patch-exclamation"></i> Cancel
                </Link>
              </div>
            </form>
          </>

        )}
      </div>
    </>
  );
}

export default ProjectForm;