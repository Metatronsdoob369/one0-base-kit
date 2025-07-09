/// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NodeOutDashboard from './pages/NodeOutDashboard';
import Radio from './pages/radio';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NodeOutDashboard />} />
        <Route path="/radio" element={<Radio />} />
      </Routes>
    </Router>
  );
}
