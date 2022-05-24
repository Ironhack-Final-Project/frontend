import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EventDetails() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEventDetails(response.data);
      })
      .catch((e) => {
        console.log("error getting blog list...", e);
      });
  }, []);

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
        </div>
      )}
    </div>
  );
}
export default EventDetails;
