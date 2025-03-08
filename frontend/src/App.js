import './App.css';
import { EventDetail } from './pages/EventDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserHistory } from './pages/UserHistory';
import { Home } from './pages/Home';
import { Panel } from './pages/Panel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/event-details/:id" element={<EventDetail />}/>
        <Route path="/booking-history" element={<UserHistory />}/>
        <Route path="/panel" element={<Panel />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
