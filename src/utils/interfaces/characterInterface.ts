interface CharacterOrigin {
    name: string;
    url: string;
}

interface CharacterLocation {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: CharacterOrigin;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharactersResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
}