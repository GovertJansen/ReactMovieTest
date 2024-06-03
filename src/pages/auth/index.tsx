import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react'
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const navigate = useNavigate();

    // Gebruik de useMutation hook om de mutatie uit te voeren
    const { data, mutate } = useMutation({
        mutationKey: ["login"],
        mutationFn: mutationLogin,
    });

    // Functie die wordt aangeroepen wanneer de gebruiker op de login knop klikt
    const handleLogin = async () => {
        // Voer de mutatie uit
        await mutate();

        // Sla de ontvangen guest_session_id op in de local storage
        if (data && data.guest_session_id) {
            localStorage.setItem("guest_session_id", data.guest_session_id);
            console.log("guest_session_id opgeslagen:", localStorage.getItem("guest_session_id"));

            // Navigeer naar de homepagina
            navigate("/");
        } else {
            console.error("Geen geldige guest_session_id ontvangen");
        }
    };

    return (
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="violet" textAlign="center">
                    Welkom! Log in door je hieronder als gast te registreren.
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Button color='violet' size='large' fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
