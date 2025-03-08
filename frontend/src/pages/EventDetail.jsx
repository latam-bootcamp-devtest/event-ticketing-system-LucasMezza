import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom'
import { addBook, getEventById } from '../services/crud';

export const EventDetail = () => {
  const { id } = useParams();
  const [ event, setEvent ] = useState(null)
  const [ formShow, setFormShow ] = useState(false)
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ state, setState ] = useState('')

  const showFrom = e => {
    setFormShow(prevState => !prevState)
  }

  const handleTotal = e => {
    const total = event.price * Number(e.target.value)
    setTotalPrice(total)
  }

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if(!formData.get('customerName')) {
      setState('Fill in all the fields')
      return
    }

    if(!formData.get('ticketQuantity') || Number(formData.get('ticketQuantity')) < 1 || Number(formData.get('ticketQuantity')) > 10 ) {
      setState('Ticket quantity have to be between 1 - 10')
      return
    }

    const body = {
      eventId: event.id,
      ticketQuantity: Number(formData.get('ticketQuantity')),
      customerName: formData.get('customerName')
    }

    addBook(body)
      .then(res => setState("Book a ticket successfully"))
      .catch(err => setState("Server error"))
  }

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
                {formShow ? 
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Customer´s name</label>
                      <input type="text" name='customerName' />
                    </div>
                    <div>
                      <label>Tickets to book</label>
                      <input type="number" min={1} max={10} name='ticketQuantity' onInput={handleTotal}/>
                    </div>
                    <div>
                      <label>Total price: ${totalPrice}</label>
                    </div>
                    {state ? <p style={{color: "red"}}>{state}</p> : null}
                    <div>
                      <button disabled={totalPrice == 0}>Book now!</button>
                      <button onClick={showFrom}>Cancel</button>
                    </div>
                  </form>
                  : null
                }
                {!formShow ?  <button onClick={showFrom}>Book now!</button> : null}
              </article>
          </>
          : <p>Event not found</p>
        }
      </div>
    </section>
  )
}