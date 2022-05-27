import axios from "axios"
import { useEffect, useState } from "react"
import {
    Calendar,
    Scheduler,
    useArrayState,
  } from "@cubedoodl/react-simple-scheduler";
  import "./OverviewDogcare.css"

function OverviewDogcare(props){
const [events, setEvents, addEvent] = useArrayState([]);
const [hoursToday, setHoursToday] =useState([])
const [hours, setHours] =useState([])
// const date = new Date()
let array = []
const storedToken = localStorage.getItem('authToken')


useEffect(()=>{
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users`, 
      { headers: { Authorization: `Bearer ${storedToken}`}}
      )
      .then((response) => {
           return response.data.map((element)=>{
              return  element.dogcare.map((element)=>{
                     return (
                       array.push({
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
            
      } )
      .then(response=>{
        console.log("araaaaay", array)
         setEvents(array)

         array.forEach((element)=>{
          console.log("calculating...")
           const num = Number( (Number(new Date(element.to).toString().slice(16,18) + "." + new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2))
           console.log(num)
         return setHours(preArr=>[...preArr, num])
        })

        array.forEach((element)=>{
          if(new Date(element.from).toString().slice(0,15) === new Date().toString().slice(0,15)){
            const num = Number( (Number(new Date(element.to).toString().slice(16,18) + "." + new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2))
            console.log(num)
          return setHoursToday(preArr=>[...preArr, num])
          }
         
        })

      })
      .catch((e) => console.log("error getting projects from API...", e));


  // hours===null? getHours() : console.log("loaded hours")
},[])



  


console.log(hours)
console.log(hoursToday)


  



// console.log(arr)
// console.log(events)


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
         <div className="client-today">
         <p>{element.name}</p>
         {element.dogs.length? <p>Dogs: {element.dogs.length}x</p> : <p>Dogs: 1x</p> }
         <p>hours: {(Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)}</p>
        <p>turnover: { ((Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)*15) * (element.dogs.length? element.dogs.length : 1) }€</p>
         
        </div>
         ) : null)
      })} 
      {/* {hoursToday.length? <h5>Sum Today: {(hoursToday.reduce((a,b)=> a + b, 0)*15).toFixed(2)}€</h5> : <p>Sum Today: 0</p>}
      {hours.length? <h5>Sum Week: {(hours.reduce((a,b)=> a + b, 0)*15).toFixed(2)}€</h5> : <p>Sum Week: 0</p>} */}
    </div>
  </>
);




}






// console.log(Number(new Date().toString().slice(16,18)+"."+new Date().toString().slice(19,21)))

export default OverviewDogcare