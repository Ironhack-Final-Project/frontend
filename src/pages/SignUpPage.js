import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
 
function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };
 
    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
          console.log(error.message)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
 
  
  return (
    <div>
      <h1>Sign Up</h1>

      { errorMessage ? <p>{errorMessage}</p>: '' }
 
      <form onSubmit={handleSignupSubmit}>
        <label>User Name:</label>
        <input 
          type="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        <button type="submit">Sign Up</button>
      </form>
 
      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}
 
export default SignUpPage;