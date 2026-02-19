import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import BookCall from './pages/BookCall';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import TieredGrowth from "./pages/TieredGrowth";
import Meeting from "./pages/Meeting";


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-call" element={<BookCall />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<TieredGrowth />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
    </Router>
  );
}

export default App;
