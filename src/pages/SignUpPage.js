import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {uploadImage} from '../components/utitlityFunctions'
 
function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [adminKey, setAdminKey] = useState("");
 
  const navigate = useNavigate();

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, username, imageUrl, adminKey };

    if (requestBody.imageUrl === ''){
      delete requestBody.imageUrl
  }

  console.log(requestBody)
 
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

  const handleFileUpload = (e) => {
    
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
        .then(response => {
            console.log("response is: ", response);
            setImageUrl(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
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
        <label>Upload Profile:</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} /><br />

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
        
        <label>Admin Key:</label>
        <input 
          type="password"
          name="adminKey"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
        />

        
 
        <button type="submit">Sign Up</button>
      </form>
 
      <p>Already have account?</p>
      <Link to={"/f"}> Login</Link>
    </div>
  )
}
 
export default SignUpPage;