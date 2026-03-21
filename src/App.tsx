import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import NodePage from './pages/NodePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/node/:id" element={<NodePage />} />
      </Routes>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
