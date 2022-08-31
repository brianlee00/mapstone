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


function AgencyForm() {

  const [agency, setAgency] = useState(AGENCY_DEFAULT);
  const [currentView, setCurrentView] = useState('AAL');
  const [isChecked,setIsChecked] = useState(false);
  const [location, setLocation] = useState(LOCATION_DEFAULT);
  const [locations, setLocations] = useState([]);

  
  const [errors, setErrors] = useState([]);
 

  const history = useHistory();

  const { id } = useParams();

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

    if (id) {
        setCurrentView('EDIT')
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

 

  const handleAgencyChange = (event) => {

      const newAgency = { ...agency };
      newAgency[event.target.name] = event.target.value;
      setAgency(newAgency);
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


  const handleLocationChange = (event) => {
    const newLocation = { ...location};
    newLocation[event.target.name] = event.target.value;
    setLocation(newLocation);
  };

  const handleAgencySubmit = (event) => {

    event.preventDefault();
    if (id) {
      updateAgency();
    } else {
      addAgency();
    }
  };

  const handleSubmits = (event) => {

    event.preventDefault();
    if (id) {
      updateAgency();
      updateLocation();
    } else {
      addAgency();
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
}
  


  const handleLocationSubmit = (event) => {

    event.preventDefault();
    if (agency.locationId) {
        updateLocation();
    } else {
        addLocation();
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
          setCurrentView('ADD');
        } else {

          setErrors(data);
        }
      })
      .catch(console.log);
      
  };

  const updateLocation = () => {
    // assign an ID (this is probably needed anymore)

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
          // Send the user back to the list route.
          history.push('/agencies');
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
    {currentView === 'ADDL' && (
    <>
     <div className="form-check">
                 
                 <input id="addLocation" name="addLocation" className="form-check-input" type="hidden"
                     checked={!isChecked} onChange={handleView} />
                   <input id="addLocation" name="addLocation" className="form-check-input" type="checkbox"
                     checked={isChecked} onChange={handleView} />
                      <label className="form-check-label" htmlFor="addLocation">
                       Add Location
                     
                 </label>
               </div>
            <h2 className="mb-3 mt-3">{'Add New Agency Location'}</h2>

        <form onSubmit={handleLocationSubmit}>
          <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input id="address" name="address" type="text" className="form-control"
            value={location.address} onChange={handleLocationChange} />
        </div>
        <div className="form-row ">
        <div className="form-group col-md-6">
          <label htmlFor="city">City:</label>
          <input id="city" name="city" type="text" className="form-control form-control-sm"
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
            <Link className="btn btn-warning" to="/agencies">
              <i className="bi bi-patch-exclamation"></i> Cancel
            </Link>

          </div>
        </form>
        </>
       )}
       {currentView === 'ADD' &&(
        <>
        <form onSubmit={handleAgencySubmit}>
        <div className="form-group">
            <label htmlFor="name">Agency Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleAgencyChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Agency Email:</label>
            <input id="email" name="email" type="text" placeholder="name@example.com" className="form-control"
              value={agency.email} onChange={handleAgencyChange} required/>
          </div>
          
          <div className="form-group">
            <label htmlFor="locationId">Agency Location:</label>
            <select id="locationId" name="locationId" type="number" className="form-control"
              value={agency.locationId} onMouseOver={handleArrayChange} onChange={handleAgencyChange}>
                <option>0</option>
              {locations.map(location => (
                <option key={location.locationId}>{location.locationId}</option>
                
              ))}
              </select>
          </div>
    
          <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
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
                      <label className="form-check-label" htmlFor="addLocation">
                       Add Location
                     
                 </label>
               </div>
               <br />
        <form onSubmit={handleAgencySubmit}>
          <div className="form-group">
            <label htmlFor="name">Agency Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleAgencyChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Agency Email:</label>
            <input id="email" name="email" type="text" placeholder="name@example.com" className="form-control"
              value={agency.email} onChange={handleAgencyChange} />
          </div>

          <div className="form-group">
            <label htmlFor="locationId">Agency Location:</label>
            <select id="locationId" name="locationId" type="number" className="form-control"
              value={agency.locationId}  onChange={handleAgencyChange}>
                <option>0</option>
              {locations.map(location => (
                <option key={location.locationId}>{location.locationId}</option>
                
              ))}
              </select>
          </div>
    
          <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
              <i className="bi bi-patch-exclamation"></i> Cancel
            </Link>

          </div>
        </form>
        </>
       )}

       {currentView === 'EDIT' && (
        <>
        <form onSubmit={handleSubmits}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Agency Name:</label>
            <input id="name" name="name" type="text" className="form-control"
              value={agency.name} onChange={handleAgencyChange} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Agency Email:</label>
            <input id="email" name="email" type="text" className="form-control"
              value={agency.email} onChange={handleAgencyChange} />
          </div>
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
              <i className="bi bi-file-earmark-check"></i> {id ? 'Update Agency' : 'Add Agency'}
            </button>
            <Link className="btn btn-warning" to="/agencies">
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

export default AgencyForm;