/**
 * LocationList Component
 *
 * The `LocationList` component fetches and displays a list of locations with pagination and loading states. It utilizes Material-UI's `Grid`, `Card`, and `Pagination` components to render the UI. 
 * It includes:
 * - A grid layout to display location cards.
 * - Skeleton loaders displayed while data is being fetched.
 * - Pagination controls to navigate through different pages of locations.
 * - Error handling to display a message if the data fetch fails.
 *
 * State:
 * - `page` (number): The current page of locations being displayed, controlled via URL search parameters.
 * - `showSkeleton` (boolean): Indicates whether to show skeleton loaders while data is loading.
 *
 * Effects:
 * - Updates the page number in URL search parameters when the page changes.
 * - Fetches location data and updates the Redux store when the component mounts or page changes.
 * - Smoothly scrolls to the top of the page when the page changes.
 *
 * Hooks:
 * - `useGetLocationsQuery`: Fetches location data from an API based on the current page.
 * - `useAppDispatch`: Provides a dispatch function to update the Redux store.
 * - `useSearchParams`: Manages URL search parameters to control pagination.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered location list component with location cards, pagination, and loading skeletons.
 *
 * @example
 * // Usage of the LocationList component:
 * // Import the LocationList component and use it in your component where locations need to be displayed.
 * import LocationList from './LocationList';
 *
 * // Use the LocationList component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <LocationList />
 *     </div>
 *   );
 * };
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import EpisodeAndLocationSkeletonCard from '../skeleton/EpisodeAndLocationCard/EpisodeAndLocationSkeletonCard';
import { useGetLocationsQuery } from '../../services/locationApi';
import { fetchLocationsSuccess } from '../../slices/locationSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { useSearchParams } from 'react-router-dom';

const LocationList: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isError, isLoading, isSuccess, refetch } = useGetLocationsQuery({ page });
    const dispatch = useAppDispatch();

    const getLocationData = useCallback(async () => {
        try {
            await data
            if (isError) throw error;
        } catch (error) {
            console.log(error);
        }
    }, [data, isError, error]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [page]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (page) params.set('page', String(page));
        setSearchParams(params);
    }, [page, setSearchParams]);

    useEffect(() => {
        getLocationData();
        if (isSuccess) {
            dispatch(fetchLocationsSuccess(data.results));
        }
    }, [isSuccess, data?.results, getLocationData, dispatch]);

    if (error) return <div data-testid="error-message">Error fetching locations</div>;

    return (
        <>
            <Grid container spacing={3} sx={{ marginTop: '64px' }} data-testid="location-grid">
                {isLoading || showSkeleton ? (<>
                    {Array.from(new Array(20)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <EpisodeAndLocationSkeletonCard data-testid={`skeleton-card-${index}`} />
                        </Grid>
                    ))}
                </>
                ) : (
                    <>
                        {data?.results.map((location) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
                                <Card sx={{ height: '100%' }} data-testid={`location-card-${location.id}`}>
                                    <CardContent>
                                        <Typography variant="h6" data-testid={`location-name-${location.id}`}>{location.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" data-testid={`location-type-${location.id}`}>
                                            {location.type}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" data-testid={`location-dimension-${location.id}`}>
                                            {location.dimension}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
            <Pagination
                count={data?.info.pages}
                page={page}
                onChange={(_, value) => {
                    setPage(value);
                    refetch();
                }}
                sx={{ margin: 5, display: 'flex', justifyContent: 'center' }}
                data-testid="pagination"
            />
        </>
    );
};

export default LocationList;
