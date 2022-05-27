import axios from "axios"
import { useEffect, useState } from "react"
import { Scheduler, useArrayState } from "@cubedoodl/react-simple-scheduler";
import "./OverviewDogcare.css"

function OverviewDogcare(props) {
  const [events, setEvents, addEvent] = useArrayState([]);
  const [hoursToday, setHoursToday] = useState([])
  const [hours, setHours] = useState([])
  let array = []
  const storedToken = localStorage.getItem('authToken')


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        return response.data.map((element) => {
          return element.dogcare.map((element) => {
            return (
              array.push({
                name: element.owner,
                from: element.from ? new Date(element.from) : null,
                to: element.to ? new Date(element.to) : null,
                calendar: { name: "", enabled: true },
                repeat: 0,
                dogs: element.dogs
              }
              )
            )
          })
        })

      })
      .then(response => {
        setEvents(array)

        array.forEach((element) => {
          const num = Number((Number(new Date(element.to).toString().slice(16, 18) + "." + new Date(element.to).toString().slice(19, 21)) - Number(new Date(element.from).toString().slice(16, 18) + "." + new Date(element.from).toString().slice(19, 21))).toFixed(2))
          return setHours(preArr => [...preArr, num])
        })

        array.forEach((element) => {
          if (new Date(element.from).toString().slice(0, 15) === new Date().toString().slice(0, 15)) {
            const num = Number((Number(new Date(element.to).toString().slice(16, 18) + "." + new Date(element.to).toString().slice(19, 21)) - Number(new Date(element.from).toString().slice(16, 18) + "." + new Date(element.from).toString().slice(19, 21))).toFixed(2))
            return setHoursToday(preArr => [...preArr, num])
          }

        })

      })
      .catch((e) => console.log("error getting projects from API...", e));
  }, [])

  return (
    <>
      <Scheduler
        events={events}
        selected={props.selected}
        setSelected={props.setSelected}
        onRequestAdd={(evt) => {
          addEvent({ ...evt, name: "newEvent" })
        }}
      />
      <div>
        <h2>Today</h2>
        {/* {console.log(events)} */}
        {events.map((element) => {
          {/* console.log(element) */ }
          return (new Date(element.from).toString().slice(0, 15) === new Date().toString().slice(0, 15) ? (
            <div className="client-today">
              <p>{element.name}</p>
              {element.dogs.length ? <p>Dogs: {element.dogs.length}x</p> : <p>Dogs: 1x</p>}
              <p>hours: {(Number(new Date(element.to).toString().slice(16, 18) + "." + new Date(element.to).toString().slice(19, 21)) - Number(new Date(element.from).toString().slice(16, 18) + "." + new Date(element.from).toString().slice(19, 21))).toFixed(2)}</p>
              <p>turnover: {((Number(new Date(element.to).toString().slice(16, 18) + "." + new Date(element.to).toString().slice(19, 21)) - Number(new Date(element.from).toString().slice(16, 18) + "." + new Date(element.from).toString().slice(19, 21))).toFixed(2) * 15) * (element.dogs.length ? element.dogs.length : 1)}€</p>

            </div>
          ) : null)
        })}
      </div>
    </>
  );




}

export default OverviewDogcare