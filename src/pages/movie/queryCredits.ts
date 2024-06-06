export const fetchMovieCredits = async (movieId: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
            headers: {
                Authorization:
                    import.meta.env.VITE_API_HEADER
            },
        }
    );

    if (!res.ok) {
        throw new Error('Netwerkantwoord was niet oké');
    }

    const creditData = await res.json();
    console.log(creditData); // Log de data naar de console na het lezen van de JSON-body

    return creditData;
}
