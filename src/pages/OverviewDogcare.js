import axios from "axios"
import { useEffect, useState } from "react"
import {
    Calendar,
    Scheduler,
    useArrayState,
  } from "@cubedoodl/react-simple-scheduler";

function OverviewDogcare(props){
const [events, setEvents, addEvent] = useArrayState([]);
const arr= []

useEffect(()=>{
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users`)
      .then((response) => {
          console.log(response.data)
           return response.data.map((element)=>{
              return  element.dogcare.map((element)=>{
                     return (
                         arr.push(
                         {
                        name: element.owner,
                        from: element.from? new Date(element.from) : null,
                        to: element.to? new Date(element.to) : null,
                        calendar: {name: "", enabled: true},
                        repeat: 0
                        }
                         )
                     )
                })
            })
      })
      .then(response=>{
      setEvents(arr)
    // console.log("all together", arr)
    return
      })
      .then(response=>{
          console.log("SHOULD WORK NOW", events)
      })
      .catch((e) => console.log("error getting projects from API...", e));

},[])


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
        onRequestAdd={(evt) => {
            addEvent({...evt, name: "newEvent"})
            }}
        // onRequestEdit={(evt) => {navigate(`/events/${evt.id}`)}}
      />
    </>
  );

}

export default OverviewDogcare