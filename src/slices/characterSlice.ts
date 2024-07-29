import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store/store";
import { Character } from '../utils/interfaces/characterInterface';

export interface CharacterState {
    characters: Character[];
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
    characters: [],
    loading: false,
    error: null,
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        fetchCharactersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
            state.loading = false;
            state.characters = action.payload;
        },
        fetchCharactersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const selectCharacters = (state: RootState) => state.character;
export const { fetchCharactersStart, fetchCharactersSuccess, fetchCharactersFailure } = characterSlice.actions;
export default characterSlice.reducer;
