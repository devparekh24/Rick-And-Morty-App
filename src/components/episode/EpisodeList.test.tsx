import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { episodeApi } from '../../services/episodeApi';
import EpisodeList from './EpisodeList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            [episodeApi.reducerPath]: episodeApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(episodeApi.middleware),
    });

    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    );
};

describe('EpisodeList', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders episodes on successful data fetch', async () => {
        const episodeData = {
            results: [
                { id: 1, name: 'Episode 1', episode: 'S01E01', air_date: '2024-01-01' },
                { id: 2, name: 'Episode 2', episode: 'S01E02', air_date: '2024-01-08' }
            ],
            info: { pages: 1 }
        };

        fetchMock.mockResponseOnce(JSON.stringify(episodeData));

        renderWithProviders(<EpisodeList />);

        await waitFor(() => {
            expect(screen.getByText('Episode 1')).toBeInTheDocument();
            expect(screen.getByText('Episode 2')).toBeInTheDocument();
        });
    });

    test('handles error gracefully', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        renderWithProviders(<EpisodeList />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching episodes')).toBeInTheDocument();
        });
    });
});
