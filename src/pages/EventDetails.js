import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function EventDetails(props) {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);
const navigate = useNavigate();

  useEffect(() => {

    user === null ? console.log("user undefined") : setUserId(user);
    fetchEvent() 
  }, [user]);

  const fetchEvent =()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}/events/${eventId}`)
    .then((response) => {
      console.log(response.data);
      setEventDetails(response.data);
    })
    .catch((e) => {
      console.log("error getting blog list...", e);
    });
  }


  const pushIdIntoEventArr = (eventId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/events/${eventId}/pushAttendee`, {
        id: userId._id,
      })
      .then((response) => {
        console.log(response.data);
        fetchEvent();
      })
      .catch((err) => console.log("error attending event...", err));
  };

  const attendEvent = (eventId) => {
      console.log(userId)
    userId === null ? navigate("/login") : pushIdIntoEventArr(eventId);
  };

  const unattendEvent = (eventId) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/events/${eventId}/pullAttendee`, {
        id: userId._id,
      })
      .then((response) => {
        console.log(response.data);
        fetchEvent();
      })
      .catch((err) => console.log("error attending event...", err));
  };

  return (
    <div>
      {eventDetails === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{eventDetails.name}</h1>
          <p>Date: {eventDetails.from.slice(0, 10)}</p>
          <p>From: {eventDetails.from.slice(11, 16)} h</p>
          <p>To: {eventDetails.to.slice(11, 16)} h</p>
          <p>Description: {eventDetails.description}</p>
          <p>Price: {eventDetails.cost}</p>
          <p>Location: {eventDetails.location}</p>
          {eventDetails.repeat == 1 ? <p>every week</p> : null}
          {eventDetails.repeat == 2 ? <p>every month</p> : null}

          <div>
            <h5>Attending:</h5>
            {eventDetails.attendees.map((element) => {
              return (
                <>
                  <p>{element.username}</p>
                </>
              );
            })}
          </div>
          {userId === null ? (
                <button onClick={()=>{navigate("/login")}}>Login to Attend</button>
              ) : eventDetails.attendees.find(
                  (attending) => attending._id === userId._id
                ) === undefined ? (
                <button
                  onClick={() => {
                    attendEvent(eventDetails._id);
                  }}
                >
                  Attend
                </button>
              ) : (
                <button
                  onClick={() => {
                    unattendEvent(eventDetails._id);
                  }}
                >
                  Unattend
                </button>
              )}
        </div>
      )}
    </div>
  );
}
export default EventDetails;
