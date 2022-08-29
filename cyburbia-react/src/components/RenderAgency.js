import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';


const AGENCY_DEFAULT = {
    name: '',
    email: '',
    locationId: 0
};

function RenderAgency() {
    const [agency, setAgency] = useState(AGENCY_DEFAULT);
    const [errors, setErrors] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        // Make sure that we have an "id" value...
        if (id) {
            fetch(`http://localhost:8080/api/agency/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setAgency(data))
                .catch(console.log);
        }
    }, [id]);


    return (
        <>
            <div>
                <h5>Planning Agency:</h5>
                <ul>
                    <li>{agency.name}</li>
                    <li>{agency.email}</li>
                </ul>
            </div>
        </>
    )

}
export default RenderAgency;