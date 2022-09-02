import RenderProject from "./RenderProject";
import RenderLocation from "./RenderLocation";
import RenderAgency from "./RenderAgency";
import RenderDeveloper from "./RenderDeveloper";

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const PROJ_DEFAULT = {
    projectId: '',
    locationId: '',
    agencyId: '',
    sqFt: '',
    projectType: '',
    status: '',
    description: '',
    budget: '',
    developerId: ''
}

function ProjectDetails() {
    const [project, setProject] = useState(PROJ_DEFAULT);
    const { id } = useParams();
    const history = useHistory();

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

    return (
        <>
            <div className="container">
                <h2 className="mb-3 mt-3">View Project</h2>
                <button className="btn btn-outline-primary my-2" onClick={() => history.push('/')}>
                    <i className="bi bi-arrow-bar-left"></i> Back to Map
                </button>
                <RenderProject id={id} />
                <RenderLocation id={project.locationId} />
                <RenderDeveloper id={project.developerId} />
                <RenderAgency id={project.agencyId} />
            </div>
        </>
    )

}

export default ProjectDetails;