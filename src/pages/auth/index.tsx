import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

// Define and export the Auth component
export const Auth = () => {
    const navigate = useNavigate(); // Initialize useNavigate to programmatically navigate between routes

    // Use the useMutation hook to define the mutation for login
    const { data, mutate } = useMutation({
        mutationKey: ["login"], // Unique key for the mutation
        mutationFn: mutationLogin, // Function to be called for the mutation
    });

    // Function to handle login when the user clicks the login button
    const handleLogin = async () => {
        // Execute the login mutation
        await mutate();

        // Check if the mutation returned a guest_session_id
        if (data && data.guest_session_id) {
            // Store the guest_session_id in local storage
            localStorage.setItem("guest_session_id", data.guest_session_id);
            console.log("guest_session_id stored:", localStorage.getItem("guest_session_id"));

            // Navigate to the home page
            navigate("/");
        } else {
            // Log an error if no valid guest_session_id is received
            console.error("No valid guest_session_id received");
        }
    };

    // Render the authentication UI
    return (
        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="violet" textAlign="center">
                    Welcome! Log in by registering as a guest below.
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        {/* Button to trigger the handleLogin function */}
                        <Button color='violet' size='large' fluid onClick={handleLogin}>
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};
