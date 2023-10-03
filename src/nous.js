import React ,{useEffect,useState} from 'react';
import {useContext} from 'react';
import './nous.css';
import {ResearchBar} from './sideBar.js';
import {Link, Outlet} from 'react-router-dom';
import InputString from './forms.js';
import MetaData from './nousContacter';
import Slider from './slider.js'

const membreDefault={   
  "id":0, 
  "firstName":"Moustapha",
  "lastName":"GUEYE",
  "alias":"GrandTapha",
  "sexe":"male",
  "departementDOrigine":"Dakar",
  "dateAnniversaire":"01-01-1970",
  "telephoneNumber":"234567890",
  "email":"test@test.com",
  "qualification":"Ecrivain-(Les Saillies du profane",
  "tngroupe":"Coordination TN",
  "galeriePrive":{"imgPublic":"","imgPrive":"","imgPublic1":"","imgPublic2":""},
  "apropos":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis laoreet dui ut finibus. Phasellus dapibus, orci quis laoreet malesuada, nulla velit auctor ligula, cursus pretium erat nibh sit amet leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum lorem sem, sollicitudin ut dolor vitae, imperdiet facilisis arcu. Nullam gravida laoreet elit luctus eleifend. Etiam condimentum quam ante, vel faucibus velit rhoncus vitae. Aenean tortor diam, egestas ac consequat at, posuere nec justo." 
}

const MembreContext=React.createContext({
  membreObject:{membre:membreDefault},
  setMembreObject:()=>{}
  });
  
export function Nous (props){
  const [state,setState]=useState({membre:membreDefault})
  const [membres, setMembres] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
    fetch('/api/membres/allmembres')
      .then(response => response.json())
      .then(membres => {setMembres(membres)})
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
  }, []);
  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }

  function inputChange(val){
    if (val===""){
      fetch('/api/membres/allmembres')
      .then(response => response.json())
      .then(membres => setMembres(membres))
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
      if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
      }
    }else{
      fetch('/api/membres/allmembres/'+val)
      .then(response => response.json())
      .then(membres => setMembres(membres))
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
      if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
      }
    }
    }
    

  function handlaRender(membre){setState({membre:membre})}
   return (
    <MembreContext.Provider value={{membreObject:state}} >
      <div className='noustronc'>
        <div className='noussidebar'>
          <ResearchBar typ="MEMBRE" number={membres.length} render={iptValue=>inputChange(iptValue)} />
          {membres.map((item)=><Membre key={item.id} membre={item} render={membre=>handlaRender(membre)} />)}
        </div>
        <DetailsMembre/>
      </div>
    </MembreContext.Provider>
    );
  }

function DetailsMembre(){
  let myContext=useContext(MembreContext)
  let membre=myContext.membreObject.membre
  const avatar=[['avatar.webp','NO IMAGES']]
  const {imgPublic,imgPrive,imgPublic1,imgPublic2}=membre.galeriePrive
  const IMAGES=[[imgPublic,''],[imgPrive,''],[imgPublic1,''],[imgPublic2,'']]
  let images=IMAGES.filter(image=>image[0]!=='')
  let imges=images.length===0?avatar:images;

  const facebook=require('./images/RS_logos/facebook.webp');
  const twitter=require('./images/RS_logos/twitter.webp');
  const instagram=require('./images/RS_logos/instagram.webp');
  const linkedin=require('./images/RS_logos/linkedin.webp');
return(     
    <div className='detailsmembre'>
      <div className='memberCard'>
        <Slider images={imges} classe='sliderRendu' classe1='sliderNavPrec2' classe2='sliderNavSuiv2' />
        <div className='etatCivil'>
          <p style={{marginBottom:"5px"}}>
          <span>{membre.firstName + ' ' + membre.lastName}</span> {'--- @lias ' + membre.alias} <br/> 
          <span>{membre.qualification }</span> {'    ' + membre.departementDOrigine} 
          </p>
          <ul>
          <a href='https://www.facebook.com'><li><img src={facebook} alt="facebook"/></li></a>
          <a href='https://www.twitter.com'><li><img src={twitter} alt="twitter"/></li></a>
          <a href='https://www.instagram.com'><li><img src={instagram} alt="instagram"/></li></a>
          <a href='https://www.linkedin.com'><li><img src={linkedin} alt="linkedin"/></li></a>
          </ul>
        </div>
      </div>
      <IlNousParleDeLui il={membre} />
    </div>
    )
  }
  
  function IlNousParleDeLui(props) {
    return (
      <>
      <h3 
        style={{
                display:"inline-block", 
                width:"94%",
                textAlign:"center",
                backgroundColor:"rgba(0,0,0,0.05)",
                margin:"2%",padding:"20px 0px",
                borderTop:".3px dotted brown",
                borderBottom:".3px dotted brown"
              }}>👇
        {props.il.alias+' nous parle de lui 🤓'} 
      </h3>
      <p className='apropos'>{props.il.apropos+' 👍 👏👏👏'}</p>
      </>
    )
  }
  

