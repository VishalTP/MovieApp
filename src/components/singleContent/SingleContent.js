import { Badge } from '@mui/material'
import React from 'react'
import { img_300, unavailable } from '../../config'
import TransitionsModal from '../transitionModal/TransitionModal'
import './SingleContent.css'

const SingleContent = ({poster ,title, date, media_type, vote_average, id }) => {
  return (
    <TransitionsModal media_type={media_type} id={id} >
    <div className="media">
        <Badge color={vote_average>6?"primary": "secondary"} badgeContent={vote_average}/>
        <img className="poster" src={img_300+poster} alt={unavailable} />
        <b className="title">{title}</b>
        <div className="typeNDate">
          <span>{media_type==='tv'?"TVseries": "Movie"}</span>
          <span className="date">{date}</span>
        </div>
    </div>
    </TransitionsModal>
  )
}

export default SingleContent