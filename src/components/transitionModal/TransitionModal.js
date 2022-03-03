import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { img_500 } from '../../config';
import { YouTube } from '@mui/icons-material';
import './TransitionModal.css'
// import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: '#39445a',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({children, media_type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    fetchData()
    fetchVideo()
    return setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("")
  const [video, setVideo] = useState("")

  const fetchData = async ()=>{
    const {data} = await axios(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setContent(data)
  }
  
  const fetchVideo = async ()=>{
    const {data} = await axios(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    // console.log(data)
    setVideo(data.results[0].key)
  }

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="transitionModal">
              {content && <img src={img_500+content.poster_path} alt={content.name || content.title} /> }
              <div className="about">
                <div className="title">
                  <h1>{content.name || content.title} ({(content.release_date || content.first_air_date)})</h1>
                </div>
                <div className="description">
                  <p>{content.overview}</p>
                </div>
                <Button variant="contained" target="_blank" href={`https://www.youtube.com/watch?v=${video}`}><YouTube/></Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
