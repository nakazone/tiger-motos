import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motorcycleAPI } from '../services/api';
import { Motorcycle } from '../types';

const MotorcycleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchMotorcycle = async () => {
      if (!id) return;
      
      try {
        const response = await motorcycleAPI.getById(id);
        setMotorcycle(response);
      } catch (error) {
        console.error('Error fetching motorcycle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading motorcycle details...</div>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Motorcycle not found</div>
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
              DETALHES DA MOTO
            </h1>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
          {motorcycle.images && motorcycle.images.length > 0 && (
            <div>
              {/* Main Image */}
              <div className="relative h-96 bg-gray-200">
                <img
                  src={motorcycle.images[selectedImage]}
                  alt={`${motorcycle.brand} ${motorcycle.model} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Navigation arrows */}
                {motorcycle.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev === 0 ? motorcycle.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev === motorcycle.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
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
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {motorcycle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${motorcycle.brand} ${motorcycle.model} - Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {motorcycle.brand} {motorcycle.model}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-2">
                  ${motorcycle.price.toLocaleString()}
                </h2>
                <p className="text-gray-600 mb-4">{motorcycle.year}</p>
                <p className="text-gray-700 mb-2"><strong>Condition:</strong> {motorcycle.condition}</p>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {motorcycle.category}</p>
                <p className="text-gray-700 mb-2"><strong>Engine Size:</strong> {motorcycle.engineSize}cc</p>
                <p className="text-gray-700 mb-2"><strong>Mileage:</strong> {motorcycle.mileage?.toLocaleString()} miles</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{motorcycle.description}</p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {motorcycle.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcycleDetail; 