import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Category {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  type: string;
  details: string;
  quantity?: number;
  discount_code?: string;
  sport?: string;
  teamName?:string
  pairname?:string
}

export interface CartItem extends Category {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (category: Category) => void;
  addMultipleItem: (category: Category) => void;
  removeItem: (categoryId: string) => void;
  reduceItem: (categoryId: string) => void;
  clearCart: () => void;
  total: number;
  totalQuantity: number;
  getItemQuantity: (categoryId: string) => number;
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
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === category.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];

        updatedItems[existingItemIndex] = {
          ...existingItem,
          price: category.price,
          discountedPrice: category.discountedPrice,
          discount_code: category.discount_code,
          teamName:category.teamName
        };

        return updatedItems;
      } else {
        return [...prevItems, { ...category, quantity: 0 }];
      }
    });
  };

  const addMultipleItem = (category: Category) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === category.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];

        updatedItems[existingItemIndex] = {
          ...existingItem,
          price: category.price,
          discountedPrice: category.discountedPrice,
          discount_code: category.discount_code,
          teamName: category.teamName,
          quantity: existingItem.quantity + 1,
        };

        return updatedItems;
      } else {
        return [...prevItems, { ...category, quantity: 1 }];
      }
    });
  };

  const removeItem = (categoryId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== categoryId)
    );
  };

  const reduceItem = (categoryId: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === categoryId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => {
    const price = item.discountedPrice ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const getItemQuantity = (categoryId: string): number => {
    const item = items.find((item) => item.id === categoryId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        addMultipleItem,
        reduceItem,
        clearCart,
        total,
        totalQuantity,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
