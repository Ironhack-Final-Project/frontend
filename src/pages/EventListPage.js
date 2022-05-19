import axios from "axios";
import { useState, useEffect } from "react";
import "./EventPageList.css"

function EventListPage(){

    const [events, setEvents] = useState(null)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then(response=>{
            console.log(response.data)
           return setEvents(response.data)
        })
        .catch(e=>{console.log("error getting events list...", e)})
    },[])

    return(
        <div className="events-list">
        <h1>Events</h1>
        {events===null?
        <p>Loading...</p>:
        events.map((element) => {
            return(
            <div className="event">
            <h2>{element.title}</h2>
            <p>{element.date}</p>
            <p>Description: {element.description}</p>
            <p>Price: {element.cost}</p>
            <p>{element.attendees}</p>
            </div>
            )
        })
        }
      
        

        </div>
    )
     
    }



export default EventListPage;