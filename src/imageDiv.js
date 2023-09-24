import React from 'react';
import './imageDiv.css';

export default function ImageDiv(props) {
  return (
    <div className='imageSliderContainer'>
        <img src={props.url} alt='imageSlider' />
        <span className="spanBottom">{props.sousTitre}</span>
    </div>
  )
}
