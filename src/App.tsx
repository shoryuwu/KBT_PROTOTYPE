import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage }       from './pages/HomePage';
import { EventPage }      from './pages/EventPage';
import { RiwayatPage }    from './pages/RiwayatPage';
import { ProfilePage }    from './pages/ProfilePage';
import { LoginPage }      from './pages/LoginPage';
import { GameTopupPage }  from './pages/GameTopupPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"         element={<HomePage />}    />
            <Route path="/event"    element={<EventPage />}   />
            <Route path="/riwayat"      element={<RiwayatPage />}    />
            <Route path="/profile"      element={<ProfilePage />}    />
            <Route path="/login"        element={<LoginPage />}      />
            <Route path="/game/:gameId" element={<GameTopupPage />}  />
            {/* Fallback */}
            <Route path="*"             element={<HomePage />}       />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
