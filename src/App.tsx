import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ListDetailsPage from "./pages/ListDetailsPage";
import PrivateRoute from "./components/PrivateRoute";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
 
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/list/:id"
        element={
          <PrivateRoute>
            <ListDetailsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<p className="text-center mt-10">Page Not Found</p>}
      />
    </Routes>
    </>
  );
}

export default App;
