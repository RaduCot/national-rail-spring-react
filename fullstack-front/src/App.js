import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Angajati from './pages/Angajati';
import Bilete from './pages/Bilete';
import Calatorii from './pages/Calatorii';
import Transporturi from './pages/Transporturi';
import Trenuri from './pages/Trenuri';

import AddAngajat from './angajati/AddAngajat';
import EditAngajat from './angajati/EditAngajat';

import AddBilet from './bilete/AddBilet';
import EditBilet from './bilete/EditBilet';

import AddCalatorie from './calatorii/AddCalatorie';
import EditCalatorie from './calatorii/EditCalatorie';

import AddTransport from './transporturi/AddTransport';
import EditTransport from './transporturi/EditTransport';

import AddTren from './trenuri/AddTren';
import EditTren from './trenuri/EditTren';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/employees" element={<Angajati />} />
          <Route exact path="/employees/add" element={<AddAngajat />} />
          <Route exact path="/employees/edit/:id" element={<EditAngajat />} />

          <Route exact path="/tickets" element={<Bilete />} />
          <Route exact path="/tickets/add" element={<AddBilet />} />
          <Route exact path="/tickets/edit/:id" element={<EditBilet />} />

          <Route exact path="/journeys" element={<Calatorii />} />
          <Route exact path="/journeys/add" element={<AddCalatorie />} />
          <Route exact path="/journeys/edit/:id" element={<EditCalatorie />} />

          <Route exact path="/transports" element={<Transporturi />} />
          <Route exact path="/transports/add" element={<AddTransport />} />
          <Route exact path="/transports/edit/:id" element={<EditTransport />} />

          <Route exact path="/trains" element={<Trenuri />} />
          <Route exact path="/trains/add" element={<AddTren />} />
          <Route exact path="/trains/edit/:id" element={<EditTren />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;