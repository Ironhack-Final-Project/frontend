import axios from "axios";
import { useState, useEffect } from "react";

function EventListPage(){

    const [events, setEvents] = useState(null)

    useEffect(()=>{

        axios.get(`${process.env.REACT_APP_API_URL}/events`)
        .then(response=>{
            console.log(response.data)
            setEvents(response.data)
        })
        .catch(e=>{console.log("error getting events list...", e)})
    },[])

    return(
        <div className="events-list">
        <h1>Events</h1>
        {events.map((element) => {
            return(
            <div className="events">
            <p>{element.title}</p>
            <p>{element.date}</p>
            <p>{element.description}</p>
            <p>{element.cost}</p>
            <p>{element.attendees}</p>
            </div>
            )
        })
        }

        </div>
    )
     
    }



export default EventListPage;