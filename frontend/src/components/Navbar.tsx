import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Nosso Estoque', href: '/estoque' },
    { name: 'Quero Vender', href: '/vender' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
  ];

  const adminNavigation = [
    { name: 'Painel', href: '/admin/dashboard' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-black">
      <div className="max-w-7xl mx-auto">
                <div className="flex h-20 items-center">
          {/* Left side - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/favicon.png" 
                alt="Tiger Motos Logo" 
                className="w-28 h-28 object-contain"
              />
            </Link>
          </div>
          
          {/* Center navigation */}
          <div className="flex-1 flex justify-center items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-medium uppercase tracking-wide transition-colors ${
                    location.pathname === item.href
                      ? 'text-[#e84925]'
                      : 'text-white hover:text-[#e84925]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated && (
                <div className="relative group">
                  <button className="text-lg font-medium uppercase tracking-wide text-white hover:text-[#e84925] transition-colors">
                    Administrador
                  </button>
                                     <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {adminNavigation.map((item) => (
                                           <Link
                       key={item.name}
                       to={item.href}
                       className="block text-sm text-white hover:text-[#e84925] uppercase tracking-wide"
                     >
                        {item.name}
                      </Link>
                    ))}
                                         <button
                       onClick={handleLogout}
                       className="block w-full text-left text-sm text-white hover:bg-red-600 hover:text-white uppercase tracking-wide"
                     >
                      Sair
                    </button>
                  </div>
                </div>
              )}
              

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                             <button
                 onClick={() => setIsOpen(!isOpen)}
                 className="inline-flex items-center justify-center text-white hover:text-[#e84925] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
               >
                {isOpen ? (
                  <XMarkIcon className="block h-7 w-7" />
                ) : (
                  <Bars3Icon className="block h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 bg-black">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-lg font-medium uppercase tracking-wide transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#e84925]'
                    : 'text-white hover:text-[#e84925]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <div className="mt-4">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Painel Admin
                  </div>
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block text-lg font-medium text-white hover:text-[#e84925] uppercase tracking-wide"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-base font-medium text-white hover:text-white hover:bg-red-600 uppercase tracking-wide"
                  >
                    Sair
                  </button>
                </div>
              </>
            )}
            

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 