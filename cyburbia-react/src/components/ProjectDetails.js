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
        }
    }, [id], []);





    return (
        <>
            <div className="container">
                <h2 className="mb-3 mt-3">View Project</h2>
                <button className="btn btn-primary my-2" onClick={() => history.push('/')}>
                    <i className="bi bi-arrow-bar-left"></i> Back to Map
                </button>
                <div className="container">




                </div>
            </div>
        </>
    )

}

export default ProjectDetails;