import React,{useState,useEffect} from 'react';
import {DataListEquipes,DataListDepartements} from './dataListes.js';
import {UpdateProps} from './requetesFetch.js';
import {dateValidator,phoneValidator,nameValidator,lastNameValidator} from './regExpressions.js';

// {useContext}

export function EditRubrique(props){
    const [item,setItem]=useState({titre:props.item.titre,redaction:props.item.redaction})

    function handleChange(event){
        let nom=event.target.name
        setItem({...item,[nom]:event.target.value})
    }
    const handleRegister=()=>{
        let title=item.titre
        UpdateProps('/api/rubriques/'+title,item)
    }
    // const itemContext=useContext(props.EditContext)
    return <form style={{width:"91%",minHeight:"80%",padding:"1em",margin:"0px"}}>
        {/* <h3 style={{color:"brown",letterSpacing:"3px",margin:"0px",padding:"1em 0px",textDecoration:"4px underline brown"}}>Modification de Rubrique</h3> */}
        <label style={{width:"80%",height:"1.5em",padding:"1em",margin:"1em"}}>Nom de la rubrique <span id="titreCahe" style={{color:"rgba(0,0,0,.2)",fontSize:"1px"}}>{props.item.titre}</span></label>
        <input name="titre" type="text" style={{width:"80%",height:"1.5em",padding:"1em",margin:"1em"}} value={item.titre} onChange={handleChange} />
        <textarea name="redaction" value={item.redaction} style={{width:"95%",height:"250px",backgroundColor:"rgba(0,0,0,.6)",color:"white",fontWeight:"bold",padding:"1em",fontSize:"20px",}} onChange={handleChange}></textarea>
        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
            <button className="succesButton" onClick={handleRegister}>Valider</button>
            <button className="dangerButton" onClick={()=>{}}>Abandonner</button>
        </div>
    </form>
}

