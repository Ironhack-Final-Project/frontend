import { useState, useEffect, useContext } from "react";
import "./EventPageList.css";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function EventListPage(props) {
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    user === null ? console.log("user undefined") : setUserId(user);
    props.fetchEvents()
  }, [user, userId]);

  return (
    <div className="events-page" >
      <h1>Classes</h1>

      <div className="events-list">

        {props.allEvents === null ? (
          <p>Loading...</p>
        ) : (
          props.allEvents.map((element) => {
            return (
              <div className="event-element">
                <img alt="" src={element.imageUrl}></img>
                <h2>{element.name}</h2>
                <NavLink className="nav-link" to={`/events/${element._id}`}>More details</NavLink><br />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EventListPage;
