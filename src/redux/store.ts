import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moviesReducer from './slices/moviesSlice';
import configReducer from './slices/configSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['movies', 'config'],
};

const rootReducer = combineReducers({
    movies: moviesReducer,
    config: configReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
