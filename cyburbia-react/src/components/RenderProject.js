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

function RenderProject({ id }) {
    const [project, setProject] = useState(PROJ_DEFAULT);
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    // const { id } = useParams();

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
            <h2 className="mb-3 mt-3">View Project</h2>
            <button className="btn btn-primary my-2" onClick={() => history.push('/')}>
                <i className="bi bi-arrow-bar-left"></i> Back to Map
            </button>
            <div className="container">
                <h4 className="mb-2 mt-2">{convertStatus(project.status)} - {convertType(project.projectType)}</h4>
                <h6 className="mb-2 mt-2">{project.description}</h6>
            </div>
        </>
    )
}

export default RenderProject;