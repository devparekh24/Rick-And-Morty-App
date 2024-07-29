/**
 * CharacterList Component
 *
 * The `CharacterList` component fetches and displays a list of characters with pagination, filtering, and loading states. It includes a search form with filters for name, status, gender, species, and type.
 *
 * This component:
 * - Provides a form for searching and filtering characters based on various criteria.
 * - Displays a grid of character cards, with loading skeletons shown while data is being fetched.
 * - Handles pagination and updates the URL search parameters to reflect the current page and filters.
 * - Includes error handling to reset filters and search parameters when fetching fails.
 *
 * State:
 * - `page` (number): The current page of characters being displayed, managed via URL search parameters.
 * - `name` (string): The name filter value.
 * - `status` (string): The status filter value.
 * - `gender` (string): The gender filter value.
 * - `species` (string): The species filter value.
 * - `type` (string): The type filter value.
 * - `showSkeleton` (boolean): Indicates whether to show skeleton loaders while data is loading.
 *
 * Effects:
 * - Updates the URL search parameters to reflect the current page and filters.
 * - Scrolls to the top of the page when the page or filters change.
 * - Fetches character data and updates the Redux store when the component mounts or filters/page change.
 *
 * Hooks:
 * - `useGetCharactersQuery`: Fetches character data from an API based on current filters and page.
 * - `useNavigate`: Provides a navigation function to navigate to character detail pages.
 * - `useAppDispatch`: Provides a dispatch function to update the Redux store.
 * - `useSearchParams`: Manages URL search parameters to control pagination and filters.
 *
 * Event Handlers:
 * - `handleCardClick(id: number)`: Navigates to the character detail page when a character card is clicked.
 * - `handleSearch(event: React.FormEvent)`: Handles form submission to apply filters and reset pagination.
 * - `handleClear()`: Clears all filters, resets pagination, and refetches data.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered character list component with character cards, search form, and pagination.
 *
 * @example
 * // Usage of the CharacterList component:
 * // Import the CharacterList component and use it in your component where characters need to be displayed.
 * import CharacterList from './CharacterList';
 *
 * // Use the CharacterList component.
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <CharacterList />
 *     </div>
 *   );
 * };
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../services/characterApi';
import { Grid, Card, CardMedia, CardContent, Typography, Pagination, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CharacterSkeletonCard from '../skeleton/CharacterCard/CharacterSkeletonCard';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchCharactersSuccess } from '../../slices/characterSlice';

const CharacterList: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [name, setName] = useState(searchParams.get('name') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [gender, setGender] = useState(searchParams.get('gender') || '');
    const [species, setSpecies] = useState(searchParams.get('species') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isError, isLoading, isSuccess, refetch } = useGetCharactersQuery({ page, name, status, gender, species, type });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getCharacterData = useCallback(async () => {
        try {
            await data
            if (isError) throw error;
        } catch (error) {
            console.log(error);
        }
    }, [data, isError, error]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [page, name, status, gender, species, type]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (page) params.set('page', String(page));
        if (name) params.set('name', name);
        if (status) params.set('status', status);
        if (gender) params.set('gender', gender);
        if (species) params.set('species', species);
        if (type) params.set('type', type);
        setSearchParams(params);
    }, [page, name, status, gender, species, type, setSearchParams]);

    useEffect(() => {
        getCharacterData();
        if (isSuccess) {
            dispatch(fetchCharactersSuccess(data.results));
        }
    }, [isSuccess, data?.results, dispatch, getCharacterData]);

    const handleCardClick = (id: number) => {
        navigate(`/character/${id}`);
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        setPage(1);
        refetch();
    };

    const handleClear = () => {
        setName('');
        setStatus('');
        setGender('');
        setSpecies('');
        setType('');
        setPage(1);
        setSearchParams({ page: '1' });
        refetch();
    };

    if (error) {
        handleClear();
    }

    return (
        <>
            <form onSubmit={handleSearch} data-testid="search-form">
                <Grid container spacing={2} sx={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ 'data-testid': 'name-input' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                                inputProps={{ 'data-testid': 'status-select' }}
                            >
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="alive">Alive</MenuItem>
                                <MenuItem value="dead">Dead</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gender"
                                inputProps={{ 'data-testid': 'gender-select' }}
                            >
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="genderless">Genderless</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Species"
                            variant="outlined"
                            fullWidth
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            inputProps={{ 'data-testid': 'species-input' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            fullWidth
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            inputProps={{ 'data-testid': 'type-input' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Button variant="contained" fullWidth onClick={handleClear} sx={{ height: "100%" }} data-testid="clear-button">
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={3} sx={{ marginTop: '16px' }}>
                {isLoading || showSkeleton ? (<>
                    {
                        Array.from(new Array(20)).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <CharacterSkeletonCard data-testid="character-skeleton-card" />
                            </Grid>
                        ))
                    }
                </>
                ) : (
                    <>
                        {data?.results.map((character) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id} data-testid="character-card">
                                <Card onClick={() => handleCardClick(character.id)}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={character.image}
                                        alt={character.name}
                                        data-testid="character-image"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" data-testid="character-name">{character.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" data-testid="character-species">
                                            {character.species}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </>
                )}
            </Grid>
            <Pagination
                count={data?.info.pages}
                page={page}
                onChange={(_, value) => {
                    setPage(value);
                    refetch();
                }}
                sx={{ margin: 5, display: 'flex', justifyContent: 'center' }}
                data-testid="pagination"
            />
        </>
    );
};

export default CharacterList;
