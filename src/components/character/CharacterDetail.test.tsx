import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { characterApi } from '../../services/characterApi';
import CharacterDetail from './CharacterDetail';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            [characterApi.reducerPath]: characterApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(characterApi.middleware),
    });

    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    );
};

describe('CharacterDetail', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders error message on error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        renderWithProviders(<CharacterDetail />);

        await waitFor(() => {
            expect(screen.getByText('Failed to load character data.')).toBeInTheDocument();
        });
    });

    test('renders character details and episodes on success', async () => {
        const characterData = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'Earth (C-137)' },
            location: { name: 'Earth (Replacement Dimension)' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
            ],
            created: '2017-11-04T18:48:46.250Z',
        };

        const episodeData = [
            { id: 1, name: 'Pilot', episode: 'S01E01', air_date: 'December 2, 2013' },
            { id: 2, name: 'Lawnmower Dog', episode: 'S01E02', air_date: 'December 9, 2013' },
        ];

        fetchMock
            .mockResponseOnce(JSON.stringify(characterData))
            .mockResponseOnce(JSON.stringify(episodeData[0]))
            .mockResponseOnce(JSON.stringify(episodeData[1]));

        renderWithProviders(<CharacterDetail />);

        await waitFor(() => {
            expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
            expect(screen.getByText('Status: Alive')).toBeInTheDocument();
            expect(screen.getByText('Species: Human')).toBeInTheDocument();
            expect(screen.getByText('Gender: Male')).toBeInTheDocument();
            expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
            expect(screen.getByText('Location: Earth (Replacement Dimension)')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Pilot')).toBeInTheDocument();
            expect(screen.getByText('S01E01')).toBeInTheDocument();
            expect(screen.getByText('December 2, 2013')).toBeInTheDocument();

            expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
            expect(screen.getByText('S01E02')).toBeInTheDocument();
            expect(screen.getByText('December 9, 2013')).toBeInTheDocument();
        });
    });

});
