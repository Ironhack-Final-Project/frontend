import React, { useState, useEffect } from "react";
import {
  Calendar,
  Scheduler,
  useArrayState,
} from "@cubedoodl/react-simple-scheduler";
import { useNavigate } from "react-router-dom";
import "./Scheduler.css"


function Calender(props) {
//   const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState([]);
  const [arr, setArr] = useState([])
  const navigate = useNavigate()


  const renderArr = () => {
     
      setArr((prevArr)=>{
       return( props.events.map((element) => {
            return {
              name: element.name,
              from: new Date(element.from),
              to: new Date(element.to),
              description: element.description,
              cost: element.cost,
              location: element.location,
              calendar: element.calendar,
              enabled: element.enabled,
              repeat: element.repeat,
              id: element._id
            };
          }))
      })
  };

  useEffect(() => {
    if(arr[0]===undefined){
        renderArr();
    }
    else{
        setEvents(arr);
    }
  }, [arr]);


  return (
    <>
      {/* <Calendar
        selected={selected}
        setSelected={setSelected}
      /> */}
      <Scheduler
        events={events}
        selected={props.selected}
        setSelected={props.setSelected}
        // onRequestAdd={(evt) => {
        //     addEvent({...evt, name: "newEvent"})
        //     }}
        onRequestEdit={(evt) => {navigate(`/events/${evt.id}`)}}
      />
    </>
  );
}

export default Calender;
