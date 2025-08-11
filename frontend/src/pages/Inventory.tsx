import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Motorcycle } from '../types';

const Inventory: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: '',
    condition: ''
  });

  useEffect(() => {
    // Use sample data directly since backend is having issues
    setMotorcycles([
      {
        _id: '1',
        brand: 'Honda',
        model: 'CBR600RR',
        year: 2020,
        price: 8500,
        condition: 'Excellent',
        category: 'Sport',
        engineSize: 600,
        mileage: 5000,
        description: 'Excellent condition sport bike with low mileage.',
        features: ['ABS', 'LED Headlights', 'Digital Display'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '2',
        brand: 'Yamaha',
        model: 'YZF-R1',
        year: 2021,
        price: 15000,
        condition: 'Good',
        category: 'Sport',
        engineSize: 1000,
        mileage: 8000,
        description: 'High-performance sport bike in good condition.',
        features: ['ABS', 'Traction Control', 'Quick Shifter'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop&crop=entropy'
        ],
        isFeatured: true
      },
      {
        _id: '3',
        brand: 'Kawasaki',
        model: 'Ninja 650',
        year: 2019,
        price: 6500,
        condition: 'Good',
        category: 'Sport',
        engineSize: 650,
        mileage: 12000,
        description: 'Great beginner-friendly sport bike.',
        features: ['ABS', 'Comfortable Riding Position'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '4',
        brand: 'Ducati',
        model: 'Panigale V4',
        year: 2022,
        price: 25000,
        condition: 'Excellent',
        category: 'Sport',
        engineSize: 1103,
        mileage: 3000,
        description: 'Exotic Italian sport bike with incredible performance.',
        features: ['ABS', 'Traction Control', 'Quick Shifter', 'Launch Control'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '5',
        brand: 'BMW',
        model: 'S1000RR',
        year: 2021,
        price: 18000,
        condition: 'Excellent',
        category: 'Sport',
        engineSize: 999,
        mileage: 4500,
        description: 'German engineering at its finest with advanced electronics.',
        features: ['ABS', 'Traction Control', 'Quick Shifter', 'Dynamic Traction Control'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '6',
        brand: 'Harley-Davidson',
        model: 'Street Glide',
        year: 2020,
        price: 22000,
        condition: 'Good',
        category: 'Cruiser',
        engineSize: 1746,
        mileage: 15000,
        description: 'Classic American cruiser with modern amenities.',
        features: ['ABS', 'Cruise Control', 'Infotainment System', 'LED Lighting'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      }
    ]);
    setLoading(false);
  }, []);

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


        {/* Filters */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-6">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Marca</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                <option value="Sport">Sport</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Touring">Touring</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Faixa de Preço</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Qualquer preço</option>
                <option value="0-5000">Até R$ 5.000</option>
                <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                <option value="10000-20000">R$ 10.000 - R$ 20.000</option>
                <option value="20000+">Acima de R$ 20.000</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Condição</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({...filters, condition: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Qualquer condição</option>
                <option value="Excellent">Excelente</option>
                <option value="Good">Boa</option>
                <option value="Fair">Regular</option>
              </select>
            </div>
          </div>
        </div>
        
        {motorcycles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhuma motocicleta disponível no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motorcycles.map((motorcycle) => (
              <div key={motorcycle._id} className="bg-gray-900 shadow-lg overflow-hidden" style={{ height: '600px' }}>
                {/* Title - Outside the image */}
                <div className="p-6 pb-4">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {motorcycle.brand} {motorcycle.model}
                  </h3>
                </div>
                
                {/* Cover Photo - Middle with padding */}
                <div className="px-6 pb-6">
                  <Link to={`/motorcycle/${motorcycle._id}`} className="block">
                    <div className="relative h-80 bg-gray-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                      {motorcycle.images && motorcycle.images.length > 0 && (
                        <img
                          src={motorcycle.images[0]}
                          alt={motorcycle.brand + ' ' + motorcycle.model}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </Link>
                </div>
                
                {/* Specs with Icons - Reordered */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <img src="/marca.png" alt="Brand" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                      <span className="text-gray-300">{motorcycle.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="#e94925" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{motorcycle.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/ano.png" alt="Year" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                      <span className="text-gray-300">{motorcycle.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="/quilometragem.png" alt="Mileage" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                      <span className="text-gray-300">{motorcycle.mileage.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom - Price and Button */}
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