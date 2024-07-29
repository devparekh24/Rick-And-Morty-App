/**
 * CharacterDetail Component
 *
 * The `CharacterDetail` component fetches and displays detailed information about a single character, including their image, name, status, species, gender, origin, location, and creation date. It also fetches and displays a list of episodes in which the character appeared.
 *
 * This component:
 * - Fetches character details and episodes based on the character ID from the URL parameters.
 * - Displays a skeleton loading state while data is being fetched.
 * - Handles errors and loading states gracefully.
 * - Provides detailed information about the character and a list of episodes.
 *
 * State:
 * - `episodes` (Episode[]): An array of episodes in which the character appeared.
 * - `showSkeleton` (boolean): Indicates whether to show skeleton loaders while data is loading.
 *
 * Effects:
 * - Scrolls to the top of the page when the component mounts or data changes.
 * - Fetches character details and episode data when the component mounts or the character ID changes.
 *
 * Hooks:
 * - `useParams`: Extracts the character ID from the URL parameters.
 * - `useGetCharacterByIdQuery`: Fetches character data by ID from the API.
 * - `useState`: Manages local state for episodes and loading state.
 * - `useEffect`: Handles side effects for data fetching and skeleton display.
 * - `useCallback`: Memoizes functions to avoid unnecessary re-renders.
 *
 * Event Handlers:
 * - `getCharacterDataById()`: Fetches character data and handles errors.
 * - `getEpisodes()`: Fetches episode data and updates the state.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered character detail component with character information and episodes list.
 *
 * @example
 * // Usage of the CharacterDetail component:
 * // Import the CharacterDetail component and use it in a route to display details of a specific character.
 * import CharacterDetail from './CharacterDetail';
 *
 * // Use the CharacterDetail component within a Router setup.
 * const MyApp = () => {
 *   return (
 *     <Routes>
 *       <Route path="/character/:id" element={<CharacterDetail />} />
 *     </Routes>
 *   );
 * };
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useGetCharacterByIdQuery } from '../../services/characterApi';
import { Episode } from '../../utils/interfaces/episodeInterface';
import EpisodeAndLocationSkeletonCard from '../skeleton/EpisodeAndLocationCard/EpisodeAndLocationSkeletonCard';
import CharacterDetailsSkeletonCard from '../skeleton/CharacterDetailsCard/CharacterDetailsSkeletonCard';

const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isError, isLoading } = useGetCharacterByIdQuery(parseInt(id!));
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const getCharacterDataById = useCallback(async () => {
        try {
            await data
            if (isError) throw error;
        } catch (error) {
            console.log(error);
        }
    }, [data, isError, error]);

    const getEpisodes = useCallback(async () => {
        if (data) {
            const episodePromises = data.episode.map((epUrl) => {
                const episodeId = epUrl.split('/').pop();
                return fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`).then((res) => res.json());
            });

            const episodeData = await Promise.all(episodePromises);
            setEpisodes(episodeData);
            setShowSkeleton(false);
        }
    }, [data]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [data])

    useEffect(() => {
        getCharacterDataById();
        getEpisodes();
    }, [getCharacterDataById, getEpisodes]);

    if (isLoading || showSkeleton) {
        return <CharacterDetailsSkeletonCard data-testid="character-details-skeleton" />;
    }

    if (isError || error) {
        return <Typography variant="h6" color="error">Failed to load character data.</Typography>;
    }

    if (!data) {
        return <Typography variant="h6">Character not found.</Typography>;
    }

    return (
        <Container>
            <Card sx={{ marginTop: 12 }}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <CardMedia
                            component="img"
                            height="368px"
                            image={data.image}
                            alt={data.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <CardContent>
                            <Typography variant="h3" component="div">
                                {data.name}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ marginTop: '10px' }}>
                                Status: {data.status}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ marginTop: '10px' }}>
                                Species: {data.species}
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
                                Gender: {data.gender}
                            </Typography>
                            <Typography variant="body1" component="div" sx={{ marginTop: '15px' }}>
                                Origin: {data.origin.name}
                            </Typography>
                            <Typography variant="body1" component="div" sx={{ marginTop: '17px' }}>
                                Location: {data.location.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="div" sx={{ marginTop: '22px' }}>
                                Created: {new Date(data.created).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            <Typography variant="h4" component="div" sx={{ margin: 4, display: 'flex', justifyContent: 'center' }}>
                Episodes
            </Typography>
            <Grid container spacing={3}>
                {showSkeleton
                    ? Array.from(new Array(20)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <EpisodeAndLocationSkeletonCard data-testid="episode-skeleton" />
                        </Grid>
                    ))
                    : episodes.map((episode) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={episode.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">{episode.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {episode.episode}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {episode.air_date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default CharacterDetail;
