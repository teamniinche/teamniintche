import React from 'react'
import {Link} from 'react-router-dom';
import './menu.css';

export default function Menu() {
    const handleClick=()=>{
        document.querySelector('#menu').style.display='none';
        document.querySelector('#img_menu').style.display='inline';
        if(document.getElementsByClassName('secondebar')[0]){
          document.getElementsByClassName('secondebar')[0].style.display="flex";
        }
      }
  return (
    <div id='menu' onClick={handleClick}>
        <Link style={{textDecoration:'none'}} id='fermer'><span style={{color:'red',fontSize:'20px',textAlign:'left'}}>X</span></Link>
        <Link to='/' className='menu_link' style={{marginTop:'10px'}}>NOS REALISATIONS</Link>
        <hr/>
        <Link to='/quisommesnous' className='menu_link'>QUI SOMMES-NOUS ?</Link>
        <hr/>
        <Link to='/' className='menu_link'>Notre Comptabilité</Link>
        <hr/>
        <Link to='/nousContacter' className='menu_link'>NOUS CONTACTER</Link>
        <hr/>
        <Link to='/CEO' className='menu_link'>PAGES CEO</Link>
        <hr/>
    </div>
  )
}
