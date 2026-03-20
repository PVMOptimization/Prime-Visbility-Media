import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BookCall from './pages/BookCall';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import TieredGrowth from "./pages/TieredGrowth";
import Meeting from "./pages/Meeting";
import VSL from "./pages/VSL";
import Tier3 from "./pages/Tier3";
import Pricecomparison from "./pages/Pricecomparison";


function AppContent(): JSX.Element {
  const location = useLocation();
  const hideNav: boolean = location.pathname === '/vsl';

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-call" element={<BookCall />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<TieredGrowth />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/vsl" element={<VSL />} />
        <Route path="/tier3" element={<Tier3 />} />
        <Route path="/comparison" element={<Pricecomparison />} />
      </Routes>
    </>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
