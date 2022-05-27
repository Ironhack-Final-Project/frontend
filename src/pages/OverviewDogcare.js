import axios from "axios"
import { useEffect, useState } from "react"
import {
    Calendar,
    Scheduler,
    useArrayState,
  } from "@cubedoodl/react-simple-scheduler";

function OverviewDogcare(props){
const [events, setEvents, addEvent] = useArrayState([]);
const hours =[];
const [arr, setArr] = useState([]);
// const date = new Date()
let array = []
const storedToken = localStorage.getItem('authToken')

// console.log(new Date(events[0].from).toString().slice(0,15))

useEffect(()=>{
  console.log("useeffect called")
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users`, 
      { headers: { Authorization: `Bearer ${storedToken}`}}
      )
      .then((response) => {
        console.log("response.datat....", response.data)
           return response.data.map((element)=>{
             console.log("element.dogcare...", element.dogcare)
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
                        //  arr.push(
                         
                        //  )
                     )
                })
            })
            
      } )
      .then(response=>{
        console.log("araaaaay", array)
        setEvents(array)
      })
      .catch((e) => console.log("error getting projects from API...", e));

  // hours===null? getHours() : console.log("loaded hours")
},[])




  arr.forEach((element)=>{
    console.log("calculating...")
     const num = Number( (Number(new Date(element.to).toString().slice(16,18) + "." + new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2))
     console.log(num)
   return hours.push(num)
   
  })



  



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
         <div>
         <p>{element.name}</p>
         {element.dogs.length? <p>Dogs: {element.dogs.length}x</p> : <p>Dogs: 1x</p> }
         <p>hours: {(Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)}</p>
        <p>turnover: { ((Number(new Date(element.to).toString().slice(16,18)+"."+new Date(element.to).toString().slice(19,21)) - Number(new Date(element.from).toString().slice(16,18)+"."+new Date(element.from).toString().slice(19,21))).toFixed(2)*15) * (element.dogs.length? element.dogs.length : 1) }€</p>
          <hr/>
        </div>
         ) : null)
      })} 
      {hours[0]===undefined||null? <p>Loading...</p> :<h5>Sum: {(hours.reduce((a,b)=> a + b, 0)*15).toFixed(2)}€</h5>}
    </div>
  </>
);




}






// console.log(Number(new Date().toString().slice(16,18)+"."+new Date().toString().slice(19,21)))

export default OverviewDogcare