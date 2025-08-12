import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotorcycleProvider } from './contexts/MotorcycleContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Inventory from './pages/Inventory';
import MotorcycleDetail from './pages/MotorcycleDetail';
import Sell from './pages/Sell';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInventory from './pages/admin/AdminInventory';
import AdminMotorcycleForm from './pages/admin/AdminMotorcycleForm';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MotorcycleProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/motorcycle/:id" element={<MotorcycleDetail />} />
                <Route path="/sell" element={<Sell />} />
                
                {/* Admin Routes - Protected */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/inventory" 
                  element={
                    <ProtectedRoute>
                      <AdminInventory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/motorcycle/:id?" 
                  element={
                    <ProtectedRoute>
                      <AdminMotorcycleForm />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MotorcycleProvider>
    </AuthProvider>
  );
}

export default App;
