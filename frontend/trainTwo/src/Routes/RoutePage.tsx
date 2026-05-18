import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";

function RoutePage() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutePage;
