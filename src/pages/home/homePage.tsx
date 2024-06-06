import { useState } from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { MovieColumnDisplay } from './Movies/movieColumnDisplay';
import { TVShowColumnDisplay } from './tvShows/tvShowColumnDisplay';
import { fetchMovies } from './Movies/queryPopularMovies';
import { fetchTvShows } from './tvShows/queryPopularTvShows';

import { useQuery } from '@tanstack/react-query';
import SearchBar from '../../components/searchBar';

// Define an enumeration for display types
export enum DisplayType {
    Movies = 'movies',
    TvShows = 'tvshows',
}

// Define and export the Home component
export const Home = () => {
    // Initialize state for displayType, default is DisplayType.Movies
    const [displayType, setDisplayType] = useState<DisplayType>(
        DisplayType.Movies
    );

    // Use useQuery hook to fetch movies data
    const { data: movieData, isLoading: isLoadingMovies } = useQuery({
        queryKey: ["movies"], // Unique key for the movies query
        queryFn: fetchMovies // Function to fetch movies data
    });

    // Use useQuery hook to fetch TV shows data
    const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
        queryKey: ["tvshows"], // Unique key for the TV shows query
        queryFn: fetchTvShows // Function to fetch TV shows data
    });

    // Show loading indicator if either movies or TV shows are loading
    if (isLoadingMovies || isLoadingTvShows) {
        return <Loader active>Loading...</Loader>;
    }

    return (
        <div style={{ marginTop: 50, height: "auto" }}>
            {/* Search bar */}
            <SearchBar />

            <Button.Group>
                <Button
                    color={displayType === DisplayType.Movies ? "blue" : undefined}
                    onClick={() => setDisplayType(DisplayType.Movies)}
                >
                    Movies
                </Button>
                <Button
                    color={displayType === DisplayType.TvShows ? "blue" : undefined}
                    onClick={() => setDisplayType(DisplayType.TvShows)}
                >
                    TV Shows
                </Button>
            </Button.Group>

            {/* Conditionally render MovieColumnDisplay or TVShowColumnDisplay based on displayType */}
            <div style={{ marginTop: 20 }}>
                {displayType === DisplayType.Movies ? (
                    <MovieColumnDisplay data={movieData.results} />
                ) : (
                    <TVShowColumnDisplay data={tvShowData.results} />
                )}
            </div>
        </div>
    );
};
