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
