import { render, screen } from '@testing-library/react';
import CharacterDetailsSkeletonCard from './CharacterDetailsSkeletonCard';

describe('CharacterDetailsSkeletonCard', () => {
    test('renders skeleton card correctly', () => {
        render(<CharacterDetailsSkeletonCard />);

        // Check if the skeleton elements are present
        expect(screen.getByTestId('skeleton-image')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-title')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-subtitle1')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-subtitle2')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-detail1')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-detail2')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-detail3')).toBeInTheDocument();
        expect(screen.getByTestId('skeleton-footer')).toBeInTheDocument();
    });
});
