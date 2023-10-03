import React from 'react'
import Slider from './slider';
import './local.css'
export default function PresentationEtablissement(props) {
    const chantier=props.chantier
    const {etat0,etat1,etat2,etat3}=chantier.etat
    const {rendu0,rendu1,rendu2,rendu3}=chantier.rendu
    const imagesEtat=[
          [etat0.linkImg,etat0.sTitre],[etat1.linkImg,etat1.sTitre],
          [etat2.linkImg,etat2.sTitre],[etat3.linkImg,etat3.sTitre]
        ]
    const imagesRendu=[
          [rendu0.linkImg,rendu0.sTitre],[rendu1.linkImg,rendu1.sTitre],
          [rendu2.linkImg,rendu2.sTitre],[rendu3.linkImg,rendu3.sTitre]
        ]
    let etatImages=imagesEtat.filter(image=>image[0]!=='')
    let renduImages=imagesRendu.filter(image=>image[0]!=='')
  return <>
        <h6 id="tec" style={{height:'0px',margin:'0px'}}>'</h6>
            <ul id="entete">
                <li style={{lineHeight:"2em"}}><a href='#hist'>Présentation</a></li>
                <li style={{lineHeight:"2em"}}><a href='#1'>Etat des lieux avant</a></li>
                <li style={{lineHeight:"2em"}}><a href='#2' id="hist">Programme des travaux prévus</a></li>
                <li style={{lineHeight:"2em"}}><a href='#3'>Rendu de l'ouvrage après</a></li>
                <li style={{lineHeight:"2em"}}><a href='#4'>Bilan & Perspectives</a></li>
            </ul>
        <h2 id="0" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{ letterSpacing: "2px",textDecoration:"none" }}>🔺 Présentation de l'établissement</a></h2>
        <Plaque chantier={chantier}/>
        <p style={{margin:"1%",padding:"4% 6%",width:"86%",fontSize:"18px",lineHeight:"1.5em",height:"fit-content",borderRadius:"5px",textAlign:"justify",letterSpacing:"2px",fontWeight:"bold",color:"rgba(0,0,0,.7)",textShadow:"2px 2px .5px white",backgroundColor:"rgba(0,0,0,.09)"}}>
        {chantier.presentation}
        </p>
        <Etat images={etatImages} chantier={chantier} />
        <FicheProjet chantier={chantier} />
        <Rendu images={renduImages} chantier={chantier} />
        <BilanTravaux chantier={chantier} />
    </>
}
export function Etat(props){
  const chantier=props.chantier
  return <>
    <h2 id="1" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{ letterSpacing: "2px",textDecoration:"none" }}>🔺 Etat des lieux avant travaux</a></h2>
    <p style={{margin:"1%",padding:"4% 4%",width:"90%",fontSize:"18px",lineHeight:"1.5em",height:"fit-content",borderRadius:"5px",textAlign:"justify",letterSpacing:"2px",fontWeight:"bold",color:"rgba(0,0,0,.7)",textShadow:"2px 2px .5px white",backgroundColor:"rgba(0,0,0,.09)"}}><Slider images={props.images} classe='sliderEtat' classe1='sliderNavPrec1' classe2='sliderNavSuiv1' />{chantier.etatLit} </p>
  </>
}

export function FicheProjet(props) {
    const fiche=props.chantier.programme.programme0.linkImg
    const avatar='ficheProjet.jpg'
    const Fiche=fiche===''?avatar:fiche;
    let imgTest=require('./images/'+Fiche)
  return (
    <>
    <h2 id="2" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{ letterSpacing: "2px",textDecoration:"none" }}>🔺 Fiche du programme des travaux prévus à l'école ...</a></h2>
    <div style={{margin:"0px",padding:"2vw",width:"94vw",height:"180vw",position:"relative"}}>
       <img src={imgTest} alt="Fiche du projet" style={{margin:"0px",padding:"0px",width:"94vw",height:"100%",float:"left"}}/> 
    </div>
    </>
  )
}

export function Rendu(props){
  const chantier=props.chantier
  return <>
    <h2 id="3" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{ letterSpacing: "2px",textDecoration:"none" }}>🔺 Rendu de l'ouvrage après travaux</a></h2>
    <p style={{margin:"1%",padding:"4% 4%",width:"90%",fontSize:"18px",lineHeight:"1.5em",height:"fit-content",borderRadius:"5px",textAlign:"justify",letterSpacing:"2px",fontWeight:"bold",color:"rgba(0,0,0,.7)",textShadow:"2px 2px .5px white",backgroundColor:"rgba(0,0,0,.09)"}}><Slider images={props.images} classe='sliderRendu' classe1='sliderNavPrec2' classe2='sliderNavSuiv2' />{chantier.renduLit} </p>
  </>
}

export function BilanTravaux(props){
  const chantier=props.chantier
  return <>
  <h2 id="4" style={{margin:"0px",marginTop:"1em",borderTop:"1px double brown",padding:".5em 1em"}}><a href="#tec" style={{ letterSpacing: "2px",textDecoration:"none" }}>🔺 Bilan des travaux & Perspectives</a></h2>
  <p style={{margin:"1%",padding:"4% 6%",width:"86%",fontSize:"18px",lineHeight:"1.5em",height:"fit-content",borderRadius:"5px",textAlign:"justify",letterSpacing:"2px",fontWeight:"bold",color:"rgba(0,0,0,.7)",textShadow:"2px 2px .5px white",backgroundColor:"rgba(0,0,0,.09)"}}>
  {chantier.bilan} </p>
  </>
}

export function Plaque(props) {
  const {region,departement,name}=props.chantier
  const plaque=require('./images/plaque_etablissement.webp')
  return (
    <div style={{height:"170px",width:"98%",position:"relative",margin:"1%"}}>
        {/* textShadow:"2px 2px 1px black", color:"rgb(200,0,0)" ,textShadow:"2px 2px 1px rgb(100,100,100)" */}
            <img src={plaque} alt="background de la plaque etablissement" style={{float:"left",margin:"0px",padding:"0px",width:"100%",height:"100%"}}/>
            <h2 style={{position:"absolute",textAlign:"center",textShadow:"2px 2px .5px white,-2px -2px .5px white",color:"rgba(0,0,0,.7)",top:"3%",left:"10%",right:"10%"}}>I.A de <span style={{}}>{region} </span></h2>
            <h3 style={{position:"absolute",textAlign:"center",textShadow:"2px 2px .5px white,-2px -2px .5px white",color:"rgba(0,0,0,.7)",borderBottom:".5px solid grey",paddingBottom:"8px",top:"25%",left:"10%",right:"10%"}}>I.E.F de <span style={{}}>{departement} </span></h3>
            <h4 style={{position:"absolute",textAlign:"center",textShadow:"2px 2px .5px white,-2px -2px .5px white",color:"rgba(0,0,0,.7)",top:"42%",left:"5%",right:"5%",fontSize:"20px",letterSpacing:"2px"}}>{name} </h4>
        </div>
  )
}
