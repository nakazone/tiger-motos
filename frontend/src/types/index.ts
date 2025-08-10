export interface Motorcycle {
  _id: string;
  brand: string;
  model: string;
  year: number;
  category: 'Sport' | 'Cruiser' | 'Touring' | 'Adventure' | 'Naked' | 'Scooter' | 'Dual-Sport' | 'Custom' | 'Standard';
  condition: 'New' | 'Used' | 'Certified Pre-Owned' | 'Excellent' | 'Good' | 'Fair' | 'Poor';
  price: number;
  mileage: number;
  engineSize: number;
  fuelType?: 'Gasoline' | 'Electric' | 'Hybrid';
  transmission?: 'Manual' | 'Automatic' | 'CVT';
  color?: string;
  vin?: string;
  description: string;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'pending';
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