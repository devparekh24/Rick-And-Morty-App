import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { locationApi } from '../../services/locationApi';
import LocationList from './LocationList';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            [locationApi.reducerPath]: locationApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(locationApi.middleware),
    });

    return render(
        <Provider store={store}>
            <Router>{ui}</Router>
        </Provider>
    );
};

describe('LocationList', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders locations on successful data fetch', async () => {
        const locationData = {
            results: [
                { id: 1, name: 'Location 1', type: 'Type A', dimension: 'Dimension X' },
                { id: 2, name: 'Location 2', type: 'Type B', dimension: 'Dimension Y' }
            ],
            info: { pages: 1 }
        };

        fetchMock.mockResponseOnce(JSON.stringify(locationData));

        renderWithProviders(<LocationList />);

        await waitFor(() => {
            expect(screen.getByText('Location 1')).toBeInTheDocument();
            expect(screen.getByText('Location 2')).toBeInTheDocument();
        });
    });

    test('handles error gracefully', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        renderWithProviders(<LocationList />);

        await waitFor(() => {
            expect(screen.getByText('Error fetching locations')).toBeInTheDocument();
        });
    });
});
