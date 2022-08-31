import { useEffect, useState } from 'react';


const DEVELOPER_DEFAULT = {
    name: '',
    email: '',
    locationId: ''
};

function RenderDeveloper({ id }) {

    const [developer, setDeveloper] = useState(DEVELOPER_DEFAULT);

    // const { id } = useParams();


    useEffect(() => {
        // Make sure that we have an "id" value...
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


    return (
        <>
            <div className="container">
                <h5>Project Developer:</h5>
                <ul>
                    <li>{developer.name}</li>
                    <li>{developer.email}</li>
                </ul>
            </div>
        </>
    )

}
export default RenderDeveloper;