import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { WhatshotTwoTone } from '@mui/icons-material';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  useEffect(()=>{
    if(value===0)
        navigate("/") 
    else if(value===1)
        navigate("/movies")
    else if(value===2)
        navigate("/series")
    else if(value===3)
        navigate("/search")      
  }, [value, navigate])

  return (
    <Box style={{ 
            width: '100%',
            position:"fixed", 
            zIndex:100, 
            bottom: 0
        }}>
      <BottomNavigation
      style={{backgroundColor: "#2d313a"}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color: "white"}} label="Trending" icon={<WhatshotTwoTone />} />
        <BottomNavigationAction style={{color: "white"}} label="Movies" icon={<MovieCreationRoundedIcon />} />
        <BottomNavigationAction style={{color: "white"}} label="TV Series" icon={<TvRoundedIcon />} />
        <BottomNavigationAction style={{color: "white"}} label="Search" icon={<SearchRoundedIcon />} />
      </BottomNavigation>
    </Box>
  );
}
