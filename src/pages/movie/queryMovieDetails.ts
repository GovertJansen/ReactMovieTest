// Define the fetchMoviesDetails function to fetch details of a specific movie by its ID
export const fetchMoviesDetails = async (movieId: string) => {
    // Perform the fetch request to the API endpoint for the specified movie ID
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
            headers: {
                Authorization:
                    import.meta.env.VITE_API_HEADER
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
}
