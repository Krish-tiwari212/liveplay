import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  type: string;
  isTeamGame: boolean;
  details: string;
  quantity?: number;
}

export interface CartItem extends Category {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (category: Category) => void;
  removeItem: (categoryId: string) => void;
  reduceItem: (categoryId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (category: Category) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === category.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === category.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...category, quantity: 1 }];
    });
  };

  const removeItem = (categoryId: string) => {
    setItems((prevItems) =>
      prevItems.filter(item => item.id !== categoryId)
    );
  };

  const reduceItem = (categoryId: string) => {
    setItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === categoryId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => {
    const price = item.discountedPrice ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, reduceItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
