import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const LOCATION_DEFAULT = {
    address: '',
    city: '',
    state: 'NEW_YORK',
    zipCode: ''
};

function RenderLocation() {

    const [location, setLocation] = useState(LOCATION_DEFAULT);
    const [errors, setErrors] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Make sure that we have an "id" value...
        if (id) {
            fetch(`http://localhost:8080/api/location/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .then(data => setLocation(data))
                .catch(console.log);
        }
    }, [id]);


    return (
        <>
            <div>
                <h5>Project Location:</h5>
                <ul>
                    <li>{location.address}</li>
                    <li>{location.city}</li>
                    <li>{location.state}</li>
                    <li>{location.zipCode}</li>
                </ul>
            </div>
        </>
    )

}

export default RenderLocation;