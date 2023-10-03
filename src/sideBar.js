import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Tronc from './tronc.js';
import {useDispatch} from 'react-redux' ;
import {chantiersCounter,localisation,setIndex} from './stoore.js';
import './sideBar.css';

class Chantier extends React.Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
        this.dateDebut=this.props.chantier.dates.debut;
        this.dateFin=this.props.chantier.dates.fin;
    }
    intervalDate=(date1,date2)=>{
      let date1Splited=date1.split('-')
      let date2Splited=date2.split('-')
      let arrayOfMonth=['Janv.','Fév.','Mar.','Avr.','Mai','Juin','Juil.','Aout','Sept.','Oct.','Nov.','Déc.']
      // let mois1=date1Splited[1]
      let mois2=date2Splited[1]
      if(parseInt(date1Splited[0])>2000){
        let jour1=date1Splited[2]
      // let annee1=date1Splited[0]
        let jour2=date2Splited[2]
        let annee2=date2Splited[0]
        return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+annee2
      }else{
        // let annee1=date1Splited[2]
        let jour1=date1Splited[0]
        let annee2=date2Splited[2]
        let jour2=date2Splited[0]
        return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+ annee2
      }
    }
    onClick = ()=>{
      this.props.render(this.props.chantier)
      document.getElementsByClassName("sideBar")[0].style.display= window.innerWidth >="700"?"inline-block":"none";
      document.getElementsByClassName("tronc")[0].style.display="inline-block";
      };
    render(){
      const imagList=require("./images/" + this.props.chantier.etat.etat0.linkImg);
      const montant=this.props.chantier.coût?this.props.chantier.coût +' FCfa':'non renseigné';
      return  <div className="chantiers_bloc">
          <Link onClick={this.onClick}>
              <img src={imagList} alt="images-projet" id="img01"/>
              <div className="item_left">
              <p>Activité {this.props.chantier.name}<br/>
              <span style={{textDecoration:"underline",color:"rgb(0,0,100)",fontWeight:"bold"}}>{this.props.chantier.type}</span><br/>
              <span style={{color:"rgb(0,0,100)"}}>{'Coût : '+ montant}</span> <br/>
              <span>{this.intervalDate(this.dateDebut,this.dateFin)} </span></p></div>
          </Link>
        </div>
     }
  }
    

  export default function SideBar(props){
     const dispatch=useDispatch()
      const defaultChantier={   
            "id":0,
            "région":"Dakar",
            "departement":"Dakar",
            "name":"John F.J.K",
            "type":"réfection",
            "dates":{"debut":"01-08-2015","fin":"01-11-2015"},
            "presentation":"L'établissement [...NOM ETABLISSEMENT...] est crée en 1970 durant le régime de Pr. Abdou Diouf pour promouvoir l'éveil des consciencs et éradicquer l'analphabetisme au Sénégal. L'école présente un effectif de 300 élèves répartis en 5 niveaux(4CI, 3CP, 2CE, 1CM1 et 1CEM2) sur 4 salles de classes pour 5 instituteurs y compris la directrice.La Teamniintche a été sollicitée à titre provisoire par la directrice pour les services prévus à cette activité.",
            "etat":{
                    "etat0":{"linkImg":"chantierJFK.jpg","sTitre":""},
                    "etat1":{"linkImg":"","sTitre":""},
                    "etat2":{"linkImg":"","sTitre":""},
                    "etat3":{"linkImg":"","sTitre":""},
                    "etat4":{"linkImg":"","sTitre":""}
                },
            "programme":{"programme0":{"linkImg":"ficheProjet.jpg","sTitre":""}},
            "rendu":{"rendu0":{"linkImg":"chantierJFK.jpg","sTitre":""},
                    "rendu1":{"linkImg":"","sTitre":""},
                    "rendu2":{"linkImg":"","sTitre":""},
                    "rendu3":{"linkImg":"","sTitre":""},
                    "rendu4":{"linkImg":"","sTitre":""}
                },
            "bilan":"placeholder du bilan"
        };
      const [state,setState] = useState({chantier:defaultChantier});
      const [chantiers, setChantiers] = useState({chantiers:[],nombre:''});
      const [error, setError] = useState('');
      let Chantiers=chantiers.chantiers
      let nombre=chantiers.nombre
      function chantierChange(chantier,index){
        setState({chantier:chantier})
        dispatch(localisation({pos:[chantier.lat,chantier.long],index:index}))
        dispatch(setIndex(index))
        document.getElementsByClassName('containerOnly')[0].style.display='block';
        // document.getElementsByClassName('mapContainer')[0].style.display='none'; //getElementsByTagName('iframe')[0]
        document.querySelector('#map').style.display='none';
        // <span style={{color:"blue",fontWeight:"bold"}}>{' >>>'}</span> {props.ChFocus}
        }
      function inputChange(val){
          if (val===""){
            fetch('/api/chantiers/allchantiers')
          .then(response => response.json())
          .then(chantiers => {setChantiers({...chantiers,chantiers:chantiers})})
          .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
          }else{
          fetch('/api/chantiers/allchantiers/'+val)
            .then(response => response.json())
            .then(chantiers => setChantiers({...chantiers,chantiers:chantiers}))
            .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
          }
          }

      useEffect(() => {
        fetch('/api/chantiers/allchantiers')
          .then(response => response.json())
          .then(chantiers => {
                  dispatch(chantiersCounter(chantiers.length));
                  setChantiers({chantiers:chantiers,nombre:chantiers.length})
                })
          .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
        },[dispatch]);
    
      if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
      }
      return (
        <div className="Tablette_pc">
          <Tronc chantier={state.chantier} nombre={nombre} />
          <div className='sideBar'>
              <div className="chantiers" id="chantiers_title">
                  <p>{Chantiers.length} Chantiers trouvé(s)</p>
                   <hr/>
              </div>
              <div className='listChantiers'>
                <ResearchBar typ="CHANTIER" number={Chantiers.length} render={(iptValue)=>{inputChange(iptValue)}} /> 
                {Chantiers.map((item,index)=><Chantier key={index} chantier={item} render={(chantier,index)=> chantierChange(chantier,index)} />)}
               </div>
          </div>
        </div>
      )
    // }
  }



export class ResearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange=(e) =>{this.props.render(e.target.value);}
  render(){
    let number=this.props.number===0?'AUCUN ':this.props.number;
    let style1={boxShadow:"none",border:"none",
              margin:"10px",
              height:"fit-content",
              width:"92%",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
              }
    let style2={width:"96%",height:"10px",
              fontSize:"10px",color:"blue",
              fontWeight:"bold",
              padding:"2%",
              paddingBottom:"3%"
              }
  return (
    <div className="chantiers_bloc" style={style1}>
      <input style={{width:"98.5%",minHeight:"40%",marginLeft:"1%",padding:"3%",border:"0px",borderRadius:"10px"}} placeholder={"RECHERCHER "+this.props.typ} value={this.props.termOfResearch} onChange={this.handleChange} />
      <label style={style2} >{number+' ' +this.props.typ+'.S TROUVE.S'} </label>
    </div>
  ) }
}

