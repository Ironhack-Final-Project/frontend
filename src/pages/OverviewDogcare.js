import axios from "axios"
import { useEffect, useState } from "react"
import {
    Calendar,
    Scheduler,
    useArrayState,
  } from "@cubedoodl/react-simple-scheduler";

function OverviewDogcare(props){
const [events, setEvents, addEvent] = useArrayState([]);
const arr= [];
const hours = []
// const date = new Date()

console.log(1.3-0.2)
// console.log(new Date(events[0].from).toString().slice(0,15))

useEffect(()=>{
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users`)
      .then((response) => {
           return response.data.map((element)=>{
              return  element.dogcare.map((element)=>{
                     return (
                         arr.push(
                         {
                        name: element.owner,
                        from: element.from? new Date(element.from) : null,
                        to: element.to? new Date(element.to) : null,
                        calendar: {name: "", enabled: true},
                        repeat: 0, 
                        dogs: element.dogs
                        }
                         )
                     )
                })
            })
      })
      .then(response=>{
      setEvents(arr)
    return
      })
      .then(response=>{
          // console.log("SHOULD WORK NOW", events)
      })
      .catch((e) => console.log("error getting projects from API...", e));

},[])


events.forEach((element)=>{
  const num = Number( (Number(new Date(element.to).toString().slice(16,18) + "." + new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2))
  hours.push(num)
})

console.log(hours)


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
    <div>
      <h2>Today</h2>
          {/* {console.log(events)} */}
       {events.map((element)=>{
         {/* console.log(element) */}
       return (new Date(element.from).toString().slice(0,15) === new Date().toString().slice(0,15)? (
         <div>
         <p>{element.name}</p>
         <p>Dogs: {element.dogs.length}x</p>
         <p>hours: {(Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)}</p>
        <p>turnover: {((Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)*15)}€</p>
          <hr/>
        </div>
         ) : null)
      })} 
      <h5>Sum: {(hours.reduce((a,b)=> a + b, 0)*15).toFixed(2)}€</h5>
    </div>
  </>
);




}






// console.log(Number(new Date().toString().slice(16,18)+"."+new Date().toString().slice(19,21)))

export default OverviewDogcare