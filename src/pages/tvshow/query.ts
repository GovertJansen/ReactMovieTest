// Define the fetchTvShowDetails function to fetch details of a specific TV show by its ID
export const fetchTvShowDetails = async (tvShowId: string) => {
    try {
        // Perform the fetch request to the API endpoint for the specified TV show ID
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
                },
            }
        );

        // Check if the response is not okay (status not in the range 200-299)
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON data
        const data = await res.json();
        console.log(data);  // Log the data to the console after reading the JSON body

        // Return the parsed data
        return data;
    } catch (error) {
        // Log an error message if an exception occurs
        console.error('An error occurred:', error);
        // Rethrow the error so it can be handled by the caller of this function
        throw error;
    }
}