class Membre extends React.Component{
  constructor(props){
    super(props);
    this.handleMembreClick=this.handleMembreClick.bind(this);
    this.membre=this.props.membre
  }

  
  handleMembreClick=()=>{
    this.props.render(this.membre)
    document.getElementsByClassName("noussidebar")[0].style.display= window.innerWidth >="700"?"inline-block":"none";
    document.getElementsByClassName("detailsmembre")[0].style.display="inline-block";
  }

  handleTwitterClick=(event)=>{
    event.stopPropagation();
    let url = "https://twitter.com/ndourm9";
    window.open(url);
  }
  
  render(){
  const avatar='avatar1.jpg'
  const imgProfilLink=this.membre.galeriePrive.imgPublic
  let imageProfil=imgProfilLink!==''?imgProfilLink:avatar;
  let membreImg=require('./images/'+ imageProfil);
  const twitter=require('./images/RS_logos/twitter.webp');
  const style={
    backgroundColor:this.membre.sexe==='Homme'?'rgba(0,0,250,.1)':'rgba(255,0,150,.1)',
  }
  return (
    <div style={style} className='membre' onClick={this.handleMembreClick}>

      <img src={membreImg} alt='Prenom NOM'/>

      <ul>
        {/*<li>Prénom NOM</li>*/}
        <li className='prenomNom'>
        {this.membre.firstName +" " + this.membre.lastName +" - "+ this.membre.departementDOrigine}
        <img src={twitter} alt="twitter" onClick={this.handleTwitterClick} id="twitterAList"/>
        </li>

        {/*<li>Qualification</li>*/}
        <li>{this.membre.qualification}</li>

        {/*<li>Alias - Groupe TN</li>*/}
        <li>{'@s '+ this.membre.alias +" - " + this.membre.tngroupe}</li>

      </ul>

    </div>
  )
}}

export class SecondeBar extends React.Component{
  constructor(props){
    super(props);
    this.onClickMembres=this.onClickMembres.bind(this);
    }
  onClickMembres=()=>{
      if (document.getElementsByClassName("noussidebar")[0]){
      document.getElementsByClassName("noussidebar")[0].style.display= window.innerWidth >="700"?"inline-block":"inline-block";
      document.getElementsByClassName("detailsmembre")[0].style.display="none";
      }}
  render(){
  return (
    <div className='nous'>
      <div className='secondebar'>
        <ul>
          <li onClick={this.onClickMembres}><Link to="/quisommesnous/lesmembres">LES MEMBRES</Link></li>
          <li ><Link to="/quisommesnous">LA TEAM</Link></li>
          <li ><Link to="/quisommesnous/niintche">NIINTCHE</Link></li>
        </ul>
      </div>
      <Outlet/>
      <MetaData/>
    </div>
) }
}

export function Niintche() {
  return (
    <div>
    <InputString for="joliNom" render={(objet)=>{} }/>
    </div>
  )
}

