import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link, Outlet } from 'react-router-dom';
import Radio from './pages/radio';
import PATHsassinDashboard from './pages/PATHsassinDashboard';
import PATHsassin3D from './pages/PATHsassin3D';
import AgentInterface from './pages/AgentInterface';
import BlendedDashboard from './pages/BlendedDashboard';
import { UIDemo } from './components/UIDemo';
import IconButton from './components/ui/IconButton';
import TestPage from './pages/TestPage';

// Example SVG icons
const MicIcon = (
  <svg viewBox="0 0 24 24">
    <path d="M12 3v10m0 0a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4zm0 0v4m-4 0h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const StarIcon = (
  <svg viewBox="0 0 24 24">
    <path d="M12 3l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function handleMicClick() {
  alert('Mic button clicked!');
}
function handleStarClick() {
  alert('Star button clicked!');
}

function AppLayout() {
  const location = useLocation();
  // Determine environment label
  let envLabel = '';
  let envColor = '';
  if (location.pathname === '/pathsassin') {
    envLabel = 'PRODUCTION';
    envColor = '#4facfe';
  } else if (location.pathname === '/pathsassin-dashboard') {
    envLabel = 'EXPERIMENTAL';
    envColor = '#f5576c';
  } else if (location.pathname === '/ui-demo') {
    envLabel = 'DEMO';
    envColor = '#aef6ff';
  } else {
    envLabel = '';
    envColor = '';
  }

  return (
    <>
      {/* Navigation Bar and Environment Banner removed */}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<PATHsassinDashboard />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/pathsassin" element={<PATHsassinDashboard />} />
          <Route path="/pathsassin-dashboard" element={<PATHsassinDashboard />} />
          <Route path="/pathsassin-3d" element={<PATHsassin3D />} />
          <Route path="/agent" element={<AgentInterface />} />
          <Route path="/blended" element={<BlendedDashboard />} />
          <Route path="/ui-demo" element={<UIDemo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
