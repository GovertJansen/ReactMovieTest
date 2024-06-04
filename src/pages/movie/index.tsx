import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem, Label, ListHeader } from "semantic-ui-react";
import { fetchMoviesDetails } from "./query";

// Define and export the Movie component
export const Movie = () => {

    // Get the movie ID from the URL parameters
    const { id } = useParams<string>();

    // If no ID is found in the URL parameters, display an error message
    if (!id) {
        return <div>Invalid</div>
    }

    // Use useQuery hook to fetch movie details by ID
    const { data, isLoading } = useQuery({
        queryKey: ["movie", id], // Unique key for the movie query including the movie ID
        queryFn: () => fetchMoviesDetails(id) // Function to fetch movie details
    });

    // Display a loading spinner if the data is still being fetched
    if (isLoading) {
        return <Loader active />;
    }

    // Render the movie details
    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>
                    {data.title}
                </Header>
                <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
                    <Grid.Row>
                        <GridColumn width={6}>
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "center", height: "100%",
                            }}>
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                    size="medium"
                                    centered
                                />
                            </div>
                        </GridColumn>
                        <GridColumn width={10}>
                            <List>
                                <ListItem>
                                    <ListHeader>Description: </ListHeader>
                                    {data.overview}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Movie For Adults:</List.Header>
                                    {data.adult ? "Yes" : "No"}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Budget: </List.Header>
                                    ${data.budget}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Genres:</List.Header>
                                    {data.genres.map((genre: any) => <Label key={genre.id}>{genre.name}</Label>)}
                                </ListItem>
                            </List>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
