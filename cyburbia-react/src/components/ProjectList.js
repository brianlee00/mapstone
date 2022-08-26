import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectList() {

  const [projects, setProjects] = useState([]);

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

  return (
      <>
        <h1 className="mb-4">Project List</h1>
        <Link className="btn btn-primary my-4" to="/project/add">
          <i className="bi bi-plus-circle"></i> Add Project
        </Link>
        <table class="table table-striped table-hover table-sm">
          <thead class="thead-dark">
            <tr>
              <th>Project ID</th>
              <th>Sq. Ft</th>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Budget</th>
              <th>Location</th>
              <th>Agency</th>
              <th>Developers</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.projectId}>
                <td>{project.projectId}</td>
                <td>{project.sqFt}</td>
                <td>{project.projectType}</td>
                <td>{project.status}</td>
                <td>{project.description}</td>
                <td>{project.budget}</td>
                <td>{project.locationId}</td>
                <td>{project.agencyId}</td>
                <td>{project.developers}</td>
                <td>
                  <div className="float-right mr-2">
                    <Link className="btn btn-primary btn-sm mr-2" to={`/project/edit/${project.projectId}`}>
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
  );
}

export default ProjectList;