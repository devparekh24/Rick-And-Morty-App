/**
 * EpisodeList Component
 *
 * The `EpisodeList` component fetches and displays a list of episodes with pagination and loading states. It utilizes Material-UI's `Grid`, `Card`, and `Pagination` components to render the UI.
 * 
 * This component includes:
 * - A grid layout for displaying episode cards.
 * - Skeleton loaders to indicate loading state while fetching data.
 * - Pagination controls to navigate between pages of episodes.
 * - Error handling to display an error message if the data fetch fails.
 *
 * State:
 * - `page` (number): The current page of episodes being displayed, managed via URL search parameters.
 * - `showSkeleton` (boolean): Indicates whether to show skeleton loaders while data is loading.
 *
 * Effects:
 * - Updates the URL search parameters to reflect the current page.
 * - Scrolls to the top of the page when the page changes.
 * - Fetches episode data and updates the Redux store when the component mounts or the page changes.
 *
 * Hooks:
 * - `useGetEpisodesQuery`: Fetches episode data from an API based on the current page.
 * - `useAppDispatch`: Provides a dispatch function to update the Redux store.
 * - `useSearchParams`: Manages URL search parameters to control pagination.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered episode list component with episode cards, pagination, and loading skeletons.
 *
 * @example
 * // Usage of the EpisodeList component:
 * // Import the EpisodeList component and use it in your component where episodes need to be displayed.
 * import EpisodeList from './EpisodeList';
 *
 * // Use the EpisodeList component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <EpisodeList />
 *     </div>
 *   );
 * };
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import { useGetEpisodesQuery } from '../../services/episodeApi';
import EpisodeAndLocationSkeletonCard from '../skeleton/EpisodeAndLocationCard/EpisodeAndLocationSkeletonCard';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchEpisodesSuccess } from '../../slices/episodeSlice';
import { useSearchParams } from 'react-router-dom';

const EpisodeList: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isError, isLoading, isSuccess, refetch } = useGetEpisodesQuery({ page });
    const dispatch = useAppDispatch();

    const getEpisodeData = useCallback(async () => {
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
        getEpisodeData();
        if (isSuccess) {
            dispatch(fetchEpisodesSuccess(data.results));
        }
    }, [isSuccess, data?.results, getEpisodeData, dispatch]);

    if (error) return <div data-testid="error-message">Error fetching episodes</div>;

    return (
        <>
            <Grid container spacing={3} sx={{ marginTop: '64px' }} data-testid="episode-grid">
                {isLoading || showSkeleton ? (<>
                    {
                        Array.from(new Array(20)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <EpisodeAndLocationSkeletonCard data-testid={`skeleton-card-${index}`} />
                            </Grid>
                        ))
                    }
                </>
                ) : (
                    <>
                        {data?.results.map((episode) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={episode.id}>
                                <Card sx={{ height: '100%' }} data-testid={`episode-card-${episode.id}`}>
                                    <CardContent>
                                        <Typography variant="h6" data-testid={`episode-name-${episode.id}`}>{episode.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" data-testid={`episode-episode-${episode.id}`}>
                                            {episode.episode}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" data-testid={`episode-air-date-${episode.id}`}>
                                            {episode.air_date}
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

export default EpisodeList;
