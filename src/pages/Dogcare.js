import React, { useState } from "react";
import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/auth.context'
import { Calendar, Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
import axios from "axios";

function DogCare(){
  const [selected, setSelected] = useState(new Date());
  const [events, setEvents, addEvent] = useArrayState();
  const [dogcare, setDogcare] = useState([])
  const [arr, setArr] = useState([])
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken')

  useEffect(()=>{
    if (user === null){
        console.log(1)
        return
    }
    else if(arr[0]!==undefined){
        console.log("array arrived", arr)
        setEvents(arr)
    }
    else if(user) {
        console.log(2)
        fetchDogcare()
        
    }
  },[user, arr])

  const renderArr = (array) => {
      console.log("array to render...", array)
    setArr((prevArr)=>{
     return( array.map((element) => {
         console.log(element.from)
         console.log(new Date(element.from))
          return {
            name: element.name,
            from: new Date(element.from),
            to: new Date(element.to),
            calendar: element.calendar,
            repeat: element.repeat,
            owner: element.owner,
            dogs: element.dogs
          };
        }))
    })
};

  const addDogcare = (object)=>{
      axios.put(`${process.env.REACT_APP_API_URL}/auth/user/${user._id}/add-dogcare`, 
      object,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response=>{
          console.log("adding dogcare successful", response)
      })
      .catch(err=>{console.log(err)})
  }

  const fetchDogcare =()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/auth/user/${user._id}`)
      .then(response=>{
          setDogcare(response.data.dogcare)
          return response.data.dogcare
        })
      .then(response=>{
          console.log(response)
            renderArr(response)
            return
      })
      .then(response=>console.log(arr))
      .then(setEvents(arr))
      .catch(err=>{console.log(err)})
  }

  // const getDogArr = ()=>{
  //   const dogArr = user.dogs.map((element)=>{
  //     return({
  //       name: element.name,
  //       breed: element.breed
  //   })
  //   })
  // }
 
    
  // console.log("dogAARRRRRRRAY", dogArr)

  return (
    <>
      {/* <Calendar
        selected={selected}
        setSelected={setSelected}
      /> */}
      <Scheduler
        events={events}
        selected={selected}
        setSelected={setSelected}
        onRequestAdd={(evt) => {
            {console.log({...evt, name: "Dogcare", enabled: true})}
            addEvent({...evt, name: "Dogcare", enabled: true});
            addDogcare({...evt, name: "Dogcare", enabled: true, owner: user.username, dogs: user.dogs })
            }}
        onRequestEdit={(evt) => alert("Edit element requested")}
      />
    </>
  );
}

export default DogCare;
