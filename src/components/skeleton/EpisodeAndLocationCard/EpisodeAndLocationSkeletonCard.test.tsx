import { render, screen } from '@testing-library/react';
import EpisodeAndLocationSkeletonCard from './EpisodeAndLocationSkeletonCard';

describe('EpisodeAndLocationSkeletonCard', () => {
    test('renders skeleton card correctly', () => {
        render(<EpisodeAndLocationSkeletonCard />);

        // Check if the skeleton elements are present
        expect(screen.getByTestId('skeleton-text1')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-text2')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-text3')).toBeInTheDocument();
    });
});
