import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RedirectPage from "./pages/Redirect";

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="brand">🔗 URL Shortener</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shortCode" element={<RedirectPage />} />
        </Routes>
      </main>
    </div>
  );
}
