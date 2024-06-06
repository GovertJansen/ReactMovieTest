import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem, Label } from "semantic-ui-react";
import { fetchTvShowDetails } from "./queryTvShowDetails";

// Define and export the TvShow component
export const TvShow = () => {

    // Get the TV show ID from the URL parameters
    const { id } = useParams<string>();

    // If no ID is found in the URL parameters, display an error message
    if (!id) {
        return <div>Invalid ID</div>
    }

    // Use useQuery hook to fetch TV show details by ID
    const { data, isLoading } = useQuery({
        queryKey: ["tvshow", id], // Unique key for the TV show query including the TV show ID
        queryFn: () => fetchTvShowDetails(id) // Function to fetch TV show details
    });

    // Display a loading spinner if the data is still being fetched
    if (isLoading) {
        return <Loader active />;
    }

    // Render the TV show details
    return (
        <div style={{ marginTop: 50 }}>
            <Segment>
                <Header>
                    {data.name}
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
                                    <List.Header>Release Date: </List.Header>
                                    {data.first_air_date}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Genres: </List.Header>
                                    {data.genres.map((genre: any) => <Label key={genre.id}>{genre.name}</Label>)}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Description: </List.Header>
                                    {data.overview || "N/A"}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Seasons: </List.Header>
                                    {data.number_of_seasons}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Episodes: </List.Header>
                                    {data.number_of_episodes}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Rating: </List.Header>
                                    {data.vote_average.toFixed(1)}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Language: </List.Header>
                                    {data.original_language}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Networks: </List.Header>
                                    {data.networks.map((network: any) => (
                                        <Image
                                            key={network.id}
                                            src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                                            size="small"
                                            style={{ marginRight: 10 }}
                                        />
                                    ))}
                                </ListItem>
                            </List>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};
