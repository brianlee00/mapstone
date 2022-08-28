import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import LocationForm from './LocationForm';

const AGENCY_DEFAULT = {
  name: '',
  email: '',
  locationId: 0
};


function TestForm() {
  const [agency, setAgency] = useState(AGENCY_DEFAULT);
  
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

    }
  }, [id]);

  const handleChange = (event) => {

    const newAgency = { ...agency };
   


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
      </div>
    </>
  );
}

export default TestForm;