import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMotorcycles } from '../contexts/MotorcycleContext';

const Inventory: React.FC = () => {
  const { motorcycles, loading, getMotorcyclesByFilters } = useMotorcycles();
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    condition: '',
    priceRange: ''
  });

  // Apply filters to motorcycles
  const filteredMotorcycles = getMotorcyclesByFilters(filters);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-white">Carregando inventário...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 text-left">NOSSO ESTOQUE</h1>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 p-8 mb-12 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6 text-left">Filtros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">Marca</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925] focus:border-transparent"
              >
                <option value="">Todas as marcas</option>
                <option value="Honda">Honda</option>
                <option value="Yamaha">Yamaha</option>
                <option value="Kawasaki">Kawasaki</option>
                <option value="Ducati">Ducati</option>
                <option value="BMW">BMW</option>
                <option value="Harley-Davidson">Harley-Davidson</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925] focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                <option value="Sport">Esportiva</option>
                <option value="Cruiser">Custom</option>
                <option value="Touring">Touring</option>
                <option value="Adventure">Aventura</option>
                <option value="Standard">Padrão</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">Faixa de Preço</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925] focus:border-transparent"
              >
                <option value="">Qualquer preço</option>
                <option value="0-5000">Até R$ 5.000</option>
                <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                <option value="10000-20000">R$ 10.000 - R$ 20.000</option>
                <option value="20000+">Acima de R$ 20.000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">Condição</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({...filters, condition: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925] focus:border-transparent"
              >
                <option value="">Qualquer condição</option>
                <option value="Excellent">Excelente</option>
                <option value="Good">Boa</option>
                <option value="Fair">Regular</option>
                <option value="Used">Usada</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        {filteredMotorcycles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhuma motocicleta disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMotorcycles.map((motorcycle) => (
              <div key={motorcycle._id} className="bg-gray-900 shadow-lg overflow-hidden" style={{ height: '600px' }}>
                {/* Title */}
                <div className="p-6 pb-4">
                  <h3 className="text-2xl font-semibold text-white mb-2 text-left">
                    {motorcycle.brand} {motorcycle.model}
                  </h3>
                </div>
                
                {/* Cover Photo */}
                <div className="px-6 pb-6">
                  <Link to={`/motorcycle/${motorcycle._id}`} className="block">
                    <div className="relative h-80 bg-gray-800 overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                      {motorcycle.images && motorcycle.images.length > 0 ? (
                        <img
                          src={motorcycle.images[0]}
                          alt={motorcycle.brand + ' ' + motorcycle.model}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 text-4xl">🏍️</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
                
                {/* Specs */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[#e94925]">🏷️</span>
                      <span className="text-gray-300">{motorcycle.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#e94925]">📋</span>
                      <span className="text-gray-300">{motorcycle.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#e94925]">📅</span>
                      <span className="text-gray-300">{motorcycle.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#e94925]">🛣️</span>
                      <span className="text-gray-300">{motorcycle.mileage.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>
                
                {/* Price and Button */}
                <div className="px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#e94925]">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(motorcycle.price)}
                    </div>
                    <Link
                      to={`/motorcycle/${motorcycle._id}`}
                      className="bg-[#e94925] text-white px-6 py-3 hover:bg-[#d13d1f] transition-colors text-lg font-semibold"
                    >
                      Ver Mais
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory; 