export function EditChantier(props){
    const item=props.item
    function handleChange(element,valeur){props.render(element,valeur)} // props.render({...item,[element]:valeur})
    
    return <form style={{width:"91%",minHeight:"80%",padding:".5em",margin:"0px",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
        <Input name="name de l'établissement" width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <Input name="region" list width="70%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <Input name="departement" list width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <Input name="type" list width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <div  style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
        <Input name="Date début" width="60%" margin="1em 0px" type="date" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <Input name="date fin" width="60%" margin="1em .5em" type="date" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        </div>
        <label style={{width:props.width,height:"1.5em",padding:"1em 0px",margin:"0px",fontWeight:"bold",letterSpacing:"2px",textDecoration:"2px underline dotted brown"}}>🔸Présentation de l'établissement</label>
        <textarea name="presentation de l'établissement" value={item.presentation} style={{width:"90%",height:"200px",backgroundColor:"rgba(0,0,0,.6)",color:"white",fontWeight:"bold",padding:"1em",fontSize:"20px",margin:"0px"}} onChange={(e)=>handleChange('presentation',e.target.value)}></textarea>
        <Input display="none"  name="Etat des lieux(images)"  width="0px" margin="1em 0px" type="file" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <>{props.children[0]} </>
        <>{props.children[1]} </>
        <Input display="none"  name="Rendu de l'ouvrage(images)" width="0"  margin="1em 0px" type="file" item={item} render={(elem,val)=>handleChange(elem,val)}/>
        <>{props.children[2]} </>
        <label style={{width:props.width,height:"1.5em",padding:"1em 0px",margin:"0px",fontWeight:"bold",letterSpacing:"2px",textDecoration:"2px underline dotted brown"}}>🔸Bilan & perspectives sur l'activité</label>
        <textarea name="Bilan" value={item.bilan} style={{width:"90%",height:"200px",backgroundColor:"rgba(0,0,0,.6)",color:"white",fontWeight:"bold",padding:"1em",fontSize:"20px",margin:"0px"}} onChange={(e)=>handleChange('bilan',e.target.value)}></textarea>
        <DataListDepartements/>
        <>{props.children[3]} </>
    </form>
}

export function Input(props) {
    const item=props.item;
    let name=props.name,Valeur='',prop=name.split(" ")[0];
    if(name.toUpperCase().includes('DATE')){
        if(name.includes('fin')){Valeur=item.dates.fin}
        else{Valeur=item.dates.debut}
    }else{Valeur=item[prop];}
    
    // alert(prop)
    function handleChange(event){
        let element=(event.target.name).split(" ")[0];
        props.render(element,event.target.value)
    }

    const idd=props.name.split(" ")[0];

    useEffect(()=>{
        let inputList=document.getElementById(idd)
        if (props.list){
            inputList.setAttribute('list','departements');
            }
        },);

  return (
    <div>
        <label style={{width:props.width,height:"1.5em",padding:"1em 0px",color:"rgba(0,0,0,.6)",margin:props.margin,letterSpacing:"2px",textDecoration:"2px underline dotted brown"}}>🔸{props.name} <span id="titreCahe" style={{color:"rgba(0,0,0,.2)",fontSize:"1px"}}>{props.item.titre}</span></label>
        <input  id={props.name.split(" ")[0]} multiple={props.multiple} name={props.name} type={props.type} style={{width:props.width,letterSpacing:"2px",height:".5em",display:""+props.display,padding:"1em",fontWeight:"bold",margin:props.margin}} value={Valeur} onChange={handleChange} />
    </div>
  )
}

export function InputMembre(props){
    const nom=props.name.split(" ")[0]
    function handleChange(event){
        let element=(event.target.name).split(" ")[0];
        props.render(element,event.target.value)}
        const idd=nom;
        useEffect(()=>{
            let inputList=document.getElementById(idd)
            if (props.list){
                let idList=idd==='Département'?'departements':'Equipes'
                inputList.setAttribute('list',idList);
                }
            },);
  return <div style={{display:"flex",flexDirection:"column"}}> 
  {/* 0em etait 1em ,padding:"0px 1em" padding:"0em 0px"*/}
        <label style={{width:props.width,height:"1.5em",padding:"0em 0px",margin:"0px",letterSpacing:"2px",color:"rgba(0,0,0,.6)",textDecoration:"2px underline dotted brown"}}>🔸{props.name} <span id="titreCahe" style={{color:"rgba(0,0,0,.2)",fontSize:"1px"}}>{props.item.titre}</span></label>
        <input value={props.value} id={nom} name={props.name} type={props.type} style={{width:props.width,height:"2em",padding:"0px 1em",fontWeight:"bold",fontSize:".9em",letterSpacing:"2px",margin:props.margin}} onChange={handleChange} />
        <p id={nom+'msgValidation'}  style={{height:"fit-content",width:"fit-Content",fontWeight:'bold',fontSize:'.8em',margin:'0px 12%',marginBottom:'10px',padding:'0px'}}></p>
    </div>
}

function ToggleButton(props) {
    const prop=props.prop
    const membreChef=props.item.chef==='non'?false:true;
    const membreStatu=props.item.statu==='v'?false:true;
    const membreProfil=props.item.profil==='administrateur'?true:false;
    let sToggled;
        switch (prop){
            case "chef":
                sToggled=membreChef;
                break
            case "statu":
                sToggled=membreStatu;
                break
            default:
                sToggled=membreProfil;
        }
    // const sToggled=props.prop==='statu'?membreStatu:membreProfil;
    const [isToggled, setIsToggled] = useState(sToggled);
    const handleToggle = () => {
        document.getElementById('buttons').style.display='flex';
        const chefVal=!isToggled ? 'oui':'non';
        const statuVal=!isToggled ? 'x':'v';
        const profilVal=!isToggled ? 'administrateur':'standard';
        let toggled;
        switch (prop){
            case "chef":
                toggled=chefVal;
                break
            case "statu":
                toggled=statuVal;
                break
            default:
                toggled=profilVal;
        }
        // const toggled=prop==='statu'?statuVal:profilVal;
        props.render({index:prop,toggled:toggled});
        setIsToggled(!isToggled);
    };
    let colorToggled=isToggled ?'red':'green';
    let backgrndColor=props.prop==='statu'?colorToggled:'rgba(0,0,0,.5)';
    const style={
        backgroundColor: backgrndColor,
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1em',
        height: '2em',
        padding:'.5em',
        margin:'Opx 1em',
        width:'fit-content',
        border:'.1px solid #fff',
        borderRadius:'5px',
    }
    function toggledButton(val){
        switch(val){
            case "chef":
                return "OUI";
            case "statu":
                return "BLOQUÉ(E)";
            default:
                return "ADMINISTRATEUR";
        }
    }
    function notToggledButton(val){
        switch(val){
            case "chef":
                return "NON";
            case "statu":
                return "DÉBLOQUÉ(E)";
            default:
                return "STANDARD";
        }
    }
    return <button style={style} onClick={handleToggle}>
          {isToggled ? toggledButton(prop) : notToggledButton(prop)}
        </button>;
  }
export function EditMembreAdmin(props) {
    const [state,setState]=useState({statu:props.item.statu,profil:props.item.profil,chef:props.item.chef})
    const item=props.item;
    function handleChange(obj){
        const element=obj.index;
        setState({...state,[element]:obj.toggled})
    }
    function handleClick(){
        const pseudo=item.pseudo;
        UpdateProps('/api/membres/admin/'+pseudo,state);

    }
    const nomComplet=item.firstName + ' ' + item.lastName
    const image=item.galeriePrive.imgPublic
    const root=image===''?'avatar.webp':image;
    const src=require('./images/'+root)
    return <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
        <div style={{margin:"20px 0px",padding:"0px 20%",width:"60%"}}>
            <img src={src} alt='membre courant' style={{width:"100%",height:"200px"}}/>
            <span style={{fontSize:'1em',fontWeight:'bold'}}>{nomComplet}</span>
        </div>
        <div style={{borderTop:"0.5px solid #111",height:'3em',padding:'1em',margin:'2em 0px',marginBottom:'.5em',display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:'center'}}>
            <span style={{height:'2em',width:'fit-content',padding:'.5em 5px',margin:'0px',fontSize:'1em',fontWeight:'bold'}}>🔴Statu du membre :</span>
            <ToggleButton render={(obj)=>handleChange(obj)} item={item} prop='statu'/>
        </div>
        <div style={{borderTop:"0.5px solid #111",height:'3em',padding:'1em',margin:'1em 0px',marginTop:'0',display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:'center'}}>
            <span style={{height:'2em',width:'fit-content',padding:'.5em 5px',margin:'0px',fontSize:'1em',fontWeight:'bold'}}>🔴Profil du membre :</span>
            <ToggleButton render={(obj)=>handleChange(obj)} item={item} prop='profil'/>
        </div>
        <div style={{borderTop:"0.5px solid #111",height:'3em',padding:'1em',margin:'1em 0px',marginTop:'0',display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:'center'}}>
            <span style={{height:'2em',width:'fit-content',padding:'.5em 5px',margin:'0px',fontSize:'1em',fontWeight:'bold'}}>🔴Nommé chef de projet ?</span>
            <ToggleButton render={(obj)=>handleChange(obj)} item={item} prop='chef'/>
        </div>
        <div id="buttons" style={{borderTop:"0.5px dotted #111",width:"100%",flexDirection:"row",justifyContent:"flex-start"}}>
            <button className="succesButton" onClick={handleClick}>Valider</button>
            <button className="dangerButton" onClick={()=>props.render(false)}>Abandonner</button>
        </div>

    </div>
}
export function EditMembre(props){
    const [item,setItem]=useState({Prénom:props.item.firstName,
                                    Nom:props.item.lastName,
                                    Surnom:props.item.alias,
                                    Département:props.item.departementDOrigine,
                                    Date:props.item.dateAnniversaire,
                                    Téléphone:props.item.telephoneNumber,
                                    Formation1:props.item.formation1,
                                    Formation2:props.item.formation2,
                                    Equipe:props.item.tngroupe
                                })
    
    const [validite,setValidite]=useState({
                                    Prénom:true,
                                    Nom:true,
                                    Surnom:true,
                                    Département:true,
                                    Date:true,
                                    Téléphone:true,
                                    Formation1:true,
                                    Formation2:true,
                                    Equipe:true,
                                })
    const VALIDITE=validite.Prénom && validite.Nom && validite.Surnom && validite.Département && validite.Date&& validite.Téléphone && validite.Formation1 && validite.Formation2 && validite.Equipe

    //
    function validatorSwitch(propriete){
        switch (propriete){
            case "Date":
                return dateValidator;
            case "Téléphone":
                return phoneValidator;
                case "Nom":
                    return lastNameValidator;
            default:
                return nameValidator;
            }}
    function handleChange(element,valeur){
        document.getElementById('zoneAlert').display='none';
        let id=element+"msgValidation";
        let para=document.getElementById(id);

        if(!validatorSwitch(element).test(valeur)){ // Controle de l'ENTREE pour les champs autres que "Sexe"
            if((element==="Date" || element==="Formation1" || element==="Formation2" || element==="Equipe" || element==="Surnom") && valeur===''){
                setItem({...item,[element]:valeur})
                setValidite({...validite,[element]:true});
                para.innerText='';
            }else{
                para.style.color="red";                         // ENTREE invalide
                para.innerText='x '+element.toUpperCase()+' null !';
                setItem({...item,[element]:valeur})
                setValidite({...validite,[element]:false});
            }
        }else{                                              //ENTREE valide
            para.innerText=''; 
            setItem({...item,[element]:valeur})
            setValidite({...validite,[element]:true});
        }
    }
    //
    const pseudo = props.item.pseudo
    const handleValide=()=>{
        if(VALIDITE){
            UpdateProps('/api/membres/'+pseudo,item)
        }else{
            const alert=document.getElementById('zoneAlert')
            alert.style.display='block';
            alert.innerText="Validation interrompue: Il y'a des entrées non conformes."
        }
    }
    // const itemContext=useContext(props.EditContext)

    return <form id="changeUserForm" style={{width:"91%",minHeight:"80%",padding:"1em",margin:"0px",display:"flex",alignItems:"flex-start"}}>
        <div className="changeUserForm2" style={{margin:"0",padding:"0",height:"100%"}}>
            <InputMembre value={item.Prénom} required name="Prénom" width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Nom} required name="Nom" width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Surnom} name="Surnom (alias)" width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Date} name="Date d'anniversaire" width="60%" margin="1em 0px" type="date" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Département} required name="Département d'origine" list width="80%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            {/* <div  style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start"}}> */}
        </div>
        <div className="changeUserForm2" style={{margin:"0",padding:"0",height:"100%"}}>
            <InputMembre value={item.Téléphone} required name="Téléphone" width="60%" margin="1em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Formation1} name="Formation1 initiale" width="60%" margin="1em .5em" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            {/* </div> */}
            <InputMembre value={item.Formation2} name="Formation2 qualifiante"  width="80%" margin=".5em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <InputMembre value={item.Equipe} list name="Equipe TN" width="80%"  margin=".5em 0px" type="text" item={item} render={(elem,val)=>handleChange(elem,val)}/>
            <p id='zoneAlert'  style={{height:"fit-content",color:"white",backgroundColor:'red',display:"none",width:"fitContent",fontWeight:'bold',fontSize:'.8em',margin:'0px 12%',marginBottom:'10px',padding:'0px'}}></p>
            <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                <DataListDepartements/>
                <DataListEquipes/>
                <button className="succesButton" onClick={handleValide}>Valider</button>
                <button className="dangerButton" onClick={()=>props.render(false)}>Abandonner</button>
            </div>
        </div>
        
          
    </form>
}
