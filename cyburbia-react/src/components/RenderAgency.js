import { useEffect, useState } from 'react';



const AGENCY_DEFAULT = {
    name: '',
    email: '',
    locationId: 0
};

function RenderAgency({ id }) {
    const [agency, setAgency] = useState(AGENCY_DEFAULT);

    // const { id } = useParams();


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
            <div className="container mb-2 mt-2">
                <h4>Planning Agency:</h4>
                {agency.name}<br></br>{agency.email}
            </div>
        </>
    )

}
export default RenderAgency;