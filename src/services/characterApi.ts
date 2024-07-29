import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharactersResponse } from '../utils/interfaces/characterInterface';

export const characterApi = createApi({
    reducerPath: 'characterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/'
    }),
    tagTypes: ['Character'],
    endpoints: (builder) => ({
        getCharacters: builder.query<CharactersResponse, { page: number, name?: string, status?: string, gender?: string, species?: string, type?: string }>({
            query: ({ page, name, status, gender, species, type }) => ({
                url: `character`,
                params: { page, name, status, gender, species, type }
            }),
            providesTags: ['Character']
        }),
        getCharacterById: builder.query<Character, number>({
            query: (id) => `character/${id}`,
            providesTags: ['Character']
        }),
    }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
