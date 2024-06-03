export const fetchTvShowDetails = async (tvShowId: string) => {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
                },
            }
        );

        if (!res.ok) {
            throw new Error('Netwerk respons was niet ok');
        }

        const data = await res.json();
        console.log(data);  // log de data hier nadat je de JSON body hebt gelezen

        return data;
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        throw error;  // hergooi de fout zodat deze kan worden afgehandeld door de aanroeper van deze functie
    }
}
