// NEW: import useContext
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Error from "./Error";
// NEW: import AuthContext
import AuthContext from "../context/AuthContext";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // NEW: grab the value attribute from AuthContext.Provider
    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (response.status === 201) {
            history.push("/login");
        } else if (response.status === 403) {
            setErrors(["Login failed."]);
        } else {
            setErrors(["Unknown error."]);
        }

    };




return (
    <div className="container">
        <h2 className="mt-3">Register</h2>
        {errors.map((error, i) => (
            <Error key={i} msg={error} />
        ))}
        <form className="form-group" onSubmit={handleSubmit}>
            <div>
                {/* Includes for/id attributes for basic HTML accessibility ♿. */}
                <label htmlFor="username">Username: </label>
                <input className="form-control"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    id="username"
                />
            </div>
            <div className="mt-3">
                <label htmlFor="password">Password: </label>
                <input className="form-control"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    id="password"
                />
            </div>
            <div>
                <button className="btn btn-success mt-3" type="submit">Create New User</button>
            </div>
        </form>
    </div>
);
}
