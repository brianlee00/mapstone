import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function LocationList() {
  const [locations, setLocations] = useState([]);

  const history = useHistory();

  useEffect(() => {
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
  }, []); // An empty dependency array tells to run our side effect once when the component is initially loaded.    


  return (
    <>
      <div className="container">
        <h2 className="mb-3 mt-3">Locations</h2>

        <button className="btn btn-primary my-4" onClick={() => history.push('/locations/add')}>
          <i className="bi bi-plus-circle"></i> Add Location
        </button>

        <table className="table table-striped table-hover table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Location ID</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => (
              <tr key={location.locationId}>
                <td>{location.locationId}</td>
                <td>{location.address}</td>
                <td>{location.city}</td>
                <td>{location.state}</td>
                <td>{location.zipCode}</td>
                <td>
                  <div className="float-right mr-2">
                    <Link className="btn btn-primary btn-sm mr-2" to={`/locations/edit/${location.locationId}`}>
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

export default LocationList;