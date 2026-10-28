import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import { captureAttribution, trackPageView } from './lib/tracking';

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
// Ad landing pages: no site menu, so the only way forward is the call to action
const NO_NAV_ROUTES = ['/vsl', '/how-it-works', '/growth-pipeline', '/thank-you'];

function AppContent(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const hideNav: boolean = NO_NAV_ROUTES.includes(path.replace(/\/+$/, '') || '/');

  // Ad tracking: save UTMs / click ID, and send a Meta PageView on every page
  useEffect(() => {
    captureAttribution();
    trackPageView();
  }, [location.pathname]);

  useEffect(() => {
    if (NO_CHAT_ROUTES.includes(path)) return undefined;
    if (document.querySelector(`script[data-widget-id="${CHAT_WIDGET_ID}"]`)) return undefined;

    // The chat widget is heavy, so it waits until the visitor interacts or 6 seconds pass.
    // That keeps it from competing with the page (and the video) during the first load.
    const events = ['pointerdown', 'scroll', 'keydown', 'touchstart'];
    let timer = 0;
    const load = () => {
      cleanup();
      if (document.querySelector(`script[data-widget-id="${CHAT_WIDGET_ID}"]`)) return;
      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.dataset.resourcesUrl = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';
      script.dataset.widgetId = CHAT_WIDGET_ID;
      script.dataset.source = 'WEB_USER';
      script.async = true;
      document.body.appendChild(script);
    };
    function cleanup() {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, load));
    }
    timer = window.setTimeout(load, 6000);
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return cleanup;
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
