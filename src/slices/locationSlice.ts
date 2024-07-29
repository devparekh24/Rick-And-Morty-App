import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store/store";
import { Location } from '../utils/interfaces/locationInterface';

export interface LocationState {
    locations: Location[];
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    locations: [],
    loading: false,
    error: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        fetchLocationsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchLocationsSuccess: (state, action: PayloadAction<Location[]>) => {
            state.loading = false;
            state.locations = action.payload;
        },
        fetchLocationsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const selectLocations = (state: RootState) => state.location;
export const { fetchLocationsStart, fetchLocationsSuccess, fetchLocationsFailure } = locationSlice.actions;
export default locationSlice.reducer;
