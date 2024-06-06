import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Define the interface for the data to be displayed
interface DisplayData {
    id: number;
    overview: string;
    poster_path: string;
    name: string;
    vote_average: number;
    first_air_date: string;
}

// Define the interface for the component's props
interface Props {
    data: DisplayData[];
}

// Define and export the TVShowColumnDisplay component
export const TVShowColumnDisplay = (props: Props) => {
    const { data } = props; // Destructure props

    return (
        <Grid
            columns={4}
            stackable
            centered
            verticalAlign="top"
            padded="vertically"
        >
            {/* Map over the data array and render each item as a Grid.Column */}
            {data.map((displayData: DisplayData) => (
                <Grid.Column key={displayData.id}>
                    <Card.Group>
                        <Link to={`/tvshow/${displayData.id}`}>
                            <Card
                                fluid
                                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                                header={displayData.name}
                                meta={`First Air Date: ${displayData.first_air_date} | Rating: ${displayData.vote_average}`}
                                description={displayData.overview.slice(0, 250) + "..."}
                            />
                        </Link>
                    </Card.Group>
                </Grid.Column>
            ))}
        </Grid>
    );
};
