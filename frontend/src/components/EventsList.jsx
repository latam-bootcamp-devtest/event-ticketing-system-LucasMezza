import { NavLink } from 'react-router-dom'

export const EventsList = ({events = [], user = 'user', handleEdit = () => {}, handleDelete = () => {}}) => {
  return (
    <section>
        {events && events.length > 0 ?
          <ul className="events-list">
            {events.map(row => (
              <li key={row.id} className="event">
                <NavLink to={`/event-details/${row.id}`}>
                  <img src={row.image} alt="" />
                  <p>Name: {row.name}</p>
                  <span>Date: {row.date.split('T')[0]}</span>
                  <em>Ticket price: ${row.price}</em>
                </NavLink>
                {user == 'admin' ?
                  <div>
                    <button onClick={e => handleEdit(e, row.id)}>Edit</button>
                    <button onClick={e => handleDelete(e, row.id)}>Delete</button>
                  </div>
                : null}
              </li>
            ))}
          </ul>
          : <p>There is not any event</p>
        }
    </section>
  )
}