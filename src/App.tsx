import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import TieredGrowth from "./pages/TieredGrowth";
import Meeting from "./pages/Meeting";
import Tier3 from "./pages/Tier3";
import Pricecomparison from "./pages/Pricecomparison";
import FourKillers from "./pages/FourKillers";
import Policy from "./pages/Policy";
import ThankYou from "./pages/ThankYou";
import VSLPAGE from "./pages/VSLPAGE";

function AppContent(): JSX.Element {
  const location = useLocation();
  const hideNav: boolean = location.pathname === '/vsl';

  // --- GHL Chat Widget Integration ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://leadconnectorhq.com";
    script.dataset.resourcesUrl = "https://leadconnectorhq.com";
    script.dataset.widgetId = "69f6b5aebf766193af66d95c";
    script.dataset.source = "WEB_USER";
    script.async = true;

    document.body.appendChild(script);

    // Optional: Cleanup script if the component unmounts
    return () => {
      const existingScript = document.querySelector(`script[data-widget-id="69f6b5aebf766193af66d95c"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);
  // ------------------------------------

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<TieredGrowth />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/tier3" element={<Tier3 />} />
        <Route path="/4killers" element={<FourKillers />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/comparison" element={<Pricecomparison />} />
        <Route path="/thank-you" element={<ThankYou />} />
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
