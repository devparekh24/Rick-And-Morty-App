import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const CharacterSkeletonCard: React.FC = () => {
    return (
        <Card>
            <Skeleton variant="rectangular" width="100%" height={300} />
            <CardContent>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
            </CardContent>
        </Card>
    );
};

export default CharacterSkeletonCard;
