import {createSlice} from '@reduxjs/toolkit';
import { TProduct } from '../../types/object';

const initialState: TProduct[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      const {id} = action.payload;
      const existingItem = state.find(item => item.id === id);
      if (existingItem) {
        return state.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1};
          }
          return item;
        });
      }
      return [...state, action.payload];
    },
    increase(state, action) {
      const {id, count} = action.payload;
      const existingItem = state.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = (existingItem?.quantity || 0) + count;
      } else {
        state.push({...action.payload, quantity: count});
      }
    },
    decrease(state, action) {
      const {id} = action.payload;
      const existingItem = state.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        }
      }
    },
    remove(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const {add, increase, decrease, remove} = cartSlice.actions;

export default cartSlice.reducer;
