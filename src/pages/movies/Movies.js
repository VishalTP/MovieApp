import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/customPagination/CustomPagination'
import Genres from '../../components/Genres'
import SingleContent from '../../components/singleContent/SingleContent'


const Movies = () => {
  const [page, setPage]=useState(1)
  const [content, setContent] = useState([])
  const [noOfPages, setNoOfPages] = useState()
  const [selectedGenres, setSelectedGenres]= useState([])
  const [genres, setGenres]= useState([])
  const fetchMovies = async()=>{
    const {data} = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genresForUrl}`)
    setContent(data.results)
    setNoOfPages(data.total_pages)
  }

  const handleGenreForUrl = (selectedGenres)=>{
    if(selectedGenres.length<1)
        return ""
    else
        return selectedGenres.reduce((acc, curr)=>acc.id+','+curr.id)
}
const genresForUrl = handleGenreForUrl(selectedGenres)

console.log(genresForUrl)


  useEffect(()=>{
    fetchMovies()
    window.scroll(0, 0)
  }, [page, genresForUrl])

  return (
    <div>
      <h1 className="pageTitle">Movies</h1>
      <Genres 
        type="movie" 
        selectedGenres= {selectedGenres} 
        setSelectedGenres={setSelectedGenres}
        genres= {genres} 
        setGenres= {setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content && content.map(c =>
          <SingleContent
            key={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="movie"
            vote_average={c.vote_average}
          />
        )}
      </div>
      {noOfPages>1 &&<CustomPagination setPage={setPage} noOfPages={noOfPages}/>}
    </div>
  )
}

export default Movies