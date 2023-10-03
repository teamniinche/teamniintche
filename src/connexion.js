import React,{useState,useLayoutEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'   //le HOOK SETTER dans le cas de @redux/toolkit
import {loggedAccess} from './stoore.js'   //Pour le HOOK SETTER dans le cas de @redux/toolkit
import {InputString} from './forms.js';
import './connexion.css';
import { identifiant,securite } from './icons.js';
import { nameValidator,passwordValidator } from './regExpressions.js';


const Connexion = () =>  {
    const [dataUser,setDataUser]=useState({Identifiant:"",Mot:""})
    const Navigate=useNavigate()
    const dispatch=useDispatch()  //le HOOK SETTER dans le cas de @redux/toolkit
    useLayoutEffect(()=>{ 
                    document.getElementsByClassName('header')[0].style.display="block";
                    dispatch(loggedAccess(null))
                  }
            )
    function handleChange(obj){
        document.getElementById('buttonConnectClick').style.display="none";
        let name=(obj.nom).split(" ")[0]
        let validator=name==='Mot'?passwordValidator:nameValidator;
        let item;
        if(name==='Mot'){
          item="Pw";
        }else{
          item="Pseudo";
        }
        let invalidItem="invalid"+item;
        let validItem="valid"+item;
        if(obj.val!==''){
        if(!validator.test(obj.val)){
          document.getElementById(invalidItem).style.display="block";
          document.getElementById(validItem).style.display="none";
          setDataUser({...dataUser,[name]:''})
        }else{
        document.getElementById(invalidItem).style.display="none";
        document.getElementById(validItem).style.display="block";
        setDataUser({...dataUser,[name]:obj.val})
        }}else{
          document.getElementById(invalidItem).style.display="none";
          document.getElementById(validItem).style.display="none";
          setDataUser({...dataUser,[name]:''})
      }}

    function handleClick(user){
      let alerte=document.getElementById('buttonConnectClick')
      let pseudo=user.Identifiant;
      let pW=user.Mot;
      if(pseudo===''||pW===''){
        alerte.innerText='NI Identifiant ni Mot de passe ne doit etre NULL !)'
        alerte.style.display="block";
      }else{
        fetch('/api/membres/'+pseudo)
          .then(response => response.json())
          .then(membre => {
          if(membre.passWord===pW){
            // dispatch(loginSuccess(membre));
            dispatch(loggedAccess(membre))  //le HOOK SETTER dans le cas de @redux/toolkit
            Navigate("/compte")
          }else{
            alerte.innerText='Identifiant et/ou Mot de passe INVALIDE.S !'
            alerte.style.display="block";
          }
        })
        .catch(error => alert("Identifiant invalide !" + error.message)); // Stocke uniquement le message de l'erreur
      }}
    const imgLg=require('./images/logo_niintche.webp')
  return (
    <div className="divTech">
      <div>
        <div className="titreConnexion">Connexion à votre compte <img src={imgLg} alt="Logo de la teamniintche" className="imgLg"/></div>
        <div className="connexionContainer">
            <InputString type="text" icon={identifiant} for="Identifiant" render={(obj)=>{handleChange(obj)}}/>
            <span style={{display:"block",marginLeft:"50px"}}>
            <i class="fas fa-xmark" id="invalidPseudo" style={{color:"rgba(200,0,0,.6)",display:"none"}}> Entree null!</i>
            <i class="fas fa-check" id="validPseudo" style={{color:"rgba(0,100,0,.8)",display:"none"}}></i>
            </span>
            <InputString type="password" icon={securite} for="Mot de passe" render={(obj)=>{handleChange(obj)}}/>
            <span style={{display:"block",marginLeft:"50px"}}>
              <i class="fas fa-xmark" id="invalidPw" style={{color:"rgba(200,0,0,.6)",display:"none"}}> Entree null!</i>
              <i class="fas fa-check" id="validPw" style={{color:"rgba(0,100,0,.8)",display:"none"}}></i>
            </span>
            {/* <Link to="/compte"><button className='succesButton' style={{width:"50%",padding:".5em"}} onClick={()=>{handleClick(dataUser)}}>Se connecter</button></Link> */}
            <button className='succesButton' style={{width:"50%",padding:".5em"}} onClick={()=>{handleClick(dataUser)}}>Se connecter</button>
            <span id="buttonConnectClick">Identifiant et Mot de passe requis !</span>
            <h5 className="sousTitre" >Vous avez un jeton mais vous ne vous etes encore inscrits 
                <Link to="/connexion/inscription"><span>S'inscrire</span></Link>
            </h5>
        </div>
      </div>
    </div>
  )
}

// export default connect()(Connexion);
export default Connexion
