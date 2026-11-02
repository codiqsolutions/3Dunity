import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';

export interface CartItem {
  id: string; // Composite unique key: productId + material + color + size + customText
  product: Product;
  quantity: number;
  selectedMaterial: string;
  selectedColor: string;
  selectedSize?: string;
  customDimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
  customText?: string;
  uploadedFiles?: string[];
  price: number;
}

export interface AddItemConfig {
  quantity?: number;
  material?: string;
  color?: string;
  size?: string;
  customDimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
  customText?: string;
  uploadedFiles?: string[];
  unitPrice?: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    quantityOrConfig?: number | AddItemConfig,
    material?: string,
    color?: string
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '3dunity_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to sync cart to localStorage:', err);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    product: Product,
    quantityOrConfig?: number | AddItemConfig,
    legacyMaterial?: string,
    legacyColor?: string
  ) => {
    let quantity = 1;
    let material = product.specs?.availableMaterials?.[0] || 'Standard PLA';
    let color = product.specs?.colors?.[0]?.name || 'White';
    let size: string | undefined = undefined;
    let customDimensions: any = undefined;
    let customText: string | undefined = undefined;
    let uploadedFiles: string[] | undefined = undefined;
    let unitPrice = product.price;

    if (typeof quantityOrConfig === 'object' && quantityOrConfig !== null) {
      quantity = quantityOrConfig.quantity || 1;
      if (quantityOrConfig.material) material = quantityOrConfig.material;
      if (quantityOrConfig.color) color = quantityOrConfig.color;
      if (quantityOrConfig.size) size = quantityOrConfig.size;
      if (quantityOrConfig.customDimensions) customDimensions = quantityOrConfig.customDimensions;
      if (quantityOrConfig.customText) customText = quantityOrConfig.customText;
      if (quantityOrConfig.uploadedFiles) uploadedFiles = quantityOrConfig.uploadedFiles;
      if (typeof quantityOrConfig.unitPrice === 'number') {
        unitPrice = quantityOrConfig.unitPrice;
      }
    } else {
      quantity = typeof quantityOrConfig === 'number' ? quantityOrConfig : 1;
      if (legacyMaterial) material = legacyMaterial;
      if (legacyColor) color = legacyColor;
    }

    const itemId = `${product._id}-${size || 'std'}-${material}-${color}-${customText || 'none'}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedMaterial: material,
          selectedColor: color,
          selectedSize: size,
          customDimensions,
          customText,
          uploadedFiles,
          price: unitPrice,
        },
      ];
    });

    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

