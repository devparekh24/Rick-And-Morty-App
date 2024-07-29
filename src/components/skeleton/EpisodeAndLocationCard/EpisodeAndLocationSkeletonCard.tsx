import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const EpisodeAndLocationSkeletonCard: React.FC = () => {
    return (
        <Card>
            <CardContent>
                <Skeleton
                    variant="text"
                    width="80%"
                    data-testid="skeleton-text1"
                />
                <Skeleton
                    variant="text"
                    width="40%"
                    data-testid="skeleton-text2"
                />
                <Skeleton
                    variant="text"
                    width="60%"
                    data-testid="skeleton-text3"
                />
            </CardContent>
        </Card>
    );
};

export default EpisodeAndLocationSkeletonCard;
