import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const CharacterSkeletonCard: React.FC = () => {
    return (
        <Card>
            <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                data-testid="skeleton-card-image"
            />
            <CardContent>
                <Skeleton
                    variant="text"
                    width="80%"
                    data-testid="skeleton-card-text1"
                />
                <Skeleton
                    variant="text"
                    width="60%"
                    data-testid="skeleton-card-text2"
                />
            </CardContent>
        </Card>
    );
};

export default CharacterSkeletonCard;
