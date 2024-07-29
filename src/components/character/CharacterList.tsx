import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCharactersQuery } from '../../services/characterApi';
import { Grid, Card, CardMedia, CardContent, Typography, Pagination, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CharacterSkeletonCard from '../skeleton/CharacterSkeletonCard';

const CharacterList: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [name, setName] = useState(searchParams.get('name') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [gender, setGender] = useState(searchParams.get('gender') || '');
    const [species, setSpecies] = useState(searchParams.get('species') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const { data, error, isLoading, refetch } = useGetCharactersQuery({ page, name, status, gender, species, type });
    const navigate = useNavigate();

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

    const handleCardClick = (id: number) => {
        navigate(`/characters/${id}`);
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
            <form onSubmit={handleSearch}>
                <Grid container spacing={2} sx={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Type"
                            variant="outlined"
                            fullWidth
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Button variant="contained" fullWidth onClick={handleClear} sx={{ height: "100%" }}>
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
                                <CharacterSkeletonCard />
                            </Grid>
                        ))
                    }
                </>
                ) : (
                    <>
                        {data?.results.map((character) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                                <Card onClick={() => handleCardClick(character.id)}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={character.image}
                                        alt={character.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{character.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
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
            />
        </>
    );
};

export default CharacterList;
