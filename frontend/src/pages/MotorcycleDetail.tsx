import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motorcycleAPI } from '../services/api';
import { Motorcycle } from '../types';

const MotorcycleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedMotorcycles, setRelatedMotorcycles] = useState<Motorcycle[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);

  useEffect(() => {
    const fetchMotorcycle = async () => {
      if (!id) return;
      
      try {
        // Use sample data for now since backend is having issues
        const sampleMotorcycle: Motorcycle = {
          _id: id,
          brand: 'Honda',
          model: 'CBR600RR',
          year: 2020,
          price: 8500,
          condition: 'Excellent',
          category: 'Sport',
          engineSize: 600,
          mileage: 5000,
          description: 'Esta Honda CBR600RR em excelente estado é perfeita para pilotos que buscam performance e confiabilidade. Com apenas 5.000 km, a moto mantém todas as suas características originais e oferece uma experiência de pilotagem excepcional. Equipada com tecnologia de ponta e design aerodinâmico, é ideal tanto para uso urbano quanto para pista.',
          features: ['ABS', 'LED Headlights', 'Digital Display', 'Traction Control', 'Quick Shifter', 'Adjustable Suspension', 'Sport Riding Position', 'High-Performance Brakes'],
          status: 'available',
          images: [
            'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop'
          ],
          isFeatured: true
        };
        
        setMotorcycle(sampleMotorcycle);
        
        // Set related motorcycles
        setRelatedMotorcycles([
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
            images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop'],
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
            images: ['https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop'],
            isFeatured: true
          }
        ]);
      } catch (error) {
        console.error('Error fetching motorcycle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycle();
  }, [id]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const openWhatsApp = () => {
    const message = `Olá! Estou interessado na ${motorcycle?.brand} ${motorcycle?.model} ${motorcycle?.year}. Podem me dar mais informações?`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-white">Carregando detalhes da moto...</div>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-red-600">Moto não encontrada</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            {motorcycle.brand} {motorcycle.model}
          </h1>
          <p className="text-xl text-gray-300">{motorcycle.year} • {motorcycle.mileage.toLocaleString()} km</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Photo Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {/* Main Image */}
              <div className="relative h-96 bg-gray-800">
                <img
                  src={motorcycle.images[selectedImage]}
                  alt={`${motorcycle.brand} ${motorcycle.model}`}
                  className="w-full h-full object-cover"
                />
                {/* Navigation arrows */}
                {motorcycle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? motorcycle.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === motorcycle.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {motorcycle.images.length > 1 && (
                <div className="p-6 bg-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">Galeria de Fotos</h3>
                  <div className="flex space-x-3 overflow-x-auto">
                    {motorcycle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-[#e94925]' : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${motorcycle.brand} ${motorcycle.model} - Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Motorcycle Information */}
            <div className="bg-gray-900 rounded-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Informações da Moto</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src="/marca.png" alt="Brand" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                    <span className="text-gray-300"><strong>Marca:</strong> {motorcycle.brand}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/quilometragem.png" alt="Model" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                    <span className="text-gray-300"><strong>Modelo:</strong> {motorcycle.model}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/ano.png" alt="Year" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                    <span className="text-gray-300"><strong>Ano:</strong> {motorcycle.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src="/quilometragem.png" alt="Mileage" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }} />
                    <span className="text-gray-300"><strong>Quilometragem:</strong> {motorcycle.mileage.toLocaleString()} km</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div><strong className="text-gray-300">Categoria:</strong> <span className="text-white">{motorcycle.category}</span></div>
                  <div><strong className="text-gray-300">Condição:</strong> <span className="text-white">{motorcycle.condition}</span></div>
                  <div><strong className="text-gray-300">Cilindrada:</strong> <span className="text-white">{motorcycle.engineSize}cc</span></div>
                  <div><strong className="text-gray-300">Status:</strong> <span className="text-green-400">{motorcycle.status}</span></div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Descrição</h3>
                <p className="text-gray-300 leading-relaxed">{motorcycle.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Características</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {motorcycle.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#e94925] rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price, Contact, and Related */}
          <div className="space-y-8">
            {/* Price Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#e94925] mb-2">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(motorcycle.price)}
                </div>
                <p className="text-gray-400">Preço à vista</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Falar no WhatsApp
                </button>
                
                <button
                  onClick={() => setShowWhatsAppChat(!showWhatsAppChat)}
                  className="w-full bg-[#e94925] hover:bg-[#d13d1f] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Chat WhatsApp
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Enviar Mensagem</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                  required
                />
                <input
                  type="email"
                  placeholder="Seu email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Seu telefone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                  required
                />
                <textarea
                  placeholder="Sua mensagem"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925] resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#e94925] hover:bg-[#d13d1f] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* WhatsApp Chat */}
            {showWhatsAppChat && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Chat WhatsApp</h3>
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Tiger Motos</div>
                      <div className="text-green-400 text-sm">Online</div>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">
                    Olá! Tem interesse na {motorcycle.brand} {motorcycle.model}? Posso ajudar com mais informações!
                  </div>
                </div>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Abrir WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedMotorcycles.map((relatedMoto) => (
              <div key={relatedMoto._id} className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 bg-gray-800">
                  <img
                    src={relatedMoto.images[0]}
                    alt={`${relatedMoto.brand} ${relatedMoto.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {relatedMoto.brand} {relatedMoto.model}
                  </h3>
                  <p className="text-gray-400 mb-4">{relatedMoto.year} • {relatedMoto.mileage.toLocaleString()} km</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#e94925]">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(relatedMoto.price)}
                    </span>
                    <Link
                      to={`/motorcycle/${relatedMoto._id}`}
                      className="bg-[#e94925] hover:bg-[#d13d1f] text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleDetail; 