import { render, screen } from '@testing-library/react';
import CharacterSkeletonCard from './CharacterSkeletonCard';

describe('CharacterSkeletonCard', () => {
    test('renders skeleton card correctly', () => {
        render(<CharacterSkeletonCard />);

        // Check if the skeleton elements are present
        expect(screen.getByTestId('skeleton-card-image')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-card-text1')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-card-text2')).toBeInTheDocument();
    });
});
