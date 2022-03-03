import React from 'react'
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({setPage, noOfPages=10}) => {
  const handlePagination = (page)=>{
    setPage(page)
    window.scroll(0,0)
  }
  return (
    <div style={{
      width:"100%",
      display: "flex",
      justifyContent: "center"
    }}>
      <Pagination 
        count={noOfPages} 
        color="standard" 
        hideNextButton
        hidePrevButton
        onChange={(e)=>handlePagination(e.target.textContent)}
      />
    </div>
  )
}

export default CustomPagination