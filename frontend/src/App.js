import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getEvents } from './services/crud';
import { EventsList } from './components/EventsList';
import { EventDetail } from './pages/EventDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserHistory } from './pages/UserHistory';

function App() {
  const [ events, setEvents ] = useState([])

  useEffect(() => {
    getEvents()
    .then(data => setEvents(data))
    .catch(err => console.error(err))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsList events={events} />}/>
        <Route path="/event-details/:id" element={<EventDetail />}/>
        <Route path="/booking-history" element={<UserHistory />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
