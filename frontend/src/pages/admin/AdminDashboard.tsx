import React, { useState, useEffect } from 'react';
import { useMotorcycles } from '../../contexts/MotorcycleContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Motorcycle } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { 
    motorcycles, 
    loading, 
    addMotorcycle, 
    updateMotorcycle, 
    deleteMotorcycle, 
    clearStorage, 
    exportData,
    coverPhotos,
    addCoverPhoto,
    removeCoverPhoto,
    updateCoverPhotoOrder,
    addMotorcycleWithImages,
    updateMotorcycleWithImages,
    addCoverPhotoFromUrl
  } = useMotorcycles();

  // Tab management
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'add-edit' | 'cover-photos'>('overview');
  
  // Form state for adding/editing motorcycles
  const [editingMotorcycle, setEditingMotorcycle] = useState<Motorcycle | null>(null);
  const [motorcycleData, setMotorcycleData] = useState<Partial<Motorcycle>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    condition: 'Novo',
    category: 'Padrão',
    engineSize: 0,
    mileage: 0,
    description: '',
    features: [],
    status: 'disponível',
    images: [],
    isFeatured: false
  });

  // Image handling
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'disponível' | 'vendido' | 'pendente'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Calculate comprehensive stats
  const stats = {
    totalMotorcycles: motorcycles.length,
    availableMotorcycles: motorcycles.filter(m => m.status === 'disponível').length,
    soldMotorcycles: motorcycles.filter(m => m.status === 'vendido').length,
    pendingMotorcycles: motorcycles.filter(m => m.status === 'pendente').length,
    featuredMotorcycles: motorcycles.filter(m => m.isFeatured).length,
    totalValue: motorcycles.reduce((sum, m) => sum + m.price, 0),
    averagePrice: motorcycles.length > 0 ? motorcycles.reduce((sum, m) => sum + m.price, 0) / motorcycles.length : 0
  };

  // Filter motorcycles based on search and filters
  const filteredMotorcycles = motorcycles.filter(motorcycle => {
    const matchesSearch = motorcycle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motorcycle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motorcycle.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || motorcycle.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || motorcycle.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setMotorcycleData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setMotorcycleData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value)
      }));
    } else {
      setMotorcycleData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    // const newUrls = files.map(file => URL.createObjectURL(file));
    // setImageUrls(prev => [...prev, ...newUrls]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    // setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMotorcycle) {
      // Update existing motorcycle
      const processedData = {
        ...motorcycleData,
        images: editingMotorcycle.images || []
      };
      
      if (imageFiles.length > 0) {
        const result = await updateMotorcycleWithImages(editingMotorcycle._id, processedData, imageFiles);
        if (result) {
          setEditingMotorcycle(null);
          resetForm();
          setActiveTab('inventory');
        }
      } else {
        updateMotorcycle(editingMotorcycle._id, processedData);
        setEditingMotorcycle(null);
        resetForm();
        setActiveTab('inventory');
      }
    } else {
      // Add new motorcycle
      const newMotorcycle: Motorcycle = {
        _id: Date.now().toString(),
        brand: motorcycleData.brand || '',
        model: motorcycleData.model || '',
        year: motorcycleData.year || new Date().getFullYear(),
        price: motorcycleData.price || 0,
        condition: motorcycleData.condition || 'Novo',
        category: motorcycleData.category || 'Padrão',
        engineSize: motorcycleData.engineSize || 0,
        mileage: motorcycleData.mileage || 0,
        description: motorcycleData.description || '',
        features: motorcycleData.features || [],
        status: motorcycleData.status || 'disponível',
        images: [],
        isFeatured: motorcycleData.isFeatured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (imageFiles.length > 0) {
        const result = await addMotorcycleWithImages(newMotorcycle, imageFiles);
        if (result) {
          resetForm();
          setActiveTab('inventory');
        }
      } else {
        addMotorcycle(newMotorcycle);
        resetForm();
        setActiveTab('inventory');
      }
    }
  };

  // Edit motorcycle
  const handleEdit = (motorcycle: Motorcycle) => {
    setEditingMotorcycle(motorcycle);
    setMotorcycleData({
      brand: motorcycle.brand,
      model: motorcycle.model,
      year: motorcycle.year,
      mileage: motorcycle.mileage,
      price: motorcycle.price,
      category: motorcycle.category,
      condition: motorcycle.condition,
      engineSize: motorcycle.engineSize || 0,
      status: motorcycle.status,
      description: motorcycle.description,
      features: motorcycle.features,
      images: motorcycle.images || [],
      isFeatured: motorcycle.isFeatured || false
    });
    setImageFiles([]);
    setActiveTab('add-edit');
  };

  // Delete motorcycle
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta motocicleta?')) {
      try {
        deleteMotorcycle(id);
        alert('Motocicleta excluída com sucesso!');
      } catch (error) {
        console.error('Error deleting motorcycle:', error);
        alert('Erro ao excluir motocicleta.');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setMotorcycleData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      condition: 'Novo',
      category: 'Padrão',
      engineSize: 0,
      mileage: 0,
      description: '',
      features: [],
      status: 'disponível',
      images: [],
      isFeatured: false
    });
    setEditingMotorcycle(null);
    setImageFiles([]);
    // setImageUrls([]);
  };

  // Add new motorcycle
  const handleAddNew = () => {
    resetForm();
    setActiveTab('add-edit');
  };

  // Toggle featured status
  const toggleFeatured = (id: string, currentStatus: boolean) => {
    updateMotorcycle(id, { isFeatured: !currentStatus });
  };

  // Toggle status
  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'disponível' ? 'vendido' : 'disponível';
    updateMotorcycle(id, { status: newStatus });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const addTestMotorcycle = () => {
    const testMotorcycle = {
      _id: 'test-' + Date.now(),
      brand: 'Test',
      model: 'Motorcycle',
      year: 2024,
      price: 1000,
      condition: 'Novo' as const,
      category: 'Padrão' as const,
      engineSize: 100,
      mileage: 0,
      description: 'Test motorcycle',
      features: ['Test Feature'],
      status: 'disponível' as const,
      images: [],
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    addMotorcycle(testMotorcycle);
    alert('Motorcycle de teste adicionada!');
  };



  const checkMotorcycleStorage = (motorcycleId: string) => {
    const motorcycle = motorcycles.find(m => m._id === motorcycleId);
    if (!motorcycle) {
      alert('Motorcycle não encontrada');
      return;
    }
    
    const motorcycleData = JSON.stringify(motorcycle);
    const sizeKB = (motorcycleData.length / 1024).toFixed(2);
    const maxSize = 8; // 8MB limit
    
    alert(`Storage da moto ${motorcycle.brand} ${motorcycle.model}:\n\nTamanho: ${sizeKB} KB\nLimite: ${maxSize} MB\n\nStatus: ${motorcycleData.length <= maxSize * 1024 * 1024 ? '✅ OK' : '⚠️ Excede limite'}`);
  };

  const logMotorcycleImages = (motorcycleId: string) => {
    const motorcycle = motorcycles.find(m => m._id === motorcycleId);
    if (!motorcycle) {
      alert('Motorcycle não encontrada');
      return;
    }
    
    alert(`Imagens da moto ${motorcycle.brand} ${motorcycle.model}:\n\nTotal: ${motorcycle.images?.length || 0}\n\nStatus: ${motorcycle.images && motorcycle.images.length > 0 ? '✅ Tem imagens' : '❌ Sem imagens'}`);
  };

  const analyzeImageIssues = () => {
    const motorcyclesWithBrokenImages = motorcycles.filter(m => {
      return m.images && m.images.some(img => {
        try {
          // Basic validation - check if it's a valid data URL or external URL
          return img.startsWith('data:') || img.startsWith('http');
        } catch {
          return false;
        }
      });
    });
    
    const totalImages = motorcycles.reduce((sum, m) => sum + (m.images?.length || 0), 0);
    const brokenImages = motorcyclesWithBrokenImages.length;
    
    alert(`Análise de Imagens:\n\nTotal de motos: ${motorcycles.length}\nTotal de imagens: ${totalImages}\nMotos com imagens: ${brokenImages}\n\nStatus: ${brokenImages > 0 ? '⚠️ Algumas imagens podem ter problemas' : '✅ Todas as imagens parecem OK'}`);
  };

  const getStorageInfo = () => {
    const motorcyclesData = localStorage.getItem('tiger-motos-motorcycles') || '';
    const coverPhotosData = localStorage.getItem('tiger-motos-cover-photos') || '';
    
    const motorcyclesSize = new Blob([motorcyclesData]).size;
    const coverPhotosSize = new Blob([coverPhotosData]).size;
    const totalSize = motorcyclesSize + coverPhotosSize;
    
    const sizeKB = (totalSize / 1024).toFixed(2);
    const maxSize = 8; // 8MB limit
    const percentage = ((totalSize / (maxSize * 1024 * 1024)) * 100).toFixed(1);
    
    return { motorcyclesSize, coverPhotosSize, totalSize, sizeKB, maxSize, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-[#e94925] rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-gray-400 text-sm">Tiger Motos - Gerenciamento do Sistema</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">{user?.username}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja sair?')) {
                  logout();
                  navigate('/admin/login');
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-2.293 2.293z" clipRule="evenodd" />
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#e94925] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            📊 Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-[#e94925] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            🏍️ Inventário
          </button>
          <button
            onClick={() => setActiveTab('add-edit')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'add-edit'
                ? 'bg-[#e94925] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            ➕ Adicionar/Editar
          </button>
          <button
            onClick={() => setActiveTab('cover-photos')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cover-photos'
                ? 'bg-[#e94925] text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            🖼️ Fotos de Capa
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddNew}
              className="bg-[#e94925] hover:bg-[#d13d1f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ➕ Adicionar Nova Moto
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🏍️ Ver Inventário
            </button>
            <button
              onClick={() => addTestMotorcycle()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🧪 Test Add
            </button>
            <button
              onClick={() => clearStorage()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🗑️ Clear Storage
            </button>
            <button
              onClick={() => exportData()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              📊 Export Data
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <span className="text-2xl">🏍️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Total de Motos</p>
                    <p className="text-2xl font-bold text-white">{stats.totalMotorcycles}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Disponíveis</p>
                    <p className="text-2xl font-bold text-white">{stats.availableMotorcycles}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Destaques</p>
                    <p className="text-2xl font-bold text-white">{stats.featuredMotorcycles}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Valor Total</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(stats.totalValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-6">📈 Atividade Recente</h3>
              <div className="space-y-3">
                {motorcycles.slice(0, 5).map((motorcycle) => (
                  <div key={motorcycle._id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{motorcycle.brand} {motorcycle.model}</p>
                      <p className="text-sm text-gray-400">
                        {motorcycle.status === 'disponível' ? 'Disponível' : 'Vendida'} • {formatPrice(motorcycle.price)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(motorcycle)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => toggleStatus(motorcycle._id, motorcycle.status)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          motorcycle.status === 'disponível'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {motorcycle.status === 'disponível' ? 'Disponível' : 'Vendida'}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Tem certeza que deseja excluir ${motorcycle.brand} ${motorcycle.model}?`)) {
                            deleteMotorcycle(motorcycle._id);
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Image Management Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-6">🖼️ Gerenciamento de Imagens</h3>
              
              {/* Drag and Drop Instructions */}
              <div className="mb-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-600 rounded-lg">
                <h4 className="text-sm font-medium text-blue-200 mb-3">🎯 Como Usar o Drag & Drop</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-blue-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔄</span>
                    <div>
                      <p className="font-medium">Reorganizar Fotos</p>
                      <p className="text-blue-200">Arraste uma foto para outra posição na mesma moto</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📤</span>
                    <div>
                      <p className="font-medium">Mover Entre Motos</p>
                      <p className="text-blue-200">Arraste uma foto de uma moto para outra</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎨</span>
                    <div>
                      <p className="font-medium">Visual Feedback</p>
                      <p className="text-blue-200">Hover para ver instruções, drag para reorganizar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Storage Info */}
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-3">📊 Status do Armazenamento</h4>
                
                {/* Storage Warning */}
                {(() => {
                  const data = localStorage.getItem('tiger-motos-motorcycles');
                  if (data) {
                    const size = new Blob([data]).size;
                    const percentage = (size / (8 * 1024 * 1024)) * 100; // Updated to 8MB
                    
                    if (percentage > 90) {
                      return (
                        <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
                          ⚠️ <strong>ALERTA CRÍTICO:</strong> Storage quase cheio! ({percentage.toFixed(1)}%)
                          <br />
                          <button
                            onClick={() => {
                              if (window.confirm('Remover automaticamente imagens antigas para liberar espaço?')) {
                                // Trigger cleanup
                                const updatedMotorcycles = motorcycles.map(m => ({
                                  ...m,
                                  images: m.images?.slice(0, 3) || [] // Keep only first 3 images
                                }));
                                // Update each motorcycle individually through context
                                updatedMotorcycles.forEach(m => {
                                  updateMotorcycle(m._id, { images: m.images });
                                });
                                alert('Limpeza automática concluída! Mantidas apenas 3 imagens por moto.');
                              }
                            }}
                            className="mt-2 px-3 py-1 bg-white text-red-600 text-xs rounded hover:bg-gray-100"
                          >
                            🧹 Limpeza Automática
                          </button>
                        </div>
                      );
                    } else if (percentage > 70) {
                      return (
                        <div className="mb-4 p-3 bg-yellow-600 text-white rounded-lg text-sm">
                          ⚠️ <strong>ATENÇÃO:</strong> Storage em {percentage.toFixed(1)}% - Considere remover imagens antigas
                        </div>
                      );
                    }
                  }
                  return null;
                })()}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
                  <div>
                    <p>Total de motocicletas: {motorcycles.length}</p>
                    <p>Motocicletas com imagens: {motorcycles.filter(m => m.images && m.images.length > 0).length}</p>
                    <p>Total de imagens: {motorcycles.reduce((sum, m) => sum + (m.images?.length || 0), 0)}</p>
                  </div>
                  <div>
                    <p>localStorage: {localStorage.getItem('tiger-motos-motorcycles') ? 'Ativo' : 'Vazio'}</p>
                    <p>sessionStorage: {Object.keys(sessionStorage).length} chaves</p>
                    <p>Limite por moto: Máx 10 imagens</p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const data = localStorage.getItem('tiger-motos-motorcycles');
                        if (data) {
                          const size = new Blob([data]).size;
                          const sizeKB = (size / 1024).toFixed(2);
                          const maxSize = (8 * 1024).toFixed(2); // 8MB
                          const percentage = ((size / (8 * 1024 * 1024)) * 100).toFixed(1);
                          alert(`localStorage: ${sizeKB} KB / ${maxSize} KB (${percentage}%)\n\nLimite: 8MB total\nPor moto: Máx 10 imagens\nPor imagem: Máx 500KB`);
                        }
                      }}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                    >
                      📏 Ver Tamanho
                    </button>
                  </div>
                </div>
                
                {/* Storage Usage Bar */}
                {(() => {
                  const data = localStorage.getItem('tiger-motos-motorcycles');
                  if (data) {
                    const size = new Blob([data]).size;
                    const percentage = (size / (8 * 1024 * 1024)) * 100; // Updated to 8MB
                    const color = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500';
                    
                    return (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-300 mb-1">
                          <span>Uso do Storage</span>
                          <span>{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${color}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {((size / 1024).toFixed(2))} KB / 8 MB
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Motorcycle Image Gallery */}
              <div className="space-y-6">
                <h4 className="text-md font-medium text-white mb-4">📸 Imagens por Motocicleta</h4>
                
                {motorcycles.map((motorcycle) => (
                  <div key={motorcycle._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-white font-medium">
                          {motorcycle.brand} {motorcycle.model} ({motorcycle.year})
                        </h5>
                        <p className="text-gray-400 text-sm">
                          ID: {motorcycle._id} • Status: {motorcycle.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">
                          {motorcycle.images?.length || 0} imagens
                        </p>
                        <button
                          onClick={() => logMotorcycleImages(motorcycle._id)}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 mt-1"
                        >
                          🔍 Ver Imagens
                        </button>
                      </div>
                    </div>

                    {/* Image Grid */}
                    {motorcycle.images && motorcycle.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {motorcycle.images.map((image, index) => (
                          <div 
                            key={`${motorcycle._id}-${index}`}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', JSON.stringify({
                                motorcycleId: motorcycle._id,
                                imageIndex: index,
                                imageData: image
                              }));
                              e.currentTarget.classList.add('opacity-50', 'scale-95');
                            }}
                            onDragEnd={(e) => {
                              e.currentTarget.classList.remove('opacity-50', 'scale-95');
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('ring-2', 'ring-[#e84925]', 'ring-opacity-50');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('ring-2', 'ring-[#e84925]', 'ring-opacity-50');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('ring-2', 'ring-[#e84925]', 'ring-opacity-50');
                              
                              try {
                                const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                                const { motorcycleId, imageIndex: dragIndex, imageData } = dragData;
                                
                                if (motorcycleId === motorcycle._id) {
                                  // Same motorcycle - reorder images
                                  const newImages = [...motorcycle.images];
                                  const draggedImage = newImages.splice(dragIndex, 1)[0];
                                  newImages.splice(index, 0, draggedImage);
                                  
                                  updateMotorcycle(motorcycle._id, { images: newImages });
                                  
                                  // Show success message
                                  const toast = document.createElement('div');
                                  toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                                  toast.textContent = `Imagem movida para posição ${index + 1}`;
                                  document.body.appendChild(toast);
                                  setTimeout(() => document.body.removeChild(toast), 2000);
                                } else {
                                  // Different motorcycle - move image between motorcycles
                                  if (window.confirm(`Mover imagem da moto ${motorcycle.brand} ${motorcycle.model} para ${motorcycles.find(m => m._id === motorcycleId)?.brand} ${motorcycles.find(m => m._id === motorcycleId)?.model}?`)) {
                                    // Remove from source motorcycle
                                    const sourceMotorcycle = motorcycles.find(m => m._id === motorcycleId);
                                    if (sourceMotorcycle) {
                                      const sourceImages = [...sourceMotorcycle.images];
                                      const movedImage = sourceImages.splice(dragIndex, 1)[0];
                                      updateMotorcycle(motorcycleId, { images: sourceImages });
                                      
                                      // Add to target motorcycle
                                      const targetImages = [...motorcycle.images];
                                      targetImages.splice(index, 0, movedImage);
                                      updateMotorcycle(motorcycle._id, { images: targetImages });
                                      
                                      // Show success message
                                      const toast = document.createElement('div');
                                      toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                                      toast.textContent = `Imagem movida entre motocicletas`;
                                      document.body.appendChild(toast);
                                      setTimeout(() => document.body.removeChild(toast), 2000);
                                    }
                                  }
                                }
                              } catch (error) {
                                console.error('Error processing drag and drop:', error);
                              }
                            }}
                            className="relative group cursor-move hover:scale-105 transition-all duration-200"
                          >
                            <div className="relative">
                              <img
                                src={image}
                                alt={`${motorcycle.brand} ${motorcycle.model} - Imagem ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                                onLoad={() => {
                                  // Image loaded successfully
                                }}
                              />
                              <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white px-1 py-0.5 rounded text-xs">
                                #{index + 1}
                              </div>
                              <div className="absolute top-1 right-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (window.confirm(`Remover imagem ${index + 1} desta motocicleta?`)) {
                                      const updatedImages = motorcycle.images.filter((_, i) => i !== index);
                                      updateMotorcycle(motorcycle._id, { images: updatedImages });
                                    }
                                  }}
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onMouseUp={(e) => e.stopPropagation()}
                                  onDragStart={(e) => e.stopPropagation()}
                                  className="hover:text-red-200 cursor-pointer z-20 relative"
                                  title="Remover imagem"
                                >
                                  ×
                                </button>
                              </div>
                              {/* Drag indicator */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                                <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                  Arraste para reorganizar
                                </div>
                              </div>
                            </div>
                            <div className="mt-1 text-center">
                              <p className="text-xs text-gray-400">
                                {image.startsWith('data:image/') ? 'Base64' : 'URL'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {image.length > 50 ? image.substring(0, 50) + '...' : image}
                              </p>
                              {/* Separate remove button below image */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (window.confirm(`Remover imagem ${index + 1} desta motocicleta?`)) {
                                    const updatedImages = motorcycle.images.filter((_, i) => i !== index);
                                    updateMotorcycle(motorcycle._id, { images: updatedImages });
                                  }
                                }}
                                className="mt-1 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                                title="Remover imagem"
                              >
                                🗑️ Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-600 rounded-lg">
                        <span className="text-4xl text-gray-400">📷</span>
                        <p className="text-gray-400 text-sm mt-2">Nenhuma imagem</p>
                        <p className="text-gray-500 text-xs">Adicione imagens ao editar esta motocicleta</p>
                      </div>
                    )}

                    {/* Image Actions */}
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(motorcycle)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        ✏️ Editar e Adicionar Imagens
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Limpar todas as imagens desta motocicleta?')) {
                            updateMotorcycle(motorcycle._id, { images: [] });
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        🗑️ Limpar Imagens
                      </button>
                      <button
                        onClick={() => {
                          // Reverse image order
                          const reversedImages = [...(motorcycle.images || [])].reverse();
                          updateMotorcycle(motorcycle._id, { images: reversedImages });
                          
                          // Show success message
                          const toast = document.createElement('div');
                          toast.className = 'fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                          toast.textContent = 'Ordem das imagens invertida!';
                          document.body.appendChild(toast);
                          setTimeout(() => document.body.removeChild(toast), 2000);
                        }}
                        className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                      >
                        🔄 Inverter Ordem
                      </button>
                      <button
                        onClick={() => {
                          // Shuffle image order
                          const shuffledImages = [...(motorcycle.images || [])];
                          for (let i = shuffledImages.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
                          }
                          updateMotorcycle(motorcycle._id, { images: shuffledImages });
                          
                          // Show success message
                          const toast = document.createElement('div');
                          toast.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                          toast.textContent = 'Ordem das imagens aleatorizada!';
                          document.body.appendChild(toast);
                          setTimeout(() => document.body.removeChild(toast), 2000);
                        }}
                        className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                      >
                        🎲 Ordem Aleatória
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Image Management */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-6">🔧 Gerenciamento em Massa de Imagens</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Cleanup */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-3">🧹 Limpeza de Imagens</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        if (window.confirm('Remover todas as imagens de todas as motocicletas? Isso não pode ser desfeito.')) {
                          const updatedMotorcycles = motorcycles.map(m => ({ ...m, images: [] }));
                          // Update each motorcycle individually through context
                          updatedMotorcycles.forEach(m => {
                            updateMotorcycle(m._id, { images: [] });
                          });
                          alert('Todas as imagens foram removidas!');
                        }
                      }}
                      className="w-full px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      🗑️ Remover Todas as Imagens
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Limpar localStorage e sessionStorage? Isso resetará todos os dados.')) {
                          localStorage.clear();
                          sessionStorage.clear();
                          clearStorage(); // Use context function
                          alert('Storage limpo! A página será recarregada.');
                          window.location.reload();
                        }
                      }}
                      className="w-full px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                    >
                      🧽 Limpar Todo o Storage
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Reduzir todas as motocicletas para máximo 3 imagens para liberar espaço?')) {
                          const updatedMotorcycles = motorcycles.map(m => ({
                            ...m,
                            images: m.images?.slice(0, 3) || []
                          }));
                          
                          // Update each motorcycle individually through context
                          updatedMotorcycles.forEach(m => {
                            updateMotorcycle(m._id, { images: m.images });
                          });
                          
                          alert('Storage otimizado! Máximo 3 imagens por moto.');
                        }
                      }}
                      className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    >
                      🎯 Otimizar Storage (3 img/moto)
                    </button>
                  </div>
                </div>

                {/* Image Analysis */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-3">📊 Análise de Imagens</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => analyzeImageIssues()}
                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
                    >
                      🔍 Analisar Imagens
                    </button>
                    
                    <button
                      onClick={() => {
                        // Find motorcycles with broken images
                        const motorcyclesWithBrokenImages = motorcycles.filter(m => 
                          m.images?.some(img => !img || img.length === 0)
                        );
                        
                        if (motorcyclesWithBrokenImages.length === 0) {
                          alert('Nenhuma motocicleta com imagens quebradas encontrada!');
                        } else {
                          alert(`Encontradas ${motorcyclesWithBrokenImages.length} motocicletas com imagens quebradas.`);
                        }
                      }}
                      className="w-full px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                    >
                      ⚠️ Encontrar Imagens Quebradas
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Remover automaticamente todas as imagens quebradas ou vazias?')) {
                          const updatedMotorcycles = motorcycles.map(m => ({
                            ...m,
                            images: m.images?.filter(img => img && img.length > 0) || []
                          }));
                          
                          // Update each motorcycle individually through context
                          updatedMotorcycles.forEach(m => {
                            updateMotorcycle(m._id, { images: m.images });
                          });
                          
                          const totalRemoved = motorcycles.reduce((sum, m) => 
                            sum + (m.images?.length || 0), 0
                          ) - updatedMotorcycles.reduce((sum, m) => 
                            sum + (m.images?.length || 0), 0
                          );
                          
                          alert(`Limpeza concluída! ${totalRemoved} imagens quebradas foram removidas.`);
                        }
                      }}
                      className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      🧹 Remover Imagens Quebradas
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Global Drag & Drop Zone */}
              <div className="mt-6 p-4 bg-blue-900 bg-opacity-20 border-2 border-dashed border-blue-500 rounded-lg">
                <h4 className="text-sm font-medium text-blue-200 mb-3">🌐 Zona Global de Drag & Drop</h4>
                <div className="text-xs text-blue-100 mb-3">
                  <p>• Arraste imagens de qualquer motocicleta para esta zona para criar uma "área de transferência"</p>
                  <p>• Use para reorganizar imagens entre motocicletas ou criar novas coleções</p>
                </div>
                <div 
                  className="min-h-20 bg-blue-900 bg-opacity-30 rounded-lg border-2 border-dashed border-blue-400 flex items-center justify-center"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('bg-blue-600', 'bg-opacity-50');
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('bg-blue-600', 'bg-opacity-50');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('bg-blue-600', 'bg-opacity-50');
                    
                    try {
                      const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                      const { motorcycleId, imageIndex, imageData } = dragData;
                      
                      // Store in sessionStorage for later use
                      const clipboardKey = `image-clipboard-${Date.now()}`;
                      sessionStorage.setItem(clipboardKey, JSON.stringify({
                        motorcycleId,
                        imageIndex,
                        imageData,
                        timestamp: Date.now()
                      }));
                      
                      // Show success message
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                      toast.textContent = `Imagem copiada para área de transferência (${clipboardKey})`;
                      document.body.appendChild(toast);
                      setTimeout(() => document.body.removeChild(toast), 3000);
                      
                    } catch (error) {
                      console.error('Error processing global drop:', error);
                    }
                  }}
                >
                  <div className="text-center text-blue-200">
                    <span className="text-2xl">📋</span>
                    <p className="text-sm">Solte imagens aqui para área de transferência</p>
                    <p className="text-xs opacity-75">Use para reorganizar entre motocicletas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Buscar por marca, modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                />
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                >
                  <option value="all">Todos os Status</option>
                  <option value="disponível">Disponível</option>
                  <option value="vendido">Vendida</option>
                  <option value="pendente">Pendente</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                >
                  <option value="all">Todas as Categorias</option>
                  <option value="Sport">Sport</option>
                  <option value="Cruiser">Cruiser</option>
                  <option value="Touring">Touring</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Naked">Naked</option>
                  <option value="Scooter">Scooter</option>
                  <option value="Dual-Sport">Dual-Sport</option>
                  <option value="Custom">Custom</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
            </div>

            {/* Motorcycles List */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Moto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Destaque
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredMotorcycles.map((motorcycle) => (
                      <tr key={motorcycle._id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              {motorcycle.images && motorcycle.images.length > 0 ? (
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src={motorcycle.images[0]}
                                  alt={`${motorcycle.brand} ${motorcycle.model}`}
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-gray-600 flex items-center justify-center">
                                  <span className="text-gray-400 text-lg">🏍️</span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {motorcycle.brand} {motorcycle.model}
                              </div>
                              <div className="text-sm text-gray-400">
                                {motorcycle.year} • {motorcycle.engineSize}cc
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white font-medium">
                            {formatPrice(motorcycle.price)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleStatus(motorcycle._id, motorcycle.status)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              motorcycle.status === 'disponível'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {motorcycle.status === 'disponível' ? 'Disponível' : 'Vendida'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                                     <button
                             onClick={() => toggleFeatured(motorcycle._id, motorcycle.isFeatured || false)}
                             className={`text-2xl ${motorcycle.isFeatured ? 'text-yellow-400' : 'text-gray-400'}`}
                           >
                             {motorcycle.isFeatured ? '⭐' : '☆'}
                           </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(motorcycle)}
                              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => toggleStatus(motorcycle._id, motorcycle.status)}
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                motorcycle.status === 'disponível'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {motorcycle.status === 'disponível' ? 'Disponível' : 'Vendida'}
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Tem certeza que deseja excluir ${motorcycle.brand} ${motorcycle.model}?`)) {
                                  deleteMotorcycle(motorcycle._id);
                                }
                              }}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                            >
                              🗑️ Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add-edit' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-6">
              {editingMotorcycle ? 'Editar Motocicleta' : 'Adicionar Nova Motocicleta'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={motorcycleData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                      placeholder="Ex: Honda, Yamaha, Kawasaki"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={motorcycleData.model}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                      placeholder="Ex: CBR 600RR, R1, Ninja"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ano *
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={motorcycleData.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preço (R$) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={motorcycleData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Categoria
                    </label>
                    <select
                      name="category"
                      value={motorcycleData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                    >
                      <option value="Sport">Sport</option>
                      <option value="Cruiser">Cruiser</option>
                      <option value="Touring">Touring</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Naked">Naked</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Dual-Sport">Dual-Sport</option>
                      <option value="Custom">Custom</option>
                      <option value="Standard">Standard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Condição
                    </label>
                    <select
                      name="condition"
                      value={motorcycleData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                    >
                      <option value="New">Nova</option>
                      <option value="Used">Usada</option>
                      <option value="Certified Pre-Owned">Certificada</option>
                      <option value="Excellent">Excelente</option>
                      <option value="Good">Boa</option>
                      <option value="Fair">Regular</option>
                      <option value="Poor">Ruim</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cilindrada (cc)
                    </label>
                    <input
                      type="number"
                      name="engineSize"
                      value={motorcycleData.engineSize}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                      placeholder="Ex: 600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Quilometragem
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={motorcycleData.mileage}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                      placeholder="Ex: 15000"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={motorcycleData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                  placeholder="Descreva a motocicleta, histórico, modificações..."
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Características (separadas por vírgula)
                </label>
                <input
                  type="text"
                  name="features"
                  value={Array.isArray(motorcycleData.features) ? motorcycleData.features.join(', ') : ''}
                  onChange={(e) => {
                    const features = e.target.value.split(',').map(f => f.trim()).filter(f => f);
                    setMotorcycleData(prev => ({ ...prev, features }));
                  }}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                  placeholder="Ex: ABS, Injeção eletrônica, Farol LED"
                />
              </div>

              {/* Status and Featured */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={motorcycleData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                  >
                    <option value="available">Disponível</option>
                    <option value="sold">Vendida</option>
                    <option value="pending">Pendente</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={motorcycleData.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#e94925] focus:ring-[#e94925] border-gray-600 rounded"
                  />
                  <label className="text-sm font-medium text-gray-300">
                    Destacar na página inicial
                  </label>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Imagens
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                />
                
                {/* Image Previews */}
                {imageFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setActiveTab('inventory');
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#e94925] text-white rounded-lg hover:bg-[#d13d1f] transition-colors"
                >
                  {editingMotorcycle ? 'Atualizar Motocicleta' : 'Adicionar Motocicleta'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'cover-photos' && (
          <div className="space-y-6">
            {/* Cover Photos Management */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h3 className="text-lg font-medium text-white mb-6">Gerenciamento de Fotos de Capa</h3>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-white mb-4">📸 Fotos da Seção Destaques (Homepage)</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Estas fotos aparecem na seção de destaque da página inicial. A primeira foto é usada como imagem principal.
                </p>
                
                {/* Add New Cover Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adicionar Nova Foto de Capa
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          addCoverPhoto(file);
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#e94925]"
                    />
                    <button
                      onClick={() => {
                        // Add a sample photo for testing
                        const sampleUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
                        addCoverPhotoFromUrl(sampleUrl);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      🧪 Add Sample
                    </button>
                  </div>
                </div>

                {/* Current Cover Photos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coverPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="relative">
                        <img
                          src={photo}
                          alt={`Cover Photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-600 group-hover:border-[#e94925] transition-colors"
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                          #{index + 1}
                        </div>
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => removeCoverPhoto(index)}
                            className="hover:text-red-200"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <p className="text-sm text-gray-300">
                          {index === 0 ? '🖼️ Foto Principal' : `Foto ${index + 1}`}
                        </p>
                        {index === 0 && (
                          <p className="text-xs text-gray-400">Aparece na seção de destaque</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Drag & Drop Instructions */}
                {coverPhotos.length > 1 && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      💡 <strong>Dica:</strong> Arraste as fotos para reordenar. A primeira foto será exibida como principal na seção de destaque.
                    </p>
                    <p className="text-xs text-gray-400">
                      Para reordenar, clique e arraste as fotos acima. A ordem determina qual foto aparece primeiro.
                    </p>
                  </div>
                )}
              </div>

              {/* Motorcycle Detail Photos Info */}
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-md font-medium text-white mb-4">📱 Fotos das Páginas de Detalhes</h4>
                <p className="text-sm text-gray-400 mb-4">
                  As fotos que você adiciona ao cadastrar/editar motocicletas aparecem automaticamente nas páginas de detalhes de cada moto.
                </p>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-white mb-2">Como funciona:</h5>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 📸 <strong>Upload de fotos:</strong> Adicione fotos ao cadastrar/editar motocicletas</li>
                    <li>• 🖼️ <strong>Exibição automática:</strong> As fotos aparecem na página de detalhes da moto</li>
                    <li>• 🔄 <strong>Sincronização:</strong> Mudanças no admin atualizam o site em tempo real</li>
                    <li>• 💾 <strong>Persistência:</strong> Todas as fotos são salvas automaticamente</li>
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap gap-4">
                                 <button
                   onClick={() => {
                     // Clear all cover photos
                     if (window.confirm('Tem certeza que deseja remover todas as fotos de capa?')) {
                       updateCoverPhotoOrder([]);
                     }
                   }}
                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                 >
                   🗑️ Limpar Todas as Fotos
                 </button>
                <button
                  onClick={() => {
                    // Reset to default cover photos
                    const defaultPhotos = [
                      '/motorcycle-hero.mp4',
                      '/logoTiger.png'
                    ];
                    updateCoverPhotoOrder(defaultPhotos);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  🔄 Restaurar Padrão
                </button>
              </div>
            </div>

            {/* Photo Usage Preview */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <h4 className="text-md font-medium text-white mb-4">👀 Preview de Uso</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Homepage Featured Section Preview */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-white mb-3">🏠 Seção Destaques (Homepage)</h5>
                  <div className="bg-black rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    {coverPhotos.length > 0 ? (
                      <div className="text-center">
                        <img
                          src={coverPhotos[0]}
                          alt="Main cover photo"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <p className="text-xs text-gray-400">Foto principal da seção de destaque</p>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Nenhuma foto de capa definida</p>
                    )}
                  </div>
                </div>

                {/* Motorcycle Detail Page Preview */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-white mb-3">🏍️ Página de Detalhes da Moto</h5>
                  <div className="bg-black rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gray-600 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">🏍️</span>
                      </div>
                      <p className="text-xs text-gray-400">Fotos das motocicletas aparecem aqui</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 