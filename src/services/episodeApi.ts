import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Episode, EpisodesResponse } from '../utils/interfaces/episodeInterface';

export const episodeApi = createApi({
    reducerPath: 'episodeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/'
    }),
    tagTypes: ['Episode'],
    endpoints: (builder) => ({
        getEpisodes: builder.query<EpisodesResponse, { page: number }>({
            query: ({ page }) => `episode?page=${page}`,
            providesTags: ['Episode']
        }),
        getEpisodeById: builder.query<Episode, number>({
            query: (id) => `episode/${id}`,
            providesTags: ['Episode']
        }),
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
});

export const { useGetEpisodesQuery, useGetEpisodeByIdQuery } = episodeApi;
