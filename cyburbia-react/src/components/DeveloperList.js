import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function DeveloperList() {
    const [developers, setDevelopers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8080/api/developer')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`)
                }
            })
            .then(data => setDevelopers(data))
            .catch(console.log);
    }, []);

    return (
        <>
            <div className="container">
                <h2 className="mb-3 mt-3">Developers</h2>
                <button className="btn btn-primary my-4" onClick={() => history.push('/developers/add')}>
                    <i className="bi bi-plus-circle"></i> Add Developer
                </button>

                <table className="table table-striped table-hover table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Developer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>%nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developers.map(developer => (
                            <tr key={developer.developerId}>
                                <td>{developer.developerId}</td>
                                <td>{developer.name}</td>
                                <td>{developer.email}</td>
                                <td>
                                    <div className="float-right mr-2">
                                        <Link className="btn btn-primary btn-sm" to={`developers/edit/${developer.developerId}`}>
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

export default DeveloperList;