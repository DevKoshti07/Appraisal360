import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
    whitelist: ['value', 'email', 'password', 'isLogged', 'isRemember']
}

const persistedReducer = persistReducer(persistConfig, authSlice)

const additionalMiddleware = (store: any) => (next: any) => (action: any) => {
    // Middleware logic
    return next(action);
};

const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(additionalMiddleware), // Add multiple middleware
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;