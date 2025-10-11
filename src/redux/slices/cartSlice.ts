import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  description: {
    avg_rating: number;
    delivery_time: number;
    discount: number;
    discounted_price: number;
    original_price: number;
    product_name: string;
    quantity?: string;
    reviews: string;
    title: string;
  };
  images: any;
  quantity: number;
  showQuantityControls: boolean;
  category_type?: string;
}

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'Delivered' | 'Pending' | 'Cancelled';
}

interface CartState {
  items: CartItem[];
  favorites: CartItem[];
  orders: Order[];
}

const initialState: CartState = {
  items: [],
  favorites: [],
  orders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
        existing.showQuantityControls = true;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          showQuantityControls: true,
        });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          item.showQuantityControls = false;
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existing = state.favorites.find(i => i.id === item.id);
      if (existing) {
        state.favorites = state.favorites.filter(i => i.id !== item.id);
      } else {
        state.favorites.push({ ...item });
      }
    },
    clearCart: state => {
      state.items = [];
    },
    addOrderFromCart: state => {
      if (state.items.length > 0) {
        const totalAmount = state.items.reduce(
          (sum, item) =>
            sum + item.description.discounted_price * item.quantity,
          0,
        );

        const newOrder: Order = {
          id: Date.now().toString(),
          items: [...state.items],
          totalAmount,
          date: new Date().toISOString(),
          status: "Pending"
        };
        state.orders.unshift(newOrder);
        state.items=[];
      }
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  toggleFavorite,
  clearCart,
  addOrderFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
