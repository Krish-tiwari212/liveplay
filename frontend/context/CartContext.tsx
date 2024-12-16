import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Category {
  id?: number;
  category_name?: string;
  total_quantity?: string;
  max_ticket_quantity?: string;
  price?: number;
  ticket_description?: string;
  discount_code?: string;
  discount?: boolean;
  category_type?: string;
  discountType?: string;
  number_of_discounts?: string;
  from_date?: string;
  till_date?: string;
  discount_value: number;
  percentage_input?: string;
  amount_input?: string;
  gender?: string;
  age_from?: string;
  age_to?: string;
  ageRangeOption?: string;
  max_teams_size?: number;
  sport?: string;
  teamName?: string;
  pairname?: string;
}

export interface CartItem extends Category {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (category: Category) => void;
  addMultipleItem: (category: Category) => void;
  removeItem: (categoryId: number) => void;
  reduceItem: (categoryId: number) => void;
  clearCart: () => void;
  total: number;
  totalQuantity: number;
  getItemQuantity: (categoryId: number) => number;
  isCheckboxChecked: boolean;
  setIsCheckboxChecked: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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
          amount_input: category.amount_input,
          discount_code: category.discount_code,
          teamName: category.teamName,
          pairname: category.pairname,
        };

        return updatedItems;
      } else {
        return [...prevItems, { ...category, quantity: 1 }];
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
          amount_input: category.amount_input,
          discount_code: category.discount_code,
          teamName: category.teamName,
          quantity: existingItem.quantity + 1,
        };

        return updatedItems;
      } else {
        return [...prevItems, { ...category, quantity: 0 }];
      }
    });
  };

  const removeItem = (categoryId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== categoryId)
    );
  };

  const reduceItem = (categoryId: number) => {
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
    const price = item.discount_value ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const getItemQuantity = (categoryId: number): number => {
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
        isCheckboxChecked,
        setIsCheckboxChecked
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
