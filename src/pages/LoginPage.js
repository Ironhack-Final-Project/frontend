import axios from "axios";
import './LoginForm.css'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context'


function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
            .then((response) => {

                const jwt = response.data.authToken

                storeToken(jwt)
                authenticateUser()

                navigate('/');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errorMessage ? <p className="error-message">{errorMessage}</p> : ''}

            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className='input-login'>
                    <label>Username:</label><br />
                    <input
                        type="username"
                        name="username"
                        value={username}
                        onChange={handleUsername}
                    /><br />

                    <label>Password:</label><br />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    /><br />
                </div>
                <div className="btn-div">
                    <button className='submit-btn' type="submit">Login</button>
                </div>
            </form>

            <p id="signUp">Don't have an account yet?</p>
            <Link to={"/register"}> Sign Up</Link>
        </div>
    )
}

export default LoginPage;
