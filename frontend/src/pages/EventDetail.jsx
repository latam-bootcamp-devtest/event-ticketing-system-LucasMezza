import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { getEventById } from '../services/crud';

export const EventDetail = () => {
  const { id } = useParams();
  const [ event, setEvent ] = useState(null)

  useEffect(() => {
    getEventById(id)
    .then(data => setEvent(data))
    .catch(err => console.error(err))
  }, [])

  return (
    <section className='event-detail'>
      <header className='btn-back'>
        <NavLink to={`/`} >
          Events list
        </NavLink>
      </header>
      <div>
        {event ?
          <>
              <aside>
                <img src={event.image} alt="" />
              </aside>
              <article>
                <strong>Event: {event.name}</strong>
                <span>Date: {event.date}</span>
                <span>Location: {event.location}</span>
                <p>Event escription: {event.descripction}</p>
                <span>Ticket price: ${event.price}</span>
                <span>Available tickets: {event.availableTickets}</span>
              </article>
          </>
          : <p>Event not found</p>
        }
      </div>
    </section>
  )
}