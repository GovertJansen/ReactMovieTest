const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjFkOWEzZjkwMmI5YTg5MDEwMzQxMTc1N2IzZmVkOSIsInN1YiI6IjY2NTVlODBkMzljNjllZGZkN2U0YmRlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRY7v-s_RMNitwzNsHJ6JsvxCrZlapPlSTswRYySWVc'
    }
};

fetch('https://api.themoviedb.org/3/search/movie?query=Kingdom&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
