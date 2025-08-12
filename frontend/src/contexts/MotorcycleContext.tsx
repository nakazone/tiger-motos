import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Motorcycle } from '../types';

export interface MotorcycleContextType {
  motorcycles: Motorcycle[];
  featuredMotorcycles: Motorcycle[];
  loading: boolean;
  addMotorcycle: (motorcycle: Motorcycle) => void;
  updateMotorcycle: (id: string, updates: Partial<Motorcycle>) => void;
  deleteMotorcycle: (id: string) => void;
  getMotorcycleById: (id: string) => Motorcycle | undefined;
  getMotorcyclesByFilters: (filters: any) => Motorcycle[];
  clearStorage: () => void;
  exportData: () => string | null;
  forceRefresh: () => void;
  // Cover photo management
  coverPhotos: string[];
  addCoverPhoto: (file: File) => void;
  addCoverPhotoFromUrl: (photoUrl: string) => void;
  removeCoverPhoto: (index: number) => void;
  updateCoverPhotoOrder: (newOrder: string[]) => void;
  // Enhanced image handling
  addMotorcycleWithImages: (motorcycle: Motorcycle, imageFiles: File[]) => Promise<Motorcycle>;
  updateMotorcycleWithImages: (id: string, updates: Partial<Motorcycle>, imageFiles: File[]) => Promise<Partial<Motorcycle>>;
  fileToBase64: (file: File) => Promise<string>;
  createThumbnail: (file: File) => Promise<string>;
  storeImageData: (file: File) => Promise<{ id: string; thumbnail: string; name: string; size: number }>;
  getImageData: (imageId: string) => string | null;
  // Function to get full image data for display
  getFullImageData: (imageUrl: string) => string | null;
  // Storage monitoring
  getStorageInfo: () => { motorcyclesSize: number; coverPhotosSize: number; totalSize: number };
}

const MotorcycleContext = createContext<MotorcycleContextType | undefined>(undefined);

export const useMotorcycles = () => {
  const context = useContext(MotorcycleContext);
  if (context === undefined) {
    throw new Error('useMotorcycles must be used within a MotorcycleProvider');
  }
  return context;
};

interface MotorcycleProviderProps {
  children: ReactNode;
}

