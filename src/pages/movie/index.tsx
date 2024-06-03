import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, GridColumn, Header, Loader, Segment, Image, List, ListItem } from "semantic-ui-react";
import { fetchMoviesDetails } from "./query";

export const Movie = () => {

    const { id } = useParams<string>();

    if (!id) {
        return <div>Ongeldig</div>
    }

    const { data, isLoading } = useQuery({
        queryKey: ["movie"],
        queryFn: () => fetchMoviesDetails(id)
    });

    if (isLoading) {
        return <Loader active />;
    }

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
                                display: "flex", alignItems: "center", justifyContent: "center", height: "100",

                            }}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                                    size="medium"
                                    centered />
                            </div>
                        </GridColumn>
                        <GridColumn width={10}>
                            <List>
                                <ListItem>
                                    <List.Header> Is Movie For Adults:</List.Header>
                                    {data.adult ? "Yes" : "No"}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Budget:</List.Header>
                                    {data.budget}
                                </ListItem>
                                <ListItem>
                                    <List.Header>Genres</List.Header>
                                    {data.genres.map((genre: any) => <List.Item key={genre.id}> {genre.name} </List.Item>)}
                                </ListItem>
                            </List>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};