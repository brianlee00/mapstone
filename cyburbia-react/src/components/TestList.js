import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LOCATION_DEFAULT = {
    address: '',
    city: '',
    state: 'NEW_YORK',
    zipCode: ''
  };

function TestList() {
  const [agencies, setAgencies] = useState([]);
  const [locations, setLocations] = useState([]);
 

  const history = useHistory();

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
  }, [],[]); // An empty dependency array tells to run our side effect once when the component is initially loaded.    


  return (
    <>
      <div className="container">
        <h2 className="mb-3 mt-3">Agencies</h2>

        <button className="btn btn-primary my-4" onClick={() => history.push('/agencies/add')}>
          <i className="bi bi-plus-circle"></i> Add Agency
        </button>

        <table className="table table-striped table-hover table-sm">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map(agency => (
              <tr key={agency.agencyId}>
                <td>{agency.agencyId}</td>
                <td>{agency.name}</td>
                <td>{agency.email}</td>
                <td>{locations[agency.locationId-1].address}</td>
                <td>{locations[agency.locationId-1].city}</td>
                <td>{locations[agency.locationId-1].state}</td>
                <td>{locations[agency.locationId-1].zipCode}</td>
                <td>
                  <div className="float-right mr-2">
                    <Link className="btn btn-primary btn-sm mr-2" to={`/agencies/edit/${agency.agencyId}`}>
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TestList;