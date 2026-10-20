import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;      
  name: string;
  price: number;
  quantity: number;
}
interface CartState {
  items: CartItem[]; 
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',   
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<{ id: number; name: string; price: number }>) => {

      const found = state.items.find(i => i.id === action.payload.id);
      if (found) {
        found.quantity += 1; 
      } else {

        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        const found = state.items.find(i => i.id === id);
        if (found) found.quantity = quantity; 
      }
    },

    clearCart: (state) => {
      state.items = []; 
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;