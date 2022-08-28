import { getValue } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import LocationForm from './LocationForm';

const AGENCY_DEFAULT = {
  name: '',
  email: '',
  locationId: 0
};
const LOCATION_DEFAULT = {
    address: '',
    city: '',
    state: 'NEW_YORK',
    zipCode: ''
  };


function TestForm() {

  const [agency, setAgency] = useState(AGENCY_DEFAULT);
  const [currentView, setCurrentView] = useState('AAL');
  const [isChecked,setIsChecked] = useState(false);
  const [location, setLocation] = useState(LOCATION_DEFAULT);
  const [locations, setLocations] = useState([]);

  
  const [errors, setErrors] = useState([]);
 

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    setCurrentView('ASL');

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

    if (id) {
        setCurrentView('EL')
      fetch(`http://localhost:8080/api/agency/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setAgency(data))
        .catch(console.log);


        fetch(`http://localhost:8080/api/agency/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => 

        fetch(`http://localhost:8080/api/location/${data.locationId}`)
        .then(response => {
          if (response.status === 200) { 
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setLocation(data))
        .catch(console.log))

    }
   
  },[], [id]);

  const handleChange = (event) => {
    const newAgency = { ...agency };
    if (event.target.type === 'checkbox') {
      newAgency[event.target.name] = event.target.checked;
      
    } else {
      newAgency[event.target.name] = event.target.value;
    }

    setAgency(newAgency);
  };


  const handleChangeTwo = (event) => {
    // Make a copy of the object.
    const newLocation = { ...location};

    // Update the value of the property that just changed.
    // We can "index" into the object using square brackets (just like we can do with arrays).
    if (event.target.type === 'checkbox') {
      newLocation[event.target.name] = event.target.checked;
    } else {
      newLocation[event.target.name] = event.target.value;
    }
    setLocation(newLocation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
        setCurrentView('EL')
      updateAgency();
    } else {
      addAgency();
    }
  };

  const handleAAL = () => {
    setIsChecked(!isChecked);
    if (isChecked){
        setCurrentView('ASL');
    } else {

    
    setCurrentView('AAL');
    }
}
  


  const handleSubmitTwo = (event) => {
    event.preventDefault();

    if (id) {
      updateLocation();
    } else {
      addLocation();
      agency.locationId = location.locationId;
    }
  };


  const addAgency = () => {

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agency)
    };

    fetch('http://localhost:8080/api/agency', init)
      .then(response => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (data.agencyId) {

          history.push('/agencies');
        } else {

          setErrors(data);
        }
      })
      .catch(console.log)
  };

  

  const updateAgency = () => {

    agency.agencyId = id;

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agency)
    };

    fetch(`http://localhost:8080/api/agency/${id}`, init)
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

          history.push('/agencies');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  
  };

  const addLocation = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
          /*

          On the happy path, "data" is an object that looks this:

          {
            "id": 30,
            "section": "The Ridge",
            "row": 202,
            "column": 201,
            "yearInstalled": 2000,
            "material": "MONO_SI",
            "tracking": true
          }

          */

          // Send the user back to the list route.
          history.push('/locations');
        } else {
          /*

          On the unhappy path, "data" is an array that looks this:

          [
            "SolarPanel `section` is required.",
            "SolarPanel `row` must be a positive number less than or equal to 250.",
            "SolarPanel `column` must be a positive number less than or equal to 250.",
            "SolarPanel `material` is required."
          ]

          */

          setErrors(data);
        }
      })
      .catch(console.log);
      
  };

  const updateLocation = () => {
    // assign an ID (this is probably needed anymore)
    location.locationId = id;

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    };
  
    fetch(`http://localhost:8080/api/location/${id}`, init)
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
          // Send the user back to the list route.
          history.push('/locations');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };



  return (
    <>
      <div className="container">
        <h2 className="mb-3 mt-3">{id ? 'Update Agency' : 'Add Agency'}</h2>

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
    {currentView === 'AAL' && (
    <>
     <div className="form-group">
              <label htmlFor="addLocation">Add Location
              <input id="addLocation" name="addLocation" type="hidden"
                  checked={!isChecked} onChange={handleAAL} />
                <input id="addLocation" name="addLocation" type="checkbox"
                  checked={isChecked} onChange={handleAAL} />
                  
              </label>
            </div>

        <form onSubmit={handleSubmit && handleSubmitTwo}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="text" className="form-control"
              value={agency.email} onChange={handleChange} />
          </div>

          <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" className="form-control"
            value={location.address} onChange={handleChangeTwo} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" className="form-control"
            value={location.city} onChange={handleChangeTwo} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select id="state" name="state" className="form-control"
            value={location.state} onChange={handleChangeTwo}>
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
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <input id="zipCode" name="zipCode" type="number" className="form-control"
            value={location.zipCode} onChange={handleChangeTwo} />
        </div>
    
          <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
              <i className="bi bi-stoplights"></i> Cancel
            </Link>

          </div>
        </form>
</>
       )}

       {currentView === 'ASL' && (
        <>
         <div className="form-group">
              <label htmlFor="addLocation">Add Location
              <input id="addLocation" name="addLocation" type="hidden"
                  checked={!isChecked} onChange={handleAAL} />
                <input id="addLocation" name="addLocation" type="checkbox"
                  checked={isChecked} onChange={handleAAL} />
                  
              </label>
            </div>
        <form onSubmit={handleSubmit && handleSubmitTwo}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="text" className="form-control"
              value={agency.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="locationId">Location Id:</label>
            <select id="locationId" name="locationId" type="number" className="form-control"
              value={agency.locationId} onChange={handleChange}>
              {locations.map(location => (
                <option>{location.locationId}</option>
                
              ))}
              </select>
          </div>
    
          <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
              <i className="bi bi-stoplights"></i> Cancel
            </Link>

          </div>
        </form>
        </>
       )}

       {currentView === 'EL' && (
        <>
        <form onSubmit={handleSubmit && handleSubmitTwo}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="text" className="form-control"
              value={agency.email} onChange={handleChange} />
          </div>

          <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" className="form-control"
            value={location.address} onChange={handleChangeTwo} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" className="form-control"
            value={location.city} onChange={handleChangeTwo} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select id="state" name="state" className="form-control"
            value={location.state} onChange={handleChangeTwo}>
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
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code:</label>
          <input id="zipCode" name="zipCode" type="number" className="form-control"
            value={location.zipCode} onChange={handleChangeTwo} />
        </div>
    
          <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
              <i className="bi bi-stoplights"></i> Cancel
            </Link>

          </div>
        </form>
        
        </>
       )}
      </div>
    </>
  );
}

export default TestForm;