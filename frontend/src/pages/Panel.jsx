import { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../services/crud";
import { EventsList } from "../components/EventsList";

export const Panel = () => {
  const [ events, setEvents ] = useState([])
  const [ error, setError ] = useState('')

  const handleEdit = (e, id) => {}

  const handleDelete = (e, id) => {}

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
      <EventsList events={events} user={'admin'} handleEdit={handleEdit} handleDelete={handleDelete}/>
    </div>
  </section>
  )
}