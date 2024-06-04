import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';
import { fetchMovies, fetchTvShows } from './query';
import { useQuery } from '@tanstack/react-query';

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

    return (
        <div style={{ marginTop: 50, height: "auto" }}>
            <div>test</div>
            {" "}
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

            {/* Show loading indicator if either movies or TV shows are loading */}
            {isLoadingMovies || isLoadingTvShows ? (
                <div>Loading...</div>
            ) : (
                <div style={{ marginTop: 20 }}>
                    {/* Conditionally render ColumnDisplay based on displayType */}
                    {displayType === DisplayType.Movies ? (
                        <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
                    ) : (
                        <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows} />
                    )}
                </div>
            )}
        </div>
    );
}
