import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PropertyForm from './components/PropertyForm';
import OwnerForm from './components/OwnerForm';
import EmployeeForm from './components/EmployeeForm';
import MovementForm from './components/MovementForm';
import EventForm from './components/EventForm';
import PropertyDetails from './components/PropertyDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/properties/new" element={<PropertyForm />} />
        <Route path="/properties/edit/:id" element={<PropertyForm />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/owners/new" element={<OwnerForm />} />
        <Route path="/owners/edit/:id" element={<OwnerForm />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        <Route path="/movements/new" element={<MovementForm />} />
        <Route path="/movements/edit/:id" element={<MovementForm />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
