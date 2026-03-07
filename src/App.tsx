function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === '/vsl';

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
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
