import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as cartReducer } from "./features/CartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const unSubscribe = store.subscribe(() =>
  console.log("new state", store.getState())
);

const persistor = persistStore(store);

export { store, persistor };
