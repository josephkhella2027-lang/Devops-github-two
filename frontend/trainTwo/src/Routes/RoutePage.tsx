import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import RegisterPage from "../pages/Register Page/RegisterPage";
import LoginPage from "../pages/Login Page/LoginPage";

function RoutePage() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutePage;
