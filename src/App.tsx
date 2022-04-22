import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import RegisterPerson from './pages/RegisterPerson';
import { UsersList } from './pages/UsersList';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPerson />} />
          <Route path="/users" element={<UsersList />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
