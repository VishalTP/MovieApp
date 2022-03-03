import { Button, TextField, Tabs, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from '../../components/singleContent/SingleContent';
import CustomPagination from '../../components/customPagination/CustomPagination';
import axios from 'axios';

const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [content, setContent] = useState([])
  const [noOfPages, setNoOfPages] = useState()

  const fetchSearch = async ()=>{
    const {data} = await axios(`https://api.themoviedb.org/3/search/${type?'tv':'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchText}`)
    setContent(data.results)
    setNoOfPages(data.total_pages)
    console.log(data.results)
  }

  useEffect(()=>{
    fetchSearch()
    window.scroll(0, 0)
  }, [type, page])

  return (
    <>
    <div style={{display:"flex"}}>
      <TextField 
        id="filled-basic" 
        label="Search" 
        variant="filled" 
        style={{flex:1, backgroundColor:"white"}}
        color="success"
        onChange={(e)=>setSearchText(e.target.value)}
      />
      <Button variant="contained" onClick={fetchSearch}><SearchIcon style={{marginLeft:"10px"}}/></Button>
    </div>
    <Tabs 
      value={type} 
      onChange={(event, newValue) => {
        setType(newValue);
        setPage(1)
      }}
      style={{width: "100%"}}
    >
      <Tab label="Search Movies" style={{width: "50%"}}/>
      <Tab label="Search TV Series" style={{width: "50%"}} />
  </Tabs>
  <div className="trending">
        {content && content.map(c =>
          <SingleContent
            key={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type?'tv': 'movie'}
            vote_average={c.vote_average}
          />
        )}
        {searchText && !content && (type? <h1>No Series Found</h1>: <h1>No Movies Found</h1>) }
      </div>
      {noOfPages>1 && <CustomPagination setPage={setPage} noOfPages={noOfPages}/>}
    </>
  )
}

export default Search