import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminMotorcycleAPI } from '../../services/api';
import { Motorcycle } from '../../types';

const AdminMotorcycleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [motorcycle, setMotorcycle] = useState<Partial<Motorcycle>>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    condition: 'Good' as const,
    category: 'Standard' as const,
    engineSize: 0,
    mileage: 0,
    description: '',
    features: [],
    status: 'available' as const,
    images: []
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchMotorcycle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMotorcycle = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminMotorcycleAPI.getById(id!);
      setMotorcycle(response);
    } catch (error) {
      console.error('Error fetching motorcycle:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMotorcycle(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'engineSize' || name === 'mileage' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(feature => feature.trim());
    setMotorcycle(prev => ({
      ...prev,
      features
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id && id !== 'new') {
        await adminMotorcycleAPI.update(id, motorcycle);
      } else {
        await adminMotorcycleAPI.create(motorcycle);
      }
      navigate('/admin/inventory');
    } catch (error) {
      console.error('Error saving motorcycle:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading motorcycle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {id && id !== 'new' ? 'Edit Motorcycle' : 'Add New Motorcycle'}
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  required
                  value={motorcycle.brand}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  required
                  value={motorcycle.model}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year *
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={motorcycle.year}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={motorcycle.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Condition *
                </label>
                <select
                  name="condition"
                  id="condition"
                  required
                  value={motorcycle.condition}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  value={motorcycle.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Sport">Sport</option>
                  <option value="Cruiser">Cruiser</option>
                  <option value="Touring">Touring</option>
                  <option value="Dual Sport">Dual Sport</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>

              <div>
                <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700">
                  Engine Size (cc)
                </label>
                <input
                  type="number"
                  name="engineSize"
                  id="engineSize"
                  min="0"
                  value={motorcycle.engineSize}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
                  Mileage
                </label>
                <input
                  type="number"
                  name="mileage"
                  id="mileage"
                  min="0"
                  value={motorcycle.mileage}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status *
                </label>
                <select
                  name="status"
                  id="status"
                  required
                  value={motorcycle.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
                              <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={motorcycle.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                Features (one per line)
              </label>
                              <textarea
                  name="features"
                  id="features"
                  rows={4}
                  value={motorcycle.features?.join('\n') || ''}
                  onChange={handleFeaturesChange}
                  placeholder="ABS Brakes&#10;LED Headlights&#10;Digital Display"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/inventory')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {saving ? 'Saving...' : (id && id !== 'new' ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminMotorcycleForm; 