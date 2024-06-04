import { Card, Grid } from "semantic-ui-react";
import { DisplayType } from ".";
import { Link } from "react-router-dom";

// Define the interface for the data to be displayed
interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    title: string;
    vote_average: number;
    release_date: string;
    name: string;
}

// Define the interface for the component's props
interface Props {
    data: DisplayData[];
    displayType: DisplayType;
}

// Define and export the ColumnDisplay component
export const ColumnDisplay = (props: Props) => {
    const { data, displayType } = props; // Destructure props

    return (
        <Grid
            columns={3}
            stackable
            centered
            verticalAlign="top"
            padded="vertically"
        >
            {/* Map over the data array and render each item as a Grid.Column */}
            {data.map((displayData: DisplayData) => (
                <Grid.Column key={displayData.id}>
                    <Card.Group>
                        <Link to={`/${displayType === DisplayType.Movies ? "movie" : "tvshow"}/${displayData.id}`}>
                            <Card
                                fluid
                                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                                header={displayType === DisplayType.Movies
                                    ? displayData.title
                                    : displayData.name}
                                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                                description={displayData.overview.slice(0, 350) + "..."}
                            />
                        </Link>
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    );
};
