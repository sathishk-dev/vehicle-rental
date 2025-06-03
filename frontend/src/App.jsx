import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CarDetails from './pages/CarDetails';
import UserPage from './pages/UserPage';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainPage from "./pages/main_page";
import Booking from './pages/Booking';
import ProdectedRoute from './components/ProdectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import { SearchProvider } from "./context/SearchContext"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from './utils/ScrollToTop';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <Router>
      <SearchProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
          <Main />
        </GoogleOAuthProvider>
      </SearchProvider>
    </Router>
  );

  function Main() {
    const location = useLocation();
    const routesWithNavAndFooter = ['/', '/booking', '/details', '/profile'];

    return (
      <>
        {/* Conditionally render Navbar */}
        {routesWithNavAndFooter.includes(location.pathname) && (
          <Navbar toggleModal={toggleModal} isModalOpen={isModalOpen} />
        )}

        <ScrollToTop />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/booking" element={
            <ProdectedRoute toggleModal={toggleModal}>
              <Booking />
            </ProdectedRoute>
          } />
          <Route path="/details" element={<CarDetails />} />
          <Route path="/profile" element={
            <ProdectedRoute toggleModal={toggleModal}>
              <UserPage />
            </ProdectedRoute>
          } />
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminHome />} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Conditionally render Footer */}
        {routesWithNavAndFooter.includes(location.pathname) && (
          <Footer />
        )}
      </>
    );
  }
}

export default App;
