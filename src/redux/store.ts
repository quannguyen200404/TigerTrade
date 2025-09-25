import {combineReducers, configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const createDebugger = require('redux-flipper').default;

const configureCustomStore = () => {
  const rootReducer = combineReducers({
    cart: cartReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      __DEV__
        ? getDefaultMiddleware({serializableCheck: false}).concat(
            createDebugger(),
          )
        : getDefaultMiddleware({
            serializableCheck: false,
          }),
  });

  return {store};
};

export const {store} = configureCustomStore();
