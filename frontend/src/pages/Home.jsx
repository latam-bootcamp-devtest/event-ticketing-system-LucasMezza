import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { getEvents } from "../services/crud";
import { EventsList } from "../components/EventsList";

export const Home = () => {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    getEvents()
    .then(data => setEvents(data))
    .catch(err => console.error(err))
  }, [])

  return (
  <section>
    <header className='btn-back'>
      <NavLink to={`/booking-history`} >
        User history books
      </NavLink>
    </header>
    <EventsList events={events} user={'user'}/>
  </section>
  )
}