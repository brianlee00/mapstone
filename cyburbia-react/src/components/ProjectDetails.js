import RenderProject from "./RenderProject";
import RenderLocation from "./RenderLocation";
import RenderAgency from "./RenderAgency";
import RenderDeveloper from "./RenderDeveloper";

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
    developerId: ''
}

function ProjectDetails() {
    const [project, setProject] = useState(PROJ_DEFAULT);
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

    return (
        <>
            <div className="container">
                <RenderProject id={id}/>
                <RenderLocation id={project.locationId}/>
                <RenderAgency id={project.agencyId}/>
                <RenderDeveloper id={project.developerId}/>
            </div>
        </>
    )

}

export default ProjectDetails;