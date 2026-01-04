import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Workflow from "./pages/Workflow";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import IDE from "./pages/IDE";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ide" element={<IDE />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
