import { useEffect, useState } from 'react';


const LOCATION_DEFAULT = {
    address: '',
    city: '',
    state: 'NEW_YORK',
    zipCode: ''
};

function RenderLocation({ id }) {

    const [location, setLocation] = useState(LOCATION_DEFAULT);

    // const { id } = useParams();

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
            <div className="container mt-2 mb-2">
                <h6>Project Location:</h6> {location.address}, {location.city}, {convertState(location.state)}, {location.zipCode}
            </div>
        </>
    )

}

function convertState(input) {
    if (input === "ALABAMA") {
        return "Alabama"
    }
    if (input === "ALASKA") {
        return "Alaska"
    }
    if (input === "ARIZONA") {
        return "Arizona"
    }
    if (input === "ARKANSAS") {
        return "Arkansas"
    }
    if (input === "CALIFORNIA") {
        return "California"
    }
    if (input === "COLORADO") {
        return "Colorado"
    }
    if (input === "CONNECTICUT") {
        return "Connecticut"
    }
    if (input === "DELAWARE") {
        return "Delaware"
    }
    if (input === "FLORIDA") {
        return "Florida"
    }
    if (input === "GEORGIA") {
        return "Georgia"
    }
    if (input === "HAWAII") {
        return "Hawaii"
    }
    if (input === "IDAHO") {
        return "Idaho"
    }
    if (input === "ILLINOIS") {
        return "Illinois"
    }
    if (input === "INDIANA") {
        return "Indiana"
    }
    if (input === "IOWA") {
        return "Iowa"
    }
    if (input === "KANSAS") {
        return "Kansas"
    }
    if (input === "KENTUCKY") {
        return "Kentucky"
    }
    if (input === "LOUISIANA") {
        return "Louisiana"
    }
    if (input === "MAINE") {
        return "Maine"
    }
    if (input === "MARYLAND") {
        return "Maryland"
    }
    if (input === "MASSACHUSETTS") {
        return "Massachusetts"
    }
    if (input === "MICHIGAN") {
        return "Michigan"
    }
    if (input === "MINNESOTA") {
        return "Minnesota"
    }
    if (input === "MISSISSIPPI") {
        return "Mississippi"
    }
    if (input === "MISSOURI") {
        return "Missouri"
    }
    if (input === "MONTANA") {
        return "Montana"
    }
    if (input === "NEBRASKA") {
        return "Nebraska"
    }
    if (input === "NEVADA") {
        return "Nevada"
    }
    if (input === "NEW_HAMPSHIRE") {
        return "New Hampshire"
    }
    if (input === "NEW_JERSEY") {
        return "New Jersey"
    }
    if (input === "NEW_MEXICO") {
        return "New Mexico"
    }
    if (input === "NEW_YORK") {
        return "New York"
    }
    if (input === "NORTH_CAROLINA") {
        return "North Carolina"
    }
    if (input === "NORTH_DAKOTA") {
        return "North Dakota"
    }
    if (input === "OHIO") {
        return "Ohio"
    }
    if (input === "OKLAHOMA") {
        return "Oklahoma"
    }
    if (input === "OREGON") {
        return "Oregon"
    }
    if (input === "PENNSYLVANIA") {
        return "Pennsylvania"
    }
    if (input === "RHODE_ISLAND") {
        return "Rhode Island"
    }
    if (input === "SOUTH_CAROLINA") {
        return "South Carolina"
    }
    if (input === "SOUTH_DAKOTA") {
        return "South Dakota"
    }
    if (input === "TENNESSEE") {
        return "Tennessee"
    }
    if (input === "TEXAS") {
        return "Texax"
    }
    if (input === "UTAH") {
        return "Utah"
    }
    if (input === "VERMONT") {
        return "Vermont"
    }
    if (input === "VIRGINIA") {
        return "Virginia"
    }
    if (input === "WASHINGTON") {
        return "Washington"
    }
    if (input === "WASHINGTON_DC") {
        return "Washington, DC"
    }
    if (input === "WEST_VIRGINIA") {
        return "West Virginia"
    }
    if (input === "WISCONSIN") {
        return "Wisconsin"
    }
    if (input === "WYOMING") {
        return "Wyoming"
    }

}

export default RenderLocation;