import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { characterApi } from '../services/characterApi';
import characterReducer from '../slices/characterSlice';
import { episodeApi } from '../services/episodeApi';
import episodeReducer from '../slices/episodeSlice';
import { locationApi } from '../services/locationApi';
import locationReducer from '../slices/locationSlice';

export const store = configureStore({
    reducer: {
        character: characterReducer,
        [characterApi.reducerPath]: characterApi.reducer,
        episode: episodeReducer,
        [episodeApi.reducerPath]: episodeApi.reducer,
        location: locationReducer,
        [locationApi.reducerPath]: locationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            characterApi.middleware,
            episodeApi.middleware,
            locationApi.middleware,
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);