import { Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({
    selectedGenres,
    genres,
    setSelectedGenres,
    setGenres,
    setPage,
    type
}) => {

    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g=>g.id!==genre.id))
        setPage(1)
    }
    const handleRemove = (genre)=>{
        setSelectedGenres(selectedGenres.filter(g=>g.id!==genre.id))
        setGenres([...genres, genre])
        setPage(1)
    }

    
    const fetchGenres = async ()=>{
        const {data} = await axios(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres)
    }

    
    
    console.log(genres)
    
    useEffect(()=>{
        fetchGenres()
        console.log("gh")
        return()=>{
            setGenres([])
        }
    },[])

  return (
    <div style={{padding: "6px 0"}}>
        {selectedGenres && selectedGenres.map(genre=> 
            <Chip 
                key={genre.id} 
                label={genre.name} 
                style={{margin:"2px"}}
                color= "primary"
                clickable
                size="small"
                onDelete= {()=>handleRemove(genre)}
            />
        )}
        {genres && genres.map(genre=> 
            <Chip 
                key={genre.id} 
                label={genre.name} 
                style={{backgroundColor:"white", margin:"2px"}}
                clickable
                size="small"
                onClick={()=>handleAdd(genre)}
            />
        )}
    </div>
  )
}

export default Genres