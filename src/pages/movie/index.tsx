// Import necessary modules
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem, Label, ListHeader } from "semantic-ui-react";
import { fetchMoviesDetails } from "./queryDetails";
import { fetchMovieCredits } from "./queryCredits";

// Define and export the Movie component
export const Movie = () => {
    // Get the movie ID from the URL parameters
    const { id } = useParams<string>();

    // If no ID is found in the URL parameters, display an error message
    if (!id) {
        return <div>Invalid</div>
    }

    // Use useQuery hook to fetch movie details by ID
    const { data: movieData, isLoading: isMovieLoading } = useQuery({
        queryKey: ["movie", id], // Unique key for the movie query including the movie ID
        queryFn: () => fetchMoviesDetails(id) // Function to fetch movie details
    });

    // Use useQuery hook to fetch movie credits by ID
    const { data: creditsData, isLoading: isCreditsLoading } = useQuery({
        queryKey: ["credits", id], // Unique key for the credits query including the movie ID
        queryFn: () => fetchMovieCredits(id) // Function to fetch movie credits
    });

    // Display a loading spinner if the data is still being fetched
    if (isMovieLoading || isCreditsLoading) {
        return <Loader active />;
    }

    // Render the movie details and credits
    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>
                    {movieData.title}
                </Header>
                <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
                    <Grid.Row>
                        <GridColumn width={6}>
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center", height: "100%",
                            }}>
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                                    size="medium"
                                    centered
                                />
                            </div>
                        </GridColumn>
                        <GridColumn width={10}>
                            <List>
                                <ListItem>
                                    <ListHeader>Release Date: </ListHeader>
                                    {movieData.release_date}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Genres: </ListHeader>
                                    {movieData.genres.map((genre: any) => <Label key={genre.id}>{genre.name}</Label>)}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Description: </ListHeader>
                                    {movieData.overview}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Director: </ListHeader>
                                    {creditsData.crew.find((member: any) => member.job === "Director").name ?? "N/A"}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Duration: </ListHeader>
                                    {movieData.runtime}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Rating: </ListHeader>
                                    {movieData.vote_average.toFixed(1)}
                                </ListItem>
                                <ListItem>
                                    <ListHeader>Language: </ListHeader>
                                    {movieData.original_language}
                                </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <ListHeader>Box Office: </ListHeader>
                                        ${movieData.revenue.toLocaleString()}
                                    </ListItem>
                                </ListItem>

                            </List>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
