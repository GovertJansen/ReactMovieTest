// Define the fetchMovies function
export const fetchMovies = async () => {
    // Perform the fetch request to the API endpoint for popular movies
    const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US",
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

// Define the fetchTvShows function
export const fetchTvShows = async () => {
    // Perform the fetch request to the API endpoint for popular TV shows
    const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US",
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