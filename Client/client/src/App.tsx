import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import SpotifyDJ from './pages/SpotifyDJ';
import AuthComponent from './components/SpotifyDJ/AuthComponent';
import Unauthorized from './pages/Unauthorized';

function App() {
  const user = ""
  const Navigate = ""

  return (
    // Auth -> SpotifyDJ or if no username is set then SignIn
    // Auth -> if username is already set then SpotifyDJ
    <Router>
      <Routes>
        <Route path="/:hashedKey" element={<AuthComponent />} />

        <Route path="/spotify" element={<SpotifyDJ user={user} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}


//
//

export default App;
