import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';

// Each page downloads only when someone visits it
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const TieredGrowth = lazy(() => import('./pages/TieredGrowth'));
const Meeting = lazy(() => import('./pages/Meeting'));
const Tier3 = lazy(() => import('./pages/Tier3'));
const FourKillers = lazy(() => import('./pages/FourKillers'));
const Policy = lazy(() => import('./pages/Policy'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const VSLPAGE = lazy(() => import('./pages/VSLPAGE'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Casestudy = lazy(() => import('./pages/Casestudy'));
const Pricing = lazy(() => import('./pages/Pricing'));
const GrowthPipeline = lazy(() => import('./pages/GrowthPipeline'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const BookCall = lazy(() => import('./pages/BookCall'));

// --- GHL Chat Widget ---
const CHAT_WIDGET_ID = '69f6b5aebf766193af66d95c';
// Funnel pages stay fast and distraction-free
const NO_CHAT_ROUTES = ['/growth-pipeline', '/thank-you'];

function AppContent(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideNav: boolean = path === '/vsl';

  useEffect(() => {
    if (NO_CHAT_ROUTES.includes(path)) return;
    if (document.querySelector(`script[data-widget-id="${CHAT_WIDGET_ID}"]`)) return;

    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.dataset.resourcesUrl = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';
    script.dataset.widgetId = CHAT_WIDGET_ID;
    script.dataset.source = 'WEB_USER';
    script.async = true;
    document.body.appendChild(script);
  }, [path]);

  return (
    <>
      {!hideNav && <Navigation />}
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<TieredGrowth />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/tier3" element={<Tier3 />} />
          <Route path="/4killers" element={<FourKillers />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/case-study" element={<Casestudy />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/bookyourcall" element={<VSLPAGE />} />
          <Route path="/join-now" element={<Pricing />} />
          <Route path="/growth-pipeline" element={<GrowthPipeline />} />
          <Route path="How-it-works" element={<LandingPage />} />
          <Route path="Book-call" element={<BookCall />} />
        </Routes>
      </Suspense>
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
