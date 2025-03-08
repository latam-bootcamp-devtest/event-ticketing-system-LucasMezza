export const EventList = ({events = []}) => {
  return (
    <>
        {events && events.length > 0 ?
          <ul className="events-list">
            {events.map(row => (
              <li key={row.id} className="event">
                <img src={row.image} alt="" />
                <p>Name: {row.name}</p>
                <span>Date: {row.date.split('T')[0]}</span>
                <em>Ticket price: ${row.price}</em>
              </li>
            ))}
          </ul>
          : <p>There is not any event</p>
        }
    </>
  )
}