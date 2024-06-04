// Define the mutationLogin function
export const mutationLogin = async () => {
    // Perform the fetch request to the API endpoint
    const res = await fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
            },
        }
    );

    // Check if the response is not okay (status not in the range 200-299)
    if (!res.ok) {
        throw new Error('Netwerk respons was niet ok');
    }

    // Parse the response JSON data
    const data = await res.json();
    console.log(data);  // Log the data to the console after reading the JSON body

    // Return the parsed data
    return data;
}
