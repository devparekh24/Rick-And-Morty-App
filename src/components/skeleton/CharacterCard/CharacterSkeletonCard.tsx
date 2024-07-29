/**
 * CharacterSkeletonCard Component
 *
 * The `CharacterSkeletonCard` component displays a skeleton placeholder for character cards while data is being loaded. It uses Material-UI's `Skeleton` component to render placeholders for the card's image and text content.
 *
 * Layout:
 * - A rectangular skeleton for the card's image.
 * - Text skeletons for the card's title and additional information.
 *
 * This component provides a visual indication that content is being fetched, improving the user experience during loading states.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered skeleton card component with placeholders for character data.
 *
 * @example
 * // Usage of the CharacterSkeletonCard component:
 * // Import the CharacterSkeletonCard component and use it in your component where character data is being fetched.
 * import CharacterSkeletonCard from './CharacterSkeletonCard';
 *
 * // Use the CharacterSkeletonCard component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <CharacterSkeletonCard />
 *     </div>
 *   );
 * };
 */
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
