import React from 'react';
import menu from '../src/images/menu.ico';
import './divPortable.css';

export default function TitreRealisations(props) {
    function handleClick(){
        let myEement=document.getElementsByClassName("sideBar")[0];
        let tronc=document.getElementsByClassName("tronc")[0];
        myEement.style.display=myEement.style.display==="none"?"inline-block":"none";
        tronc.style.display=myEement.style.display==="none"?"inline-block":"none";
        }
  return (
    <div id='divPortable' style={{textOverflow: "ellipsis",}} onClick={handleClick}>
        <img src={menu} id="imgReal" alt=""/>
        <span id="spanReal" style={{textOverflow: "no-wrap",}}> {props.nombre} Réalisatisations  <span style={{color:"blue",fontWeight:"bold"}}>{' >>>'}</span> {props.ChFocus}
        </span>
    </div>
  )
}
