import { useEffect, useState } from "react";
import { getEvents } from "../services/crud";
import { EventsList } from "../components/EventsList";

export const Panel = () => {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    getEvents()
    .then(data => setEvents(data))
    .catch(err => console.error(err))
  }, [])

  return (
  <section>
    <h1>Admin panel</h1>
    <div>
      <div>
        <p>Events list</p>
        <button>Create event</button>
      </div>
      <EventsList events={events} user={'admin'}/>
    </div>
  </section>
  )
}