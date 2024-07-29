import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import EpisodeAndLocationSkeletonCard from '../skeleton/EpisodeAndLocationSkeletonCard';
import { useGetLocationsQuery } from '../../services/locationApi';
import { fetchLocationsSuccess } from '../../slices/locationSlice';
import { useAppDispatch } from '../../hooks/hooks';

const LocationList: React.FC = () => {

    const [page, setPage] = useState(1);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isLoading, isSuccess, refetch } = useGetLocationsQuery({ page });
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [page]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(fetchLocationsSuccess(data.results));
        }
    }, [isSuccess, data?.results, dispatch]);

    if (error) return <div>Error fetching locations</div>;

    return (
        <>
            <Grid container spacing={3} sx={{ marginTop: '64px' }}>
                {isLoading || showSkeleton ? (<>
                    {Array.from(new Array(20)).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <EpisodeAndLocationSkeletonCard />
                        </Grid>
                    ))}
                </>
                ) : (
                    <>
                        {data?.results.map((location) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={location.id}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">{location.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {location.type}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
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
            />
        </>
    );
};

export default LocationList;
