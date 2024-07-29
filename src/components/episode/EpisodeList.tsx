import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import { useGetEpisodesQuery } from '../../services/episodeApi';
import EpisodeAndLocationSkeletonCard from '../skeleton/EpisodeAndLocationSkeletonCard';

const EpisodeList: React.FC = () => {

    const [page, setPage] = useState(1);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isLoading, refetch } = useGetEpisodesQuery({ page });

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [page]);

    if (error) return <div>Error fetching episodes</div>;

    return (
        <>
            <Grid container spacing={3} sx={{ marginTop: '64px' }}>
                {isLoading || showSkeleton ? (<>
                    {
                        Array.from(new Array(20)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <EpisodeAndLocationSkeletonCard />
                            </Grid>
                        ))
                    }
                </>
                ) : (
                    <>
                        {data?.results.map((episode) => (
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
            />
        </>
    );
};

export default EpisodeList;
