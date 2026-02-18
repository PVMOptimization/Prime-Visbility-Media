import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BookCall from './pages/BookCall';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import TieredGrowth from "./TieredGrowth";

// If using React Router:
<Route path="/pricing" element={<TieredGrowth />} />

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-call" element={<BookCall />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
