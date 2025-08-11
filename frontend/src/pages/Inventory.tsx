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
      <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-0 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-white">
              NOSSO ESTOQUE
            </h1>
          </div>
        </div>

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
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="w-screen overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing" 
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
               onMouseDown={(e) => {
                 const container = e.currentTarget;
                 let isDown = false;
                 let startX = e.pageX - container.offsetLeft;
                 let scrollLeft = container.scrollLeft;
                 
                 const handleMouseMove = (e: MouseEvent) => {
                   if (!isDown) return;
                   e.preventDefault();
                   const x = e.pageX - container.offsetLeft;
                   const walk = (x - startX) * 2;
                   container.scrollLeft = scrollLeft - walk;
                 };
                 
                 const handleMouseUp = () => {
                   isDown = false;
                   container.classList.remove('cursor-grabbing');
                   container.classList.add('cursor-grab');
                 };
                 
                 isDown = true;
                 container.classList.remove('cursor-grab');
                 container.classList.add('cursor-grabbing');
                 
                 document.addEventListener('mousemove', handleMouseMove);
                 document.addEventListener('mouseup', handleMouseUp);
               }}>
            <div className="flex gap-6 min-w-max">
              {motorcycles.map((motorcycle) => (
                <div key={motorcycle._id} className="bg-gray-900 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0" style={{ width: '350px' }}>
                  <div className="relative h-96 bg-gray-800">
                    {motorcycle.images && motorcycle.images.length > 0 && (
                      <img
                        src={motorcycle.images[0]}
                        alt={motorcycle.brand + ' ' + motorcycle.model}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        motorcycle.condition === 'New' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-blue-900 text-blue-300'
                      }`}>
                        {motorcycle.condition}
                      </span>
                    </div>
                  </div>
                  <div className="p-12">
                    <h3 className="text-2xl font-semibold text-white mb-6">
                      {motorcycle.brand} {motorcycle.model}
                    </h3>
                    <p className="text-gray-300 mb-10 text-lg">{motorcycle.year} • {motorcycle.mileage.toLocaleString()} km</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-primary-400">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(motorcycle.price)}
                      </span>
                      <Link
                        to={`/motorcycle/${motorcycle._id}`}
                        className="bg-primary-600 text-white px-6 py-3 hover:bg-primary-700 transition-colors text-lg font-semibold"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory; 