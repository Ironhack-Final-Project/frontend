// src/pages/LoginPage.js

import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from '../context/auth.context'


function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
     const {storeToken, authenticateUser} = useContext(AuthContext)

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };
     
        axios.post(`${process.env.REACT_APP_API_URL}api/auth/login`, requestBody)
          .then((response) => {

            const jwt = response.data.authToken
          
            storeToken(jwt)
            authenticateUser()
    
            navigate('/');
          })
          .catch((error) => {
            const errorDescription = error.response.message;
            setErrorMessage(errorDescription);
          })
      };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleLoginSubmit}>
                <label>Username:</label>
                <input
                    type="username"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />

                <button type="submit">Login</button>
            </form>

            <p>Don't have an account yet?</p>
            <Link to={"/signup"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage;
