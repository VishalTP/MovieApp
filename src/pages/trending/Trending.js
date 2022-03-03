import React, { useEffect } from 'react'
import { useState } from 'react'
import CustomPagination from '../../components/customPagination/CustomPagination';
import SingleContent from './../../components/singleContent/SingleContent'
import './Trending.css'
import axios from 'axios';

const Trending = () => {

  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const fetchTrending = async () => {
    const { data } = await axios(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    setContent(data.results)
    console.log(data)
  }
  useEffect(() => {
    fetchTrending()

  }, [page])

  return (
    <div>
      <h1 className="pageTitle">Trending</h1>
      <div className="trending">
        {content && content.map(c =>
          <SingleContent
            key={c.id}
            id = {c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        )}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending