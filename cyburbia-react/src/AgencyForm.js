import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const AGENCY_DEFAULT = {
  name: '',
  email: '',
  locationId: 0
};

function AgencyForm() {
  const [agency, setAgency] = useState(AGENCY_DEFAULT);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  // Not using destructuring...
  // const params = useParams();
  // const id = params.id;

  // Using destructuring...
  const { id } = useParams();

  useEffect(() => {
    // Make sure that we have an "id" value...
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
    }
  }, [id]); // Hey React... please call my arrow function every time the "id" route parameter changes value

  const handleChange = (event) => {
    // Make a copy of the object.
    const newAgency = { ...agency };

    // Update the value of the property that just changed.
    // We can "index" into the object using square brackets (just like we can do with arrays).
    if (event.target.type === 'checkbox') {
      newAgency[event.target.name] = event.target.checked;
    } else {
      newAgency[event.target.name] = event.target.value;
    }

    setAgency(newAgency);
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
          history.push('/agencies');
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

  const updateAgency = () => {
    // assign an ID (this is probably needed anymore)
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
      <h2 className="mb-4">{id ? 'Update Agency' : 'Add Agency'}</h2>

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
          <label htmlFor="locationId">Location Id:</label>
          <input id="locationId" name="locationId" type="number" className="form-control"
            value={agency.locationId} onChange={handleChange} />
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
  );
}

export default AgencyForm;