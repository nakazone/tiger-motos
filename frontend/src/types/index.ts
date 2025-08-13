export interface Motorcycle {
  _id: string;
  brand: string;
  model: string;
  year: number;
  category: 'Esportiva' | 'Custom' | 'Touring' | 'Aventura' | 'Naked' | 'Scooter' | 'Dual-Sport' | 'Padrão';
  condition: 'Novo' | 'Usado' | 'Certificado' | 'Excelente' | 'Bom' | 'Regular' | 'Ruim';
  price: number;
  mileage: number;
  engineSize: number;
  fuelType?: 'Gasolina' | 'Elétrico' | 'Híbrido';
  transmission?: 'Manual' | 'Automático' | 'CVT';
  color?: string;
  vin?: string;
  description: string;
  features: string[];
  images: string[];
  status: 'disponível' | 'vendido' | 'pendente';
  isAvailable?: boolean;
  isFeatured?: boolean;
  location?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'sales' | 'manager';
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface InventoryResponse {
  motorcycles: Motorcycle[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FilterOptions {
  brand?: string;
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DashboardStats {
  totalMotorcycles: number;
  availableMotorcycles: number;
  newMotorcycles: number;
  usedMotorcycles: number;
  featuredMotorcycles: number;
  recentMotorcycles: Motorcycle[];
  brandStats: Array<{ _id: string; count: number }>;
  categoryStats: Array<{ _id: string; count: number }>;
} 