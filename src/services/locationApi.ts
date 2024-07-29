import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location, LocationsResponse } from '../utils/interfaces/locationInterface';

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/'
    }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
        getLocations: builder.query<LocationsResponse, { page: number }>({
            query: ({ page }) => `location?page=${page}`,
            providesTags:['Location']
        }),
        getLocationById: builder.query<Location, number>({
            query: (id) => `location/${id}`,
            providesTags: ['Location']
        }),
    }),
});

export const { useGetLocationsQuery, useGetLocationByIdQuery } = locationApi;
