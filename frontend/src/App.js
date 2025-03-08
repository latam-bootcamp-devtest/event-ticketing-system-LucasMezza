import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getEvents } from './services/crud';
import { EventList } from './components/EventsList';

function App() {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    getEvents()
    .then(data => setEvents(data))
    .catch(err => console.error(err))
  }, [])

  return (
    <section>
      <EventList events={events}/>
    </section>
  );
}

export default App;
