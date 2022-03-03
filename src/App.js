import './App.css';
import Header from './components/header/Header';
import SimpleBottomNavigation from './components/MainNav';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Container } from '@mui/material';
import Trending from './pages/trending/Trending';
import Movies from './pages/movies/Movies';
import Series from './pages/series/Series';
import Search  from './pages/search/Search';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route exact path="/" element={<Trending />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/series" element={<Series />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
