import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const DEVELOPER_DEFAULT = {
    name: '',
    email: '',
    locationId: ''
};

function DeveloperForm() {
    const [developer, setDeveloper] = useState(DEVELOPER_DEFAULT);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/developer/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setDeveloper(data))
                .catch(console.log);
        }
    }, [id]);

    const handleChange = (event) => {

        const newDeveloper = { ...developer };

        newDeveloper[event.target.name] = event.target.value;

        setDeveloper(newDeveloper);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (id) {
            updateDeveloper();
        } else {
            addDeveloper();
        }
    };

    const addDeveloper = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(developer)
        };

        fetch('http://localhost:8080/api/developer', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.developerId) {
                    history.push('/developers');
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };

    const updateDeveloper = () => {
        developer.developerId = id;

        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(developer)
        };

        fetch(`http://localhost:8080/api/developer/${id}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (!data) {
                    history.push('/developers');
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };

    return (
        <>
            <div className="container">
                <h2 className="mb-3 mt-3">{id ? 'Update Developer' : 'Add Developer'}</h2>

                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <p>The following errors were found:</p>
                        <ul>
                            {errors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" type="text" className="form-control"
                            value={developer.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="text" className="form-control"
                            value={developer.email} onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                    <button className="btn btn-success mr-2" type="submit">
                        <i className="bi bi-file-earmark-check"></i> {id ? 'Update Developer' : 'Add Developer'}
                    </button>
                    <Link className="btn btn-warning" to="/developers">
                        <i className="bi bi-stoplights"></i> Cancel
                    </Link>
                </div>
                </form>
            </div>
        </>
    );

}

export default DeveloperForm;