import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import "./EventDetails.css"

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

  const fetchEvent = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${eventId}`)
      .then((response) => {
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
        fetchEvent();
      })
      .catch((err) => console.log("error attending event...", err));
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
        fetchEvent();
      })
      .catch((err) => console.log("error attending event...", err));
  };

  return (
    <div className="event-details">
      {eventDetails === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <div class='events-details-content'>
          <h1>{eventDetails.name}</h1>
          {/* <img class='event-background' src={eventDetails.imageUrl}/> */}
            <div class="event-details-left">
              
              <h3 class="desc-header">Description:</h3>
              <p className="description">{eventDetails.description}</p>
              <div className="attend-btn">
                {userId === null ? (
                  <button onClick={() => { navigate("/login") }} className="attend-btn">Login to Attend</button>
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
                <div className="event-details-attending">
                  <h3>Attending:</h3>
                  <div className="attending-content">
                  {eventDetails.attendees.map((element) => {
                    return (
                      <>

                        <div className="event-dogs">
                          <h4>{element.username}</h4>
                          {element.dogs.map((dog) => {
                            return (
                              <div className="event-dog">
                                <div className="dog-info">
                                  <img alt="" src={dog.imageUrl} />
                                  <p className="dog-name">{dog.name}</p>
                                  <p>({dog.breed})</p>
                                </div>

                              </div>
                            )
                          })}
                        </div>
                      </>);
                  })}
                  </div>
                  


                </div>
              </div>
            </div>

            <div className="event-details-right">
              <p>Date: {eventDetails.from.slice(0, 10)}</p>
              <p>From: {eventDetails.from.slice(11, 16)} h</p>
              <p>To: {eventDetails.to.slice(11, 16)} h</p>
              <p>Price: {eventDetails.cost}€/h</p>
              <p>Location: {eventDetails.location}</p>
              {eventDetails.repeat === 1 ? <p>Every Week</p> : null}
              {eventDetails.repeat === 2 ? <p>Every Month</p> : null}
            </div>
            </div>
        {/* // </div> */}
        </>
      )}
    </div>
  );
}
export default EventDetails;
