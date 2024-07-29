import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store/store";
import { Episode } from '../utils/interfaces/episodeInterface';

export interface EpisodeState {
    episodes: Episode[];
    loading: boolean;
    error: string | null;
}

const initialState: EpisodeState = {
    episodes: [],
    loading: false,
    error: null,
};

const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {
        fetchEpisodesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEpisodesSuccess: (state, action: PayloadAction<Episode[]>) => {
            state.loading = false;
            state.episodes = action.payload;
        },
        fetchEpisodesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const selectEpisodes = (state: RootState) => state.episode;
export const { fetchEpisodesStart, fetchEpisodesSuccess, fetchEpisodesFailure } = episodeSlice.actions;
export default episodeSlice.reducer;
