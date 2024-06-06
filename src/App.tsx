import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { Auth } from './pages/auth/loginPage';
import { Home } from './pages/home';
import { Movie } from './pages/movie/movieCard';
import { TvShow } from './pages/tvshow/tvShowCard';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='tvshow/:id' element={<TvShow />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
