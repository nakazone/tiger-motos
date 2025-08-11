import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motorcycleAPI } from '../../services/api';
import { Motorcycle } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalMotorcycles: 0,
    availableMotorcycles: 0,
    soldMotorcycles: 0
  });
  const [recentMotorcycles, setRecentMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [inventoryResponse] = await Promise.all([
          motorcycleAPI.getAll({}, 1, 5)
        ]);
        
        setRecentMotorcycles(inventoryResponse.motorcycles);
        setStats({
          totalMotorcycles: inventoryResponse.total,
          availableMotorcycles: inventoryResponse.motorcycles.filter(m => m.status === 'available').length,
          soldMotorcycles: inventoryResponse.motorcycles.filter(m => m.status === 'sold').length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
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
              PAINEL ADMIN
            </h1>
            <p className="mt-2 text-gray-300">Bem-vindo ao painel administrativo da Tiger Motos</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 overflow-hidden shadow-lg rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Total de Motocicletas</dt>
                    <dd className="text-2xl font-bold text-white">{stats.totalMotorcycles}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden shadow-lg rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Disponíveis</dt>
                    <dd className="text-2xl font-bold text-white">{stats.availableMotorcycles}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden shadow-lg rounded-lg border border-gray-800">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Vendidas</dt>
                    <dd className="text-2xl font-bold text-white">{stats.soldMotorcycles}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/inventory"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Inventory
              </Link>
              <Link
                to="/admin/motorcycle/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Add Motorcycle
              </Link>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Recent Motorcycles */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Motorcycles</h3>
            {recentMotorcycles.length === 0 ? (
              <p className="text-gray-500">No motorcycles found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motorcycle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentMotorcycles.map((motorcycle) => (
                      <tr key={motorcycle._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {motorcycle.images && motorcycle.images.length > 0 && (
                              <img
                                className="h-10 w-10 rounded-full object-cover mr-3"
                                src={motorcycle.images[0]}
                                alt=""
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {motorcycle.brand} {motorcycle.model}
                              </div>
                              <div className="text-sm text-gray-500">{motorcycle.year}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${motorcycle.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            motorcycle.status === 'available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {motorcycle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/admin/motorcycle/${motorcycle._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 