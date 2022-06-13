import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import BounceLoader from "react-spinners/ClipLoader"

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

  if (isLoading) {
    return <div className="spinner-div">
    <BounceLoader color="#041C32" loading={loading}  size={100} className="spinner" />
    </div>;
  } else if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;