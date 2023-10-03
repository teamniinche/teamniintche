import React,{useState} from 'react';
import {useDispatch} from 'react-redux'  //LE HOOK SETTER pour le cas de @redux/toolkit
import {modifyChantier} from './stoore.js'  // ACTION Pour le HOOK SETTER pour le cas de @redux/toolkit
import {Link,useNavigate} from 'react-router-dom';
import ReactModal from 'react-modal'
import './pagesceo.css';
import {editer,supprimer,ajouter} from './icons.js';
import {EditRubrique,EditMembreAdmin} from './editionsOfItems.js';
import {UpdateProps} from './requetesFetch.js';
export default function  Pagesceo(){
  const [selections,setSelections]=useState([])
  const [type,setType]=useState("")
  const [titre,setTitre]=useState("")
  const [error,setError] = useState("")
  const [modalDisplay,setModalDisplay]=useState({showModal:false})
  const [item,setItem]=useState({})
  const Navigate=useNavigate()   //Au HOOK SETTER pour le cas de @redux/toolkit
   const dispatch=useDispatch()  //LE HOOK SETTER pour le cas de @redux/toolkit
  // useEffect(() => {
  //   disableEditItems();
  // },);

  // const disableEditItems = () => {
  //   const editItems = document.getElementsByClassName('editItem');
  //   if (editItems.length > 0) {
  //     if (type==="membres"){
  //     for (let i = 0; i < editItems.length; i++) {
  //       editItems[i].setAttribute('disabled', 'true');
  //       editItems[i].style.color="rgba(0,0,0,.2)"
  //     }}else{
  //       for (let i = 0; i < editItems.length; i++) {
  //       editItems[i].removeAttribute('disabled');
  //       editItems[i].style.color="rgba(0,0,200,.8)"
  //     }
  //   }
  // }};

    function handleShowModal(bool,item){
      if(item.region){
        dispatch(modifyChantier(item.name))   //Pour LE HOOK SETTER pour le cas de @redux/toolkit
        Navigate("/compte/nouveauChantier")   //Avec LE HOOK SETTER pour le cas de @redux/toolkit
        // alert("Bientot possibilité de changer un chantier déjà enregistré.")  //Alternative
      }else{
      setModalDisplay({showModal:bool})
      setItem(item)}
    }

  
  function handleSelectionsClick(selections) {
    let ajouterChantierStyle=document.querySelector('#ajouterChantier').style
    if(selections==="membres"){
      setType("membres")
      setTitre('Gestion de profil')
      ajouterChantierStyle.display='none'
    }else if(selections==="chantiers"){
      setType("chantiers")
      setTitre('Mise à jour chantier')
      ajouterChantierStyle.display='inline-block'
    }else{
      setType("team")
      setTitre('Mise à jour rubrique')
      ajouterChantierStyle.display='none'
    }
    fetch('/api/'+ selections+'/all'+selections)
      .then(response => response.json())
      .then(selections => setSelections(selections))
      .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
      if (error) {
        return <div>Une erreur s'est produite : {error}</div>;
      }
    }

    const modal=()=>{
      //Pour chantier on est rediriger vers la page d'edition de chantier par lee hook "useNavigate"
      if(type!=="chantiers"){
          switch(type){
            case "membres":
              return <EditMembreAdmin render={(bool=>setModalDisplay({showModal:bool}))} item={item}/>;
            // case "chantiers":
            //   return <EditChantier render={(bool=>setModalDisplay({showModal:bool}))} item={item}/>;
            default:
              return <EditRubrique render={(bool=>setModalDisplay({showModal:bool}))} item={item}/>;
          }
      }
    }

    // function handleItemChange(item){setItem(item)}
    let labelListe=type==="team"?"Rubriques":type; //gestion du titre du tableau pour "Team"
  return (
    <div id="pagesceo">
        <div id="navbar">
            <div className="navbarItems" id="gestLogo">
                <img src="" alt=""/>
                <span>Pages gestionnaires</span>
            </div>
            <ul className="navbarItems" id="navUl">
                <li onClick={()=>handleSelectionsClick("chantiers")}>Chantiers</li>
                <li onClick={()=>handleSelectionsClick("membres")}>Membres</li>
                <li onClick={()=>handleSelectionsClick("rubriques")}>Team</li>
            </ul>
        </div>
        {/* <EditContext.Provider value={{item:item,setItem:()=>handleItemChange()}}> */}
        <div className="divtech" id="divTechPceo">
          <div className="displaySection" style={{width:"100%",margin:"0",padding:"0"}}>
          <p style={{width:"80%",height:"50px",margin:"0",padding:"0px 10%",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",textAlign:"center",marginTop:"90px",backgroundColor:"rgba(0,0,0,.1)",color:"rgba(0,0,0,.7)",fontWeight:"bold"}}>Liste des {labelListe.toUpperCase()} <span id="ajouterChantier" style={{width:"40px",height:"40px",color:"rgb(0,0,220)",backgroundColor:"rgba(150,150,150,.6)",fontWeight:"bold",fontSize:"20px"}}><Link to='/compte/nouveauChantier'>{ajouter}</Link></span></p>
          <table style={{width:"100%",margin:"0",padding:"0"}}>
            <tbody style={{width:"100%",margin:"0",padding:"0"}}>
              <tr style={{height:"40px"}}>
                <th style={{borderBottom:".1px dotted grey"}}>ID</th>
                <th style={{borderBottom:".1px dotted grey"}}>Nomination</th>
                <th style={{borderBottom:".1px dotted grey"}}>Tél/Local</th>
                <th style={{borderBottom:".1px dotted grey"}}>Editer</th>
                <th style={{borderBottom:".1px dotted grey"}}>Supp</th>
              </tr>
              {/* {<Outlet/>} */}
              {selections.map(item=><RowOfItem type={type} selection={item} render={(bool,elem)=>handleShowModal(bool,elem)}/>)}
            </tbody>
            <tfoot></tfoot>
          </table>
          </div>
          <ReactModal
          isOpen={modalDisplay.showModal}
          style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    },content: {
                  position: 'absolute',
                  top: '-10px',
                  left: '2.5%',
                  right: '2.5%',
                  bottom: '40px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  width:'92%',
                  maxWidth:'100%',
                  height:'fit-content',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '2%',
                  paddingTop:"0px",
                }}}
          >
              {/* <InputString type="text" for="nom" icon={identifiant} render={(obj)=>{}}/> */}
              {/* <EditRubrique item={item}/> */}
              <div style={{width:"92%",padding:'15px 5px',marginTop:'1em',borderBottom:'.5px solid brown',display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                  <h3 style={{textAlign:'center',color:"brown",width:"90%",letterSpacing:"3px",margin:"0px",padding:".4em 0px",textDecoration:".2px underline brown"}}>{titre}</h3>
                  <span style={{width:'5%',textAlign:'right',paddind:'0px'}}><i class="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>setModalDisplay({showModal:false})}></i></span>
              </div>
              {modal(item)}
            {/* <button className="succesButton" onClick={()=>setModalDisplay({showModal:false})}>Valider</button>
            <button className="dangerButton" onClick={()=>setModalDisplay({showModal:false})}>Abandonner</button> */}
          </ReactModal>
        </div>
        {/* </EditContext.Provider> */}
    </div>
  )
}

// export class TeamPagesceo extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={rubriques:[],error:""};
//   }
//   // const [rubriques,setRubriques]=useState([])
//   // const [error,setError] = useState("")
//   componentDidMount(){ 
//      fetch('/api/rubriques')
//       .then(response =>  response.json())
//       .then(selections => this.setState({rubriques:selections,...this.state}))
//       .catch(error => this.setState({...this.state,error:error})); // Stocke uniquement le message de l'erreur
//       // if (this.error) {
//       //   return <div>Une erreur s'est produite : {this.error}</div>;
//       // }
//     }
//   componentWillUnmount(){}
//   render(){

//   return <>{this.state.rubriques.map(item=><RowOfItem object={{id:item.id,nom:item.titre,local:""}}/>)}</>
//   }
// }

// export class ChantiersPagesceo extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={chantiers:[],error:""};
//     this.myWillMount=()=>this.SexecuteRenduInitial()
//   }
//   // const [rubriques,setRubriques]=useState([])
//   // const [error,setError] = useState("")
//  SexecuteRenduInitial(){
// // export function (){
// //   const [chantiers,setChantiers]=useState([])
// //   const [error,setError] = useState("")
// //   useEffect(() => {
//    fetch('/api/chantiers')
//       .then(response => response.json())
//       .then(selections => this.setState({chantiers:selections,...this.state}))
//       .catch(error => this.setState({...this.state,error:error})); // Stocke uniquement le message de l'erreur
//       // if (this.state.error) {
//       //   return <div>Une erreur s'est produite : {this.state.error}</div>;
//       // }
//     }
//       render(){
//    return <>{this.state.chantiers.map(item=><RowOfItem object={{id:item.id,nom:item.name,local:item.departement}}/>)}</>
//       }
// }

// export class MembesPagesceo extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {membres:[],error:""};
//   }
//   // const [membres,setMembres]=useState([])
//   // const [error,setError] = useState("")
//   componentDidMount(){
//     fetch('/api/membres')
//       .then(response => response.json())
//       .then(selections => this.setState({membres:selections,...this.state}))
//       .catch(error => this.setState({...this.state,error:error})); // Stocke uniquement le message de l'erreur
//       // if (error) {
//       //   return <div>Une erreur s'est produite : {error}</div>;
//       // }
//   }
//   componentWillUnmount(){}
//   render(){ 
//   return <>{this.state.membres.map(item=><RowOfItem object={{id:item.id,nom:item.firstName + " "+item.lastName,local:item.departementDOrigine}}/>)}</>
// }}

function RowOfItem(props) {
  const selection=props.selection
  const type=props.type // pour connaitre le type(chantiers ou membres ou team) qui a le focus.
  const pseudo=selection.pseudo
  let nom="";
  let local="";

  // chantiers
  if(type==="chantiers"){
      nom=selection.name
      local=selection.departement
  // rubriques
  }else if(type==="team"){
      nom=selection.titre
      local=selection.departement
  // membres
  }else{
      nom=selection.firstName + " " + selection.lastName
      local=selection.telephoneNumber
    }
  // const dispatch=props.dispatch
  const handleDelete=()=>{UpdateProps('/api/majmembres/'+pseudo,{delete:'suppession'});alert('Membre bien supprimé !')}
  function handleEdit(item){props.render(true,item)}
  const backgrndColor =(selection.statu==='x' && type==='membres')?'rgba(255,0,0,.16)':''
  const style={backgroundColor:backgrndColor,width:"100%",height:"25px",fontSize:"14px",margin:"0",padding:"0"}
  return (
    <tr style={style}>
        {/* les donnees */}
        <td style={{height:"100%",width:"11%",textAlign:"center",borderRight:".8px dotted grey",borderBottom:".8px dotted grey"}}>{selection.id}</td>
        <td style={{height:"100%",width:"50%",textAlign:"left",borderRight:".8px dotted grey",borderBottom:".8px dotted grey"}}>{nom}</td>
        <td style={{height:"100%",width:"20%",textAlign:"left",borderRight:".8px dotted grey",borderBottom:".8px dotted grey"}}>{local}</td>
        {/* les icones */}
        <td style={{height:"100%",width:"10%",textAlign:"center",borderRight:".8px dotted grey",borderBottom:".8px dotted grey"}} id="editButton"><button className='editItem' style={{color:'rgba(0,0,200,.8)',width:"70%"}} onClick={()=>handleEdit(selection)}>{editer}</button></td>
        <td style={{height:"100%",width:"14%",textAlign:"center",borderRight:".8px dotted grey",borderBottom:".8px dotted grey"}}><button style={{color:"red",width:"70%"}} onClick={handleDelete}>{supprimer}</button></td>
    </tr>
  )
}

// export default connect()(Pagesceo);



