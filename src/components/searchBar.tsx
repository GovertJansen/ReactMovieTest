import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Menu, Card, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// Interface to define the structure of the display data
interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title: string;
    vote_average: number;
    release_date: string;
    name?: string; // TV shows might use the name field instead of title
}

const SearchBar: React.FC = () => {
    // State to hold the search term entered by the user
    const [searchTerm, setSearchTerm] = useState<string>('');
    // State to hold the results fetched from the API
    const [results, setResults] = useState<DisplayData[]>([]);
    // Ref for the results container
    const resultsRef = useRef<HTMLDivElement>(null);

    // Function to handle changes in the search input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            fetchMovies(value);
        } else {
            setResults([]);
        }
    };

    // Function to handle form submission
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchTerm) {
            fetchMovies(searchTerm);
        }
    };

    // Function to fetch movies based on the search query
    const fetchMovies = (query: string) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
            }
        };

        // Fetch movies from the API
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                setResults(response.results || []);
            })
            .catch(err => console.error(err));
    };

    // Function to handle clicks outside the results container
    const handleClickOutside = (event: MouseEvent) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
            setResults([]);
        }
    };

    // Adding event listener to detect clicks outside the results container
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Menu style={{ width: '100%', maxWidth: '600px', marginBottom: '1rem' }}>
                <Menu.Item style={{ width: '100%' }}>
                    {/* Search form */}
                    <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </form>
                </Menu.Item>
            </Menu>
            {/* Display search results */}
            {results.length > 0 && (
                <div
                    ref={resultsRef}
                    style={{
                        position: 'absolute',
                        top: '120px', // Adjust based on your navbar height
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
                        maxHeight: '800px', // Increased height
                        overflowY: 'auto',
                        background: 'white',
                        zIndex: 1000,
                        padding: '1rem',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                    }}>
                    <Grid columns={3} stackable centered verticalAlign="top" padded="vertically">
                        {results.map((displayData: DisplayData) => (
                            <Grid.Column key={displayData.id} style={{ padding: '0.5rem' }}>
                                <Card.Group>
                                    <Link to={`/movie/${displayData.id}`} style={{ display: 'flex', width: '100%' }}>
                                        <Card fluid style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                            <Image
                                                src={`https://image.tmdb.org/t/p/w92${displayData.poster_path}`}
                                                wrapped
                                                ui={false}
                                                style={{ height: '138px', width: '92px', objectFit: 'cover' }} // Smaller image size
                                            />
                                            <Card.Content style={{ flex: '1 1 auto', padding: '0.5rem' }}>
                                                <Card.Header>{displayData.title}</Card.Header>
                                                <Card.Meta>
                                                    <span>Release Date: {displayData.release_date}</span>
                                                </Card.Meta>
                                                <Card.Meta>
                                                    <span>Rating: {displayData.vote_average}</span>
                                                </Card.Meta>
                                                <Card.Description>
                                                    {displayData.overview.slice(0, 150) + "..."}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </Card.Group>
                            </Grid.Column>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
