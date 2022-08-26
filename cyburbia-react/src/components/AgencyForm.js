import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

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
  const [location, setLocation] = useState(LOCATION_DEFAULT);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {

    if (id) {
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
            .then(datal => setLocation(datal))

            .catch(console.log))


    }
  }, [id]);

  const handleChange = (event) => {

    const newAgency = { ...agency };
    const newLocation = { ...location };


    if (event.target.type === 'checkbox') {
      newAgency[event.target.name] = event.target.checked;
      newLocation[event.target.name] = event.target.checked;
    } else {
      newAgency[event.target.name] = event.target.value;
      newLocation[event.target.name] = event.target.value;

    }

    setAgency(newAgency);
    setLocation(newLocation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateAgency();
    } else {
      addAgency();
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
      .catch(console.log);
    addLocation();
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

          history.push('/agencies');
        } else {

          setErrors(data);
        }
      })
      .catch(console.log);
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
    updateLocation();
  };


  const updateLocation = () => {

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
              value={location.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input id="city" name="city" type="text" className="form-control"
              value={location.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <select id="state" name="state" className="form-control"
              value={location.state} onChange={handleChange}>
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
              value={location.zipCode} onChange={handleChange} />
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
      </div>
    </>
  );
}

export default AgencyForm;