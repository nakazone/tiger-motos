import React, { useState } from 'react';

const Sell: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    price: '',
    description: '',
    features: '',
    images: [] as File[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Obrigado pelo seu interesse! Entraremos em contato em breve para discutir a venda da sua moto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      brand: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      price: '',
      description: '',
      features: '',
      images: []
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto w-full pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 py-16">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Venda Sua Motocicleta</h2>
          
          <div className="mb-8">
            <p className="text-gray-300 mb-4">
              Está pensando em vender sua motocicleta? A Tiger Motos pode ajudar! 
              Preencha o formulário abaixo e nossa equipe entrará em contato para avaliar sua moto.
            </p>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Por que vender conosco?</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Avaliação profissional e justa</li>
                <li>• Processo rápido e transparente</li>
                <li>• Pagamento à vista</li>
                <li>• Suporte completo na documentação</li>
              </ul>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Motorcycle Information */}
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Informações da Motocicleta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-1">
                    Marca *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Honda, Yamaha, Kawasaki"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                  />
                </div>
                
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder="Ex: CBR600RR, YZF-R1"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                  />
                </div>
                
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                    Ano *
                  </label>
                  <input
                    type="number"
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="2020"
                  />
                </div>
                
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-300 mb-1">
                    Quilometragem (km) *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    id="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="5000"
                  />
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-300 mb-1">
                    Estado de Conservação *
                  </label>
                  <select
                    name="condition"
                    id="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94925]"
                  >
                    <option value="">Selecione o estado</option>
                    <option value="excellent">Excelente</option>
                    <option value="good">Bom</option>
                    <option value="fair">Regular</option>
                    <option value="poor">Ruim</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                    Preço Desejado (R$) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925]"
                    placeholder="15000"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Descrição e Detalhes</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Descrição da Motocicleta *
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Descreva o estado geral, histórico de manutenção, modificações, etc."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925] resize-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-1">
                    Acessórios e Equipamentos
                  </label>
                  <textarea
                    name="features"
                    id="features"
                    rows={3}
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Liste acessórios, equipamentos de segurança, modificações, etc."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e94925] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Fotos da Motocicleta</h2>
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-1">
                  Envie fotos da sua moto (máximo 5 fotos)
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#e94925] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#e94925] file:text-white hover:file:bg-[#d13d1f] file:cursor-pointer"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB por foto.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#e94925] hover:bg-[#d13d1f] text-white px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#e94925] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Enviar Proposta de Venda
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell; 