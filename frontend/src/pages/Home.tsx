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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
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
            <source src="/1109335_1080p_Boyfriend_1920x1080.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Encontre Sua
            <span className="block text-primary-400">Moto Perfeita</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubra uma extensa coleção de motocicletas premium das melhores marcas do mundo. 
            Motos de qualidade, preços competitivos e serviço excepcional aguardam por você.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/inventory"
              className="group bg-primary-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Conheça nosso Estoque</span>
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Entre em Contato
            </Link>
          </div>
          

        </div>
      </section>

      {/* Featured Motorcycles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Motocicletas em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confira nossa seleção cuidadosamente escolhida de motocicletas premium
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMotorcycles.map((motorcycle) => (
                <div
                  key={motorcycle._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
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
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        motorcycle.condition === 'New' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {motorcycle.condition}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {motorcycle.brand} {motorcycle.model}
                    </h3>
                    <p className="text-gray-600 mb-4">{motorcycle.year} • {motorcycle.mileage.toLocaleString()} km</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(motorcycle.price)}
                      </span>
                      <Link
                        to={`/motorcycle/${motorcycle._id}`}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/inventory"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Ver Todas as Motocicletas
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Escolher a Tiger Motos?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos comprometidos em proporcionar a melhor experiência de compra de motocicletas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-600">
                Cada motocicleta em nosso inventário passa por inspeção rigorosa para garantir qualidade e confiabilidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preços Competitivos</h3>
              <p className="text-gray-600">
                Oferecemos preços competitivos em todas as nossas motocicletas com opções de financiamento flexíveis disponíveis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suporte Especializado</h3>
              <p className="text-gray-600">
                Nossa equipe de especialistas em motocicletas está aqui para ajudá-lo a encontrar a moto perfeita e fornecer suporte contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Navegar Inventário
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
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