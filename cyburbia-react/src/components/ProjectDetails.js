import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const PROJ_DEFAULT = {
    projectId: '',
    locationId: '',
    agencyId: '',
    sqFt: '',
    projectType: '',
    status: '',
    description: '',
    budget: '',
    developers: []
}



function ProjectDetails() {
    const [project, setProject] = useState(PROJ_DEFAULT);
    const [locations, setLocations] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        // Make sure that we have an "id" value...
        if (id) {
            fetch(`http://localhost:8080/api/project/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setProject(data))
                .catch(console.log);
        }
    }, [id]);

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
            .then(data => setDevelopers(data))
            .catch(console.log);
    }, []);




    return (locations.length > 0) && (
        <>
            <div className="container">
                <h2 className="mb-3 mt-3">View Project</h2>
                <button className="btn btn-primary my-2" onClick={() => history.push('/')}>
                    <i className="bi bi-arrow-bar-left"></i> Back to Map
                </button>
                <div className="container">
                    <h4 className="mb-2 mt-2">{project.status} - {project.projectType}</h4>
                    <h6 className="mb-2 mt-2">{project.description}</h6>
                    <div>
                        <h5>Project Location:</h5>
                        <ul>
                            <li>{locations[project.locationId - 1].address}</li>
                            <li>{locations[project.locationId - 1].city}</li>
                            <li>{locations[project.locationId - 1].state}</li>
                            <li>{locations[project.locationId - 1].zipCode}</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Planning Agency:</h5>
                        <ul>
                            <li>{agencies[project.agencyId - 1].name}</li>
                            <li>{agencies[project.agencyId - 1].email}</li>
                        </ul>
                    </div>
                    <div>
                        <h5>Project Developer:</h5>
                        <ul>
                            <li>{developers[project.agencyId - 1].name}</li>
                            <li>{developers[project.agencyId - 1].email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProjectDetails;