import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isVeg: boolean;
  hasBogo?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((current) => {
      const existingItem = current.find(item => item.id === newItem.id);
      if (existingItem) {
        toast.success('Quantity updated in cart');
        return current.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${newItem.name} added to cart!`);
      return [...current, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(current => current.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      let itemTotal = item.price * item.quantity;
      // Apply Buy 1 Get 2 promo
      if (item.hasBogo && item.quantity >= 1) {
        const freeItems = Math.floor(item.quantity / 1);
        itemTotal = item.price * (item.quantity - freeItems);
      }
      return sum + itemTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
