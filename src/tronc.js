import React,{useEffect} from 'react';
import './tronc.css';
import TitreRealisations from './divPortable.js';
import {aimer,nePasAimer} from './icons.js';
import Map from './map.js'
import Slider from './slider';
import {images} from './icons.js';
import PresentationEtablissement from './local.js'
      

export default function Tronc(props) {
  useEffect(()=>{document.getElementsByClassName('header')[0].style.height="36vh";})
  return (
    <div className='tronc'>
      <TitreRealisations ChFocus={props.chantier.name} nombre={props.nombre} />
      <Map chantier={props.chantier}/>
      <Presentation chantier={props.chantier} index={props.index}/>
      {/* <Outlet/> */}
    </div>
  )
}

function Presentation(props) {
  const chantier=props.chantier
  return <div className="containerOnly">
  <div className="infos_large">
  {/* 🔴  */}
      <p style={{color:"brown"}}><h1>Le chantier de {chantier.name}</h1> </p>
      <hr/>
   </div>
  <PresentationEtablissement index={props.index} chantier={chantier}/>
</div>
}


export const myDiv=<div className="containerOnly">
        
        <div className="infos_large">
            <p><h4>🔴 Informations détaillées sur le chantier de {"props.chantier.name"}</h4> </p>
            <hr/>
        </div>
        <div className="text">
        {/* <img src={image1} alt="images-projet" onClick={onClick()} id="imagesChantier"/> */}
            <p><Slider images={images} classe='pourTronc' /> {"props.chantier.redaction"}</p>
            <div className="infos_small" style={{width:"100%",height:"auto",backgroundColor:"grey",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <h4 style={{margin:"0px",color:"white"}}>Aimez-vous cette page ?</h4>
              <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {aimer}
                {nePasAimer}
              </div>
            </div>
        </div>
      </div>