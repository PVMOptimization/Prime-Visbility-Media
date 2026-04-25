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
import FourKillers from "./pages/FourKillers";
import Policy from "./pages/Policy";
import VSLPAGE from "./pages/VSLPAGE";


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
        <Route path="/4killers" element={<FourKillers />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/comparison" element={<Pricecomparison />} />
        <Route path="/bookyourcall" element={<VSLPAGE />} />
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