export const MotorcycleProvider: React.FC<MotorcycleProviderProps> = ({ children }) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);

  // Function to convert file to base64 for storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Function to create a compressed thumbnail for storage
  const createThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Create thumbnail (max 200x200 pixels)
        const maxSize = 200;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        
        resolve(thumbnail);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Function to store image data efficiently
  const storeImageData = async (file: File): Promise<{ id: string; thumbnail: string; name: string; size: number }> => {
    try {
      // Create a unique ID for the image
      const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create compressed thumbnail
      const thumbnail = await createThumbnail(file);
      
      // Store full image in sessionStorage (temporary, cleared on page close)
      const fullImage = await fileToBase64(file);
      sessionStorage.setItem(imageId, fullImage);
      
      return {
        id: imageId,
        thumbnail: thumbnail,
        name: file.name,
        size: file.size
      };
    } catch (error) {
      console.error('Error storing image data:', error);
      throw error;
    }
  };

  // Function to retrieve full image data
  const getImageData = (imageId: string): string | null => {
    return sessionStorage.getItem(imageId);
  };

  // Function to get full image data for display
  const getFullImageData = useCallback((imageUrl: string): string | null => {
    
    // If it's a thumbnail (starts with data:image/jpeg;base64,)
    if (imageUrl.startsWith('data:image/jpeg;base64,')) {
      
      // For now, return the thumbnail as the full image
      // In a real implementation, you'd store the mapping between thumbnails and full images
      return imageUrl;
    }
    
    // If it's already a full image or external URL
    return imageUrl;
  }, []);

  // Basic CRUD operations
  const addMotorcycle = useCallback((motorcycle: Motorcycle) => {
    setMotorcycles(prev => [...prev, motorcycle]);
  }, []);

  const updateMotorcycle = useCallback((id: string, updates: Partial<Motorcycle>) => {
    setMotorcycles(prev => prev.map(m => m._id === id ? { ...m, ...updates } : m));
  }, []);

  const deleteMotorcycle = useCallback((id: string) => {
    setMotorcycles(prev => prev.filter(m => m._id !== id));
  }, []);

  // Image storage management with size limits
  const MAX_IMAGE_SIZE = 500 * 1024; // 500KB per image
  const MAX_TOTAL_STORAGE = 8 * 1024 * 1024; // 8MB total localStorage limit (increased from 4MB)
  const MAX_IMAGES_PER_MOTORCYCLE = 10; // Limit images per motorcycle

  // Compress image to reduce size
  const compressImage = useCallback(async (file: File, maxSize: number = MAX_IMAGE_SIZE): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate dimensions to maintain aspect ratio
        let { width, height } = img;
        const maxDimension = 800; // Max dimension
        
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Start with high quality and reduce until under max size
        let quality = 0.9;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        const compressUntilUnderSize = () => {
          if (dataUrl.length * 0.75 <= maxSize || quality <= 0.1) {
            resolve(dataUrl);
            return;
          }
          
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          setTimeout(compressUntilUnderSize, 0);
        };
        
        compressUntilUnderSize();
      };
      
      img.src = URL.createObjectURL(file);
    });
  }, []);

  // Check storage availability
  const checkStorageAvailability = useCallback((newDataSize: number): boolean => {
    try {
      const currentData = localStorage.getItem('tiger-motos-motorcycles') || '';
      const currentSize = new Blob([currentData]).size;
      const availableSpace = MAX_TOTAL_STORAGE - currentSize;
      
      return newDataSize <= availableSpace;
    } catch (error) {
      console.error('Storage check failed:', error);
      return false;
    }
  }, []);

  // Store images in chunks to avoid quota issues
  const storeImagesInChunks = useCallback(async (imageFiles: File[]): Promise<string[]> => {
    const compressedImages: string[] = [];
    
    for (let i = 0; i < Math.min(imageFiles.length, MAX_IMAGES_PER_MOTORCYCLE); i++) {
      try {
        const compressed = await compressImage(imageFiles[i]);
        compressedImages.push(compressed);
        
        // Check if adding this image would exceed storage
        const testData = JSON.stringify([...motorcycles, { images: compressedImages }]);
        if (!checkStorageAvailability(testData.length)) {
          console.warn(`Storage limit reached after ${i + 1} images. Stopping upload.`);
          break;
        }
      } catch (error) {
        console.error(`Failed to compress image ${i}:`, error);
      }
    }
    
    return compressedImages;
  }, [motorcycles, compressImage, checkStorageAvailability]);

  // Enhanced addMotorcycleWithImages with storage management
  const addMotorcycleWithImages = useCallback(async (motorcycle: Motorcycle, imageFiles: File[]): Promise<Motorcycle> => {
    try {
      
      // Check if we can add more images
      if (imageFiles.length > MAX_IMAGES_PER_MOTORCYCLE) {
        console.warn(`Too many images (${imageFiles.length}). Limiting to ${MAX_IMAGES_PER_MOTORCYCLE}`);
        imageFiles = imageFiles.slice(0, MAX_IMAGES_PER_MOTORCYCLE);
      }
      
      // Compress and store images
      const compressedImages = await storeImagesInChunks(imageFiles);
      
      // Combine with existing images (respecting limit)
      const existingImages = motorcycle.images || [];
      const allImages = [...existingImages, ...compressedImages].slice(0, MAX_IMAGES_PER_MOTORCYCLE);
      
      const motorcycleWithImages: Motorcycle = {
        ...motorcycle,
        images: allImages
      };
      
      // Check final storage size
      const finalData = JSON.stringify([...motorcycles, motorcycleWithImages]);
      if (!checkStorageAvailability(finalData.length)) {
        throw new Error('Storage quota exceeded even with compression');
      }
      
      // Save to state and localStorage
      setMotorcycles(prev => {
        const newList = [...prev, motorcycleWithImages];
        
        try {
          localStorage.setItem('tiger-motos-motorcycles', JSON.stringify(newList));
        } catch (error) {
          console.error('localStorage save failed:', error);
          // Try to save without images as fallback
          const motorcycleWithoutImages = { ...motorcycleWithImages, images: [] };
          const fallbackList = [...prev, motorcycleWithoutImages];
          localStorage.setItem('tiger-motos-motorcycles', JSON.stringify(fallbackList));
        }
        
        return newList;
      });
      
      return motorcycleWithImages;
    } catch (error) {
      console.error('Error processing images:', error);
      // Fallback to adding without images
      const motorcycleWithoutImages = { ...motorcycle, images: [] };
      addMotorcycle(motorcycleWithoutImages);
      return motorcycleWithoutImages;
    }
  }, [motorcycles, addMotorcycle, storeImagesInChunks, checkStorageAvailability]);

  // Enhanced updateMotorcycleWithImages
  const updateMotorcycleWithImages = useCallback(async (id: string, updates: Partial<Motorcycle>, imageFiles: File[]): Promise<Partial<Motorcycle>> => {
    try {
      
      const existingMotorcycle = motorcycles.find(m => m._id === id);
      if (!existingMotorcycle) {
        throw new Error('Motorcycle not found');
      }
      
      // Process new images
      const newImages = imageFiles.length > 0 ? await storeImagesInChunks(imageFiles) : [];
      
      // Combine existing and new images (respecting limit)
      const existingImages = existingMotorcycle.images || [];
      const allImages = [...existingImages, ...newImages].slice(0, MAX_IMAGES_PER_MOTORCYCLE);
      
      const updatedMotorcycle: Partial<Motorcycle> = {
        ...updates,
        images: allImages
      };
      
      // Check storage size
      const otherMotorcycles = motorcycles.filter(m => m._id !== id);
      const finalData = JSON.stringify([...otherMotorcycles, { ...existingMotorcycle, ...updatedMotorcycle }]);
      if (!checkStorageAvailability(finalData.length)) {
        throw new Error('Storage quota exceeded');
      }
      
      // Update
      updateMotorcycle(id, updatedMotorcycle);
      return updatedMotorcycle;
    } catch (error) {
      console.error('Error updating motorcycle with images:', error);
      // Fallback to update without images
      updateMotorcycle(id, updates);
      return updates;
    }
  }, [motorcycles, updateMotorcycle, storeImagesInChunks, checkStorageAvailability]);

  // Utility functions
  const getMotorcycleById = useCallback((id: string) => {
    return motorcycles.find(m => m._id === id);
  }, [motorcycles]);

  const getMotorcyclesByFilters = useCallback((filters: any) => {
    return motorcycles.filter(motorcycle => {
      if (filters.brand && motorcycle.brand !== filters.brand) return false;
      if (filters.category && motorcycle.category !== filters.category) return false;
      if (filters.condition && motorcycle.condition !== filters.condition) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (motorcycle.price < min || (max && motorcycle.price > max)) return false;
      }
      return true;
    });
  }, [motorcycles]);

  // Function to clear localStorage (useful for debugging)
  const clearStorage = useCallback(() => {
    localStorage.removeItem('tiger-motos-motorcycles');
    localStorage.removeItem('tiger-motos-cover-photos');
    sessionStorage.clear(); // Clear all image data
    setMotorcycles(sampleMotorcycles);
    setCoverPhotos([]);
  }, []);

  // Function to export current data (useful for debugging)
  const exportData = useCallback(() => {
    const data = localStorage.getItem('tiger-motos-motorcycles');
    return data;
  }, []);

  // Force refresh function to debug state issues
  const forceRefresh = useCallback(() => {
    const savedMotorcycles = localStorage.getItem('tiger-motos-motorcycles');
    if (savedMotorcycles) {
      try {
        const parsed = JSON.parse(savedMotorcycles);
        setMotorcycles(parsed);
      } catch (error) {
        console.error('MotorcycleContext: Force refresh error:', error);
      }
    }
  }, []);

  // Get storage information
  const getStorageInfo = useCallback(() => {
    try {
      const motorcyclesData = localStorage.getItem('tiger-motos-motorcycles');
      const coverPhotosData = localStorage.getItem('tiger-motos-cover-photos');
      
      const motorcyclesSize = motorcyclesData ? new Blob([motorcyclesData]).size : 0;
      const coverPhotosSize = coverPhotosData ? new Blob([coverPhotosData]).size : 0;
      const totalSize = motorcyclesSize + coverPhotosSize;
      
      return { motorcyclesSize, coverPhotosSize, totalSize };
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { motorcyclesSize: 0, coverPhotosSize: 0, totalSize: 0 };
    }
  }, []);

  // Cleanup old images if storage is getting full
  const cleanupOldImages = useCallback(() => {
    const { totalSize } = getStorageInfo();
    const percentage = (totalSize / MAX_TOTAL_STORAGE) * 100;
    
    if (percentage > 80) {
      // Reduce images to 5 per motorcycle to free up space
      setMotorcycles(prev => prev.map(motorcycle => {
        if (motorcycle.images && motorcycle.images.length > 5) {
          return {
            ...motorcycle,
            images: motorcycle.images.slice(0, 5)
          };
        }
        return motorcycle;
      }));
    }
  }, [getStorageInfo]);

  // Sample data - this would normally come from an API
  const sampleMotorcycles: Motorcycle[] = [
    {
      _id: '1',
      brand: 'Honda',
      model: 'CG 150',
      year: 2020,
      price: 8500,
      condition: 'Used',
      category: 'Standard',
      engineSize: 150,
      mileage: 15000,
      description: 'Excelente moto para uso urbano, econômica e confiável.',
      features: ['Partida elétrica', 'Painel digital', 'Freio ABS'],
      status: 'available',
      images: [],
      isFeatured: true
    },
    {
      _id: '2',
      brand: 'Yamaha',
      model: 'Fazer 250',
      year: 2019,
      price: 12000,
      condition: 'Used',
      category: 'Sport',
      engineSize: 250,
      mileage: 8000,
      description: 'Moto esportiva com excelente performance e conforto para viagens.',
      features: ['Freio ABS', 'Painel digital', 'Farol LED'],
      status: 'available',
      images: [],
      isFeatured: true
    },
    {
      _id: '3',
      brand: 'Kawasaki',
      model: 'Ninja 300',
      year: 2021,
      price: 18000,
      condition: 'Used',
      category: 'Sport',
      engineSize: 300,
      mileage: 5000,
      description: 'Moto esportiva de alta performance, ideal para pilotos experientes.',
      features: ['Freio ABS', 'Painel digital', 'Suspensão ajustável'],
      status: 'available',
      images: [],
      isFeatured: true
    }
  ];

  // Initialize motorcycles from localStorage or use sample data
  useEffect(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('tiger-motos-motorcycles');
      if (stored) {
        const parsed = JSON.parse(stored);
        setMotorcycles(parsed);
      } else {
        setMotorcycles(sampleMotorcycles);
        localStorage.setItem('tiger-motos-motorcycles', JSON.stringify(sampleMotorcycles));
      }
    } catch (error) {
      console.error('Error loading motorcycles from localStorage:', error);
      setMotorcycles(sampleMotorcycles);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize cover photos from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tiger-motos-cover-photos');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCoverPhotos(parsed);
      }
    } catch (error) {
      console.error('Error loading cover photos from localStorage:', error);
    }
  }, []);

  // Save motorcycles to localStorage whenever they change
  useEffect(() => {
    if (motorcycles.length > 0) {
      try {
        localStorage.setItem('tiger-motos-motorcycles', JSON.stringify(motorcycles));
      } catch (error) {
        console.error('Failed to save motorcycles to localStorage:', error);
        // If we hit quota, try to cleanup
        cleanupOldImages();
      }
    }
  }, [motorcycles, cleanupOldImages]);

  // Cover photo management functions
  const addCoverPhoto = useCallback(async (file: File) => {
    try {
      const thumbnail = await createThumbnail(file);
      setCoverPhotos(prev => {
        const newPhotos = [...prev, thumbnail];
        localStorage.setItem('tiger-motos-cover-photos', JSON.stringify(newPhotos));
        return newPhotos;
      });
    } catch (error) {
      console.error('Error processing cover photo:', error);
    }
  }, [createThumbnail]);

  const addCoverPhotoFromUrl = useCallback((photoUrl: string) => {
    setCoverPhotos(prev => {
      const newPhotos = [...prev, photoUrl];
      localStorage.setItem('tiger-motos-cover-photos', JSON.stringify(newPhotos));
      return newPhotos;
    });
  }, []);

  const removeCoverPhoto = useCallback((index: number) => {
    setCoverPhotos(prev => {
      const newPhotos = prev.filter((_, i) => i !== index);
      localStorage.setItem('tiger-motos-cover-photos', JSON.stringify(newPhotos));
      return newPhotos;
    });
  }, []);

  const updateCoverPhotoOrder = useCallback((newOrder: string[]) => {
    setCoverPhotos(newOrder);
    localStorage.setItem('tiger-motos-cover-photos', JSON.stringify(newOrder));
  }, []);

  const featuredMotorcycles = motorcycles.filter(m => m.isFeatured);

  const value: MotorcycleContextType = useMemo(() => ({
    motorcycles,
    featuredMotorcycles,
    loading,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    getMotorcycleById,
    getMotorcyclesByFilters,
    clearStorage,
    exportData,
    forceRefresh,
    coverPhotos,
    addCoverPhoto,
    addCoverPhotoFromUrl,
    removeCoverPhoto,
    updateCoverPhotoOrder,
    addMotorcycleWithImages,
    updateMotorcycleWithImages,
    fileToBase64,
    createThumbnail,
    storeImageData,
    getImageData,
    getFullImageData,
    getStorageInfo
  }), [
    motorcycles,
    featuredMotorcycles,
    loading,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    getMotorcycleById,
    getMotorcyclesByFilters,
    clearStorage,
    exportData,
    forceRefresh,
    coverPhotos,
    addCoverPhoto,
    addCoverPhotoFromUrl,
    removeCoverPhoto,
    updateCoverPhotoOrder,
    addMotorcycleWithImages,
    updateMotorcycleWithImages,
    fileToBase64,
    createThumbnail,
    storeImageData,
    getImageData,
    getFullImageData,
    getStorageInfo
  ]);

  return (
    <MotorcycleContext.Provider value={value}>
      {children}
    </MotorcycleContext.Provider>
  );
}; 