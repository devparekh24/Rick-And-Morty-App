/**
 * CharacterDetailsSkeletonCard Component
 *
 * The `CharacterDetailsSkeletonCard` component provides a skeleton placeholder for loading states in the character details view. It uses Material-UI's `Skeleton` component to render placeholders for various parts of the character details card.
 *
 * This component is designed to be displayed while data is being fetched, giving users a visual indication that content is loading.
 *
 * Layout:
 * - A rectangular skeleton for an image.
 * - Skeletons for title, subtitles, details, and footer, displayed within a card layout.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered skeleton card component with placeholders for character details.
 *
 * @example
 * // Usage of the CharacterDetailsSkeletonCard component:
 * // Import the CharacterDetailsSkeletonCard component and use it in your component where character details are being fetched.
 * import CharacterDetailsSkeletonCard from './CharacterDetailsSkeletonCard';
 *
 * // Use the CharacterDetailsSkeletonCard component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <CharacterDetailsSkeletonCard />
 *     </div>
 *   );
 * };
 */
import React from 'react';
import { Card, CardContent, Skeleton, Grid, Typography } from '@mui/material';

const CharacterDetailsSkeletonCard: React.FC = () => {
    return (
        <Card sx={{ marginTop: 12 }}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={"368px"}
                        data-testid="skeleton-image"
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <CardContent>
                        <Typography variant="h3" component="div">
                            <Skeleton
                                width="80%"
                                data-testid="skeleton-title"
                            />
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ marginTop: '10px' }}>
                            <Skeleton
                                width="40%"
                                data-testid="skeleton-subtitle1"
                            />
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ marginTop: '10px' }}>
                            <Skeleton
                                width="40%"
                                data-testid="skeleton-subtitle2"
                            />
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ marginTop: '10px' }}>
                            <Skeleton
                                width="30%"
                                data-testid="skeleton-detail1"
                            />
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ marginTop: '15px' }}>
                            <Skeleton
                                width="50%"
                                data-testid="skeleton-detail2"
                            />
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ marginTop: '17px' }}>
                            <Skeleton
                                width="50%"
                                data-testid="skeleton-detail3"
                            />
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div" sx={{ marginTop: '22px' }}>
                            <Skeleton
                                width="30%"
                                data-testid="skeleton-footer"
                            />
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CharacterDetailsSkeletonCard;
