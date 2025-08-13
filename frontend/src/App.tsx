import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import About from './pages/About';
import Contact from './pages/Contact';
import Sell from './pages/Sell';
import MotorcycleDetail from './pages/MotorcycleDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInventory from './pages/admin/AdminInventory';
import AdminMotorcycleForm from './pages/admin/AdminMotorcycleForm';
import { AuthProvider } from './contexts/AuthContext';
import { MotorcycleProvider } from './contexts/MotorcycleContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MotorcycleProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/estoque" element={<Inventory />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/vender" element={<Sell />} />
                <Route path="/motorcycle/:id" element={<MotorcycleDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/painel" element={<AdminDashboard />} />
                <Route path="/admin/estoque" element={<AdminInventory />} />
                <Route path="/admin/motorcycle/:id" element={<AdminMotorcycleForm />} />
                <Route path="/admin/motorcycle/new" element={<AdminMotorcycleForm />} />
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
