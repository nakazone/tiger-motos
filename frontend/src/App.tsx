import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import MotorcycleDetail from './pages/MotorcycleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Sell from './pages/Sell';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInventory from './pages/admin/AdminInventory';
import AdminMotorcycleForm from './pages/admin/AdminMotorcycleForm';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/motorcycle/:id" element={<MotorcycleDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/inventory" element={<AdminInventory />} />
              <Route path="/admin/motorcycle/new" element={<AdminMotorcycleForm />} />
              <Route path="/admin/motorcycle/edit/:id" element={<AdminMotorcycleForm />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppChat />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
