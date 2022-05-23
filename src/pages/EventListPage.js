import axios from "axios";
import { useState, useEffect } from "react";
import "./EventPageList.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function EventListPage() {
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    user === null ? console.log("user undefined") : setUserId(user);
    updateEvents();
  }, [user, userId ]);

  const pushIdIntoEventArr = (eventId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/events/${eventId}/pushAttendee`, {
        id: userId._id,
      })
      .then((response) => {
        console.log(response.data);
        updateEvents();
      })
      .catch((err) => console.log("error attending event...", err));
  };

  const updateEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events`)
      .then((response) => {
        console.log(response.data);
        return setEvents(response.data);
      })
      .catch((e) => {
        console.log("error getting events list...", e);
      });
  };

  const attendEvent = (eventId) => {
    userId === null ? navigate("/login") : pushIdIntoEventArr(eventId);
  };

  const unattendEvent = (eventId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/events/${eventId}/pullAttendee`, {
        id: userId._id,
      })
      .then((response) => {
        console.log(response.data);
        updateEvents();
      })
      .catch((err) => console.log("error attending event...", err));
  };

  return (
    <div className="events-list">
      <h1>Events</h1>
      {events === null ? (
        <p>Loading...</p>
      ) : (
        events.map((element) => {
          return (
            <div className="event">
              <h2>{element.title}</h2>
              <p>{element.date}</p>
              <p>Description: {element.description}</p>
              <p>Price: {element.cost}</p>

              {userId === null ? (
                <button onClick={()=>{navigate("/login")}}>Login to Attend</button>
              ) : element.attendees.find(
                  (attending) => attending._id === userId._id
                ) === undefined ? (
                <button
                  onClick={() => {
                    attendEvent(element._id);
                  }}
                >
                  Attend
                </button>
              ) : (
                <button
                  onClick={() => {
                    unattendEvent(element._id);
                  }}
                >
                  Unattend
                </button>
              )}

              <div className="attendees">
                <h4>Attending:</h4>
                {element.attendees.map((element) => {
                  return (
                    <>
                      <p>{element.username}</p>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default EventListPage;
