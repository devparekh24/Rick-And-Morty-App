import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const EpisodeAndLocationSkeletonCard: React.FC = () => {
    return (
        <Card>
            <CardContent>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
            </CardContent>
        </Card>
    );
};

export default EpisodeAndLocationSkeletonCard;
