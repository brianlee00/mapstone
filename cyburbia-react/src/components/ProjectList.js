import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ProjectList() {

  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [agencies, setAgencies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8080/api/project')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setProjects(data))
      .catch(console.log);
  }, []);

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

  return locations.length > 0 && agencies.length > 0 && (
      <>
        <div className="container">
          <h2 className="mb-3 mt-3">Projects</h2>
          <button className="btn btn-primary my-4" onClick={() => history.push('/projects/add')}>
            <i className="bi bi-plus-circle"></i> Add Project
          </button>
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Project ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Description</th>
                <th>Sq. Ft</th>
                {/* <th>Budget</th> */}
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                {/* <th>Agency</th>
                <th>Developers</th> */}
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.projectId}>
                  <td>{project.projectId}</td>
                  <td>{convertType(project.projectType)}</td>
                  <td>{convertStatus(project.status)}</td>
                  <td>{project.description}</td>
                  <td>{project.sqFt}</td>
                  {/* <td>${project.budget}</td> */}
                  <td>{locations[project.locationId-1].address}</td>
                  <td>{locations[project.locationId-1].city}</td>
                  <td>{convertState(locations[project.locationId-1].state)}</td>
                  {/* <td>{agencies[project.agencyId-1].name}</td>
                  <td>{project.developers}</td> */}
                  <td>
                    <div className="float-right mr-2">
                      <Link className="btn btn-primary btn-sm mr-2" to={`/projects/edit/${project.projectId}`}>
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

export default ProjectList;

function convertStatus(input) {
  if (input == "PRO") {
      return "Proposed"
  }
  if (input == "REV") {
      return "In Review"
  }
  if (input == "APP") {
      return "Approved"
  }
  if (input == "CON") {
      return "Under Construction"
  }
  if (input == "COM") {
      return "Completed"
  }
  if (input == "CAN") {
      return "Canceled"
  }
}

function convertType(input) {
  if (input == "RES") {
      return "Residential"
  }
  if (input == "IND") {
      return "Industrial"
  }
  if (input == "IND") {
      return "Industrial"
  }
  if (input == "COM") {
      return "Commercial"
  }
  if (input == "AGR") {
      return "Agricultural"
  }
  if (input == "REC") {
      return "Recreational"
  }
  if (input == "INS") {
      return "Institutional"
  }
  if (input == "TRA") {
      return "Transportation"
  }
  if (input == "MIX") {
      return "Mixed-Urban"
  }
  if (input == "NAT") {
      return "Natural"
  }
}

function convertState(input) {
  if (input == "ALABAMA") {
      return "Alabama"
  }
  if (input == "ALASKA") {
      return "Alaska"
  }
  if (input == "ARIZONA") {
      return "Arizona"
  }
  if (input == "ARKANSAS") {
      return "Arkansas"
  }
  if (input == "CALIFORNIA") {
      return "California"
  }
  if (input == "COLORADO") {
      return "Colorado"
  }
  if (input == "CONNECTICUT") {
      return "Connecticut"
  }
  if (input == "DELAWARE") {
      return "Delaware"
  }
  if (input == "FLORIDA") {
      return "Florida"
  }
  if (input == "GEORGIA") {
      return "Georgia"
  }
  if (input == "HAWAII") {
      return "Hawaii"
  }
  if (input == "IDAHO") {
      return "Idaho"
  }
  if (input == "ILLINOIS") {
      return "Illinois"
  }
  if (input == "INDIANA") {
      return "Indiana"
  }
  if (input == "IOWA") {
      return "Iowa"
  }
  if (input == "KANSAS") {
      return "Kansas"
  }
  if (input == "KENTUCKY") {
      return "Kentucky"
  }
  if (input == "LOUISIANA") {
      return "Louisiana"
  }
  if (input == "MAINE") {
      return "Maine"
  }
  if (input == "MARYLAND") {
      return "Maryland"
  }
  if (input == "MASSACHUSETTS") {
      return "Massachusetts"
  }
  if (input == "MICHIGAN") {
      return "Michigan"
  }
  if (input == "MINNESOTA") {
      return "Minnesota"
  }
  if (input == "MISSISSIPPI") {
      return "Mississippi"
  }
  if (input == "MISSOURI") {
      return "Missouri"
  }
  if (input == "MONTANA") {
      return "Montana"
  }
  if (input == "NEBRASKA") {
      return "Nebraska"
  }
  if (input == "NEVADA") {
      return "Nevada"
  }
  if (input == "NEW_HAMPSHIRE") {
      return "New Hampshire"
  }
  if (input == "NEW_JERSEY") {
      return "New Jersey"
  }
  if (input == "NEW_MEXICO") {
      return "New Mexico"
  }
  if (input == "NEW_YORK") {
      return "New York"
  }
  if (input == "NORTH_CAROLINA") {
      return "North Carolina"
  }
  if (input == "NORTH_DAKOTA") {
      return "North Dakota"
  }
  if (input == "OHIO") {
      return "Ohio"
  }
  if (input == "OKLAHOMA") {
      return "Oklahoma"
  }
  if (input == "OREGON") {
      return "Oregon"
  }
  if (input == "PENNSYLVANIA") {
      return "Pennsylvania"
  }
  if (input == "RHODE_ISLAND") {
      return "Rhode Island"
  }
  if (input == "SOUTH_CAROLINA") {
      return "South Carolina"
  }
  if (input == "SOUTH_DAKOTA") {
      return "South Dakota"
  }
  if (input == "TENNESSEE") {
      return "Tennessee"
  }
  if (input == "TEXAS") {
      return "Texax"
  }
  if (input == "UTAH") {
      return "Utah"
  }
  if (input == "VERMONT") {
      return "Vermont"
  }
  if (input == "VIRGINIA") {
      return "Virginia"
  }
  if (input == "WASHINGTON") {
      return "Washington"
  }
  if (input == "WASHINGTON_DC") {
      return "Washington, DC"
  }
  if (input == "WEST_VIRGINIA") {
      return "West Virginia"
  }
  if (input == "WISCONSIN") {
      return "Wisconsin"
  }
  if (input == "WYOMING") {
      return "Wyoming"
  }

}