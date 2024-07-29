/**
 * EpisodeAndLocationSkeletonCard Component
 *
 * The `EpisodeAndLocationSkeletonCard` component displays a skeleton placeholder for loading states in the Episode and Location views. It uses Material-UI's `Skeleton` component to render the skeleton loaders.
 *
 * This component is useful for indicating to the user that content is being loaded and will be displayed shortly.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered skeleton card component with placeholder skeletons.
 *
 * @example
 * // Usage of the EpisodeAndLocationSkeletonCard component:
 * // Import the EpisodeAndLocationSkeletonCard component and use it in your component where data is being fetched.
 * import EpisodeAndLocationSkeletonCard from './EpisodeAndLocationSkeletonCard';
 *
 * // Use the EpisodeAndLocationSkeletonCard component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <EpisodeAndLocationSkeletonCard />
 *     </div>
 *   );
 * };
 */
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
