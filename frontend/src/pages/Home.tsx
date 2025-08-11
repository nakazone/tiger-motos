import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Motorcycle } from '../types';

const Home: React.FC = () => {
  const [featuredMotorcycles, setFeaturedMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sample data directly since backend is having issues
    setFeaturedMotorcycles([
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
        brand: 'BMW',
        model: 'S1000RR',
        year: 2022,
        price: 22000,
        condition: 'Excellent',
        category: 'Sport',
        engineSize: 1000,
        mileage: 3000,
        description: 'Premium BMW sport bike with advanced electronics and low mileage.',
        features: ['ABS Pro', 'Dynamic Traction Control', 'Quick Shifter Pro', 'LED Headlights'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '5',
        brand: 'Ducati',
        model: 'Monster 821',
        year: 2020,
        price: 18000,
        condition: 'Good',
        category: 'Naked',
        engineSize: 821,
        mileage: 7500,
        description: 'Iconic Ducati Monster with Italian styling and performance.',
        features: ['ABS', 'Ducati Traction Control', 'LED Lighting', 'TFT Display'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      },
      {
        _id: '6',
        brand: 'Harley-Davidson',
        model: 'Street Glide',
        year: 2021,
        price: 28000,
        condition: 'Excellent',
        category: 'Cruiser',
        engineSize: 1745,
        mileage: 4500,
        description: 'Classic American cruiser with touring comfort and style.',
        features: ['ABS', 'Cruise Control', 'Infotainment System', 'LED Lighting'],
        status: 'available',
        images: [
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop'
        ],
        isFeatured: true
      }
    ]);
    setLoading(false);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen flex items-center justify-start overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover min-h-screen"
            poster="https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=1920&h=1080&fit=crop"
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => {
              console.error('Video error:', e);
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              // Show fallback background
              const fallback = document.createElement('div');
              fallback.className = 'absolute inset-0 w-full h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800';
              fallback.style.backgroundImage = 'url(https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=1920&h=1080&fit=crop)';
              fallback.style.backgroundSize = 'cover';
              fallback.style.backgroundPosition = 'center';
              target.parentNode?.appendChild(fallback);
            }}
          >
            <source src="/backgroundVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-left text-white max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Encontre Sua
            <span className="block text-primary-400">Moto Perfeita</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed">
            Descubra uma extensa coleção de motocicletas premium das melhores marcas do mundo. 
            Motos de qualidade, preços competitivos e serviço excepcional aguardam por você.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-start items-start">
            <Link
              to="/inventory"
              className="group bg-primary-600 text-white px-10 py-4 font-bold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Conheça nosso Estoque</span>
            </Link>
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as motos da Tiger Motos."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Fale Conosco</span>
            </a>
          </div>
          
          {/* Search Bar */}
          <div className="mt-32 bg-black bg-opacity-90 backdrop-blur-sm p-10 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-left mb-8">
              Encontre sua Moto
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-end">
              {/* Brand Filter */}
              <div className="flex-1">
                <select className="w-full px-6 py-5 bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="" className="text-gray-900">Todas as marcas</option>
                  <option value="honda" className="text-gray-900">Honda</option>
                  <option value="yamaha" className="text-gray-900">Yamaha</option>
                  <option value="suzuki" className="text-gray-900">Suzuki</option>
                  <option value="kawasaki" className="text-gray-900">Kawasaki</option>
                  <option value="bmw" className="text-gray-900">BMW</option>
                  <option value="ducati" className="text-gray-900">Ducati</option>
                  <option value="harley-davidson" className="text-gray-900">Harley-Davidson</option>
                  <option value="triumph" className="text-gray-900">Triumph</option>
                </select>
              </div>
              
              {/* Model Filter */}
              <div className="flex-1">
                <select className="w-full px-6 py-5 bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="" className="text-gray-900">Todos os modelos</option>
                  <option value="cb" className="text-gray-900">CB</option>
                  <option value="cbr" className="text-gray-900">CBR</option>
                  <option value="mt" className="text-gray-900">MT</option>
                  <option value="r1" className="text-gray-900">R1</option>
                  <option value="gsx" className="text-gray-900">GSX</option>
                  <option value="ninja" className="text-gray-900">Ninja</option>
                  <option value="versys" className="text-gray-900">Versys</option>
                  <option value="s1000" className="text-gray-900">S1000</option>
                  <option value="monster" className="text-gray-900">Monster</option>
                  <option value="street" className="text-gray-900">Street</option>
                  <option value="bonneville" className="text-gray-900">Bonneville</option>
                </select>
              </div>
              
              {/* Price Filter */}
              <div className="flex-1">
                <select className="w-full px-6 py-5 bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="" className="text-gray-900">Qualquer preço</option>
                  <option value="0-10000" className="text-gray-900">Até R$ 10.000</option>
                  <option value="10000-25000" className="text-gray-900">R$ 10.000 - R$ 25.000</option>
                  <option value="25000-50000" className="text-gray-900">R$ 25.000 - R$ 50.000</option>
                  <option value="50000-100000" className="text-gray-900">R$ 50.000 - R$ 100.000</option>
                  <option value="100000+" className="text-gray-900">Acima de R$ 100.000</option>
                </select>
              </div>
              
              {/* Search Button */}
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-5 px-12 transition-all duration-300 transform hover:scale-105">
                Buscar Motos
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Motorcycles */}
      <section className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-0 py-16">
          <div className="flex justify-between items-center mb-12">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-white">
                DESTAQUES
              </h2>
            </div>
            <Link
              to="/inventory"
              className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-base font-medium rounded-md text-primary-400 bg-transparent hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              Ver Todas as Motos
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div 
              className="w-screen overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing" 
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
              }}
            >
              <div className="flex gap-6 min-w-max">
                {featuredMotorcycles.map((motorcycle) => (
                  <div
                    key={motorcycle._id}
                    className="bg-gray-900 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0"
                    style={{ width: '350px' }}
                  >
                    <div className="relative h-96 bg-gray-800">
                      {motorcycle.images && motorcycle.images.length > 0 ? (
                        <img
                          src={motorcycle.images[0]}
                          alt={`${motorcycle.brand} ${motorcycle.model}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      {(!motorcycle.images || motorcycle.images.length === 0) && (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 002-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
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
                          {formatPrice(motorcycle.price)}
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
      </section>

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: '#121212' }}>
        <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Por que Escolher a Tiger Motos?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Estamos comprometidos em proporcionar a melhor experiência de compra de motocicletas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-300">
                Cada motocicleta em nosso inventário passa por inspeção rigorosa para garantir qualidade e confiabilidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Preços Competitivos</h3>
              <p className="text-gray-300">
                Oferecemos preços competitivos em todas as nossas motocicletas com opções de financiamento flexíveis disponíveis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Suporte Especializado</h3>
              <p className="text-gray-300">
                Nossa equipe de especialistas em motocicletas está aqui para ajudá-lo a encontrar a moto perfeita e fornecer suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-0 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Encontrar Sua Moto dos Sonhos?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Navegue por nosso extenso inventário de motocicletas novas e usadas. 
            Entre em contato conosco hoje para agendar um test ride ou obter mais informações.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inventory"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Navegar Inventário
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-600 text-primary-400 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 