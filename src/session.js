import React,{useState,useLayoutEffect} from 'react';
import ReactModal from 'react-modal';
import {useSelector} from 'react-redux';  //Le HOOK GETTER POUR LE CAS DE @REDUX/TOOLKIT
import {Link,Outlet} from 'react-router-dom';
import {UpdateProps} from './requetesFetch.js';
import {EditMembre} from './editionsOfItems.js';
import {DataListEquipes} from './dataListes.js';
import Connexion from './connexion.js'
import './session.css';
import {compressImage,convertToBase64,dataURLtoFile} from './traitementImages.js';

const logo=require('./images/logo_niintche_blanc.ico')
const Cession=()=>{
    const loggedInUser=useSelector((state)=>{ return state.userNewCh.loggedInUser})
    if(loggedInUser===null){
        return <Connexion/> 
    }else{
        return <Session/> 
    }
}
const Session=()=>{
    const [modalDisplay,setModalDisplay]=useState({showModal:false,imgKey:''})
    const [link,setLink]=useState("/compte/nouveauChantier")
    const loggedInUser=useSelector((state)=>{
        return state.userNewCh.loggedInUser
    })  //le GETTER dans le cas du @redux/toolkit
    const {id,pseudo,firstName, galeriePrive,profil,chef}=loggedInUser
    const avatar='avatar.webp';
    let imageProfil=galeriePrive.imgPublic!==''?galeriePrive.imgPublic:avatar;
    let imgProfil=require('./images/'+imageProfil);
    useLayoutEffect(()=>{
            document.getElementsByClassName('header')[0].style.display="none";
            if(profil==='administrateur'){
            document.querySelector('#admin').style.display="inline-block";
            if(chef==="non"){
                setLink("/compte/pagesceo")
            }};
    },[chef,profil])
    // Pour afficher et/ou fermer la fenetre modale et identifiant de l'image selectionnée(=imgKey)
    const [modalDisplaye,setModalDisplaye]=useState({showModal:false,imgKey:'imgPublic'})
    // Pour stocker le nom (lien=imgName) de l'image selectionée et l'extention de la nouvelle image(=fileExt)
    // const [imgName,setImgName]=useState({fileExt:''})
    // {images} pour dire le fichier image(j'eprouve une peine de pouvoir l'exprimer dans un format objet avec prop: ça ne satifait pas mes besoins )
    const [compressedFile,setCompressedFile]=useState(null)
    // Données à utiliser à l'enregistrement(la requete fetch aux trois parametres sur les membres à utiliser)
        // const pseudo=props.pseudo
    const fileName={nameToSave:'membre'+id+'imgPublic.jpg'}
    let Url='/api/membres/'+pseudo+'/galeriePrive/imgPublic'
    let image=galeriePrive.imgPublic
    let src=image!==''?require('./images/'+image):require('./images/logo_niintche.webp') // =à l'ouverture de l'appli || au click de l'icone
    // Switch ON du Modal (le switch OFF est mis INLINE)
    const handleInputChange=async (e)=>{
        const input =e.target;
        if (input.files && input.files[0]) {
            let file=input.files[0]
            const base64Image = await convertToBase64(file);
            const compressedImage = await compressImage(base64Image,1);
            // setCompressedImage(compressedImage)                            //commentée:derniere touche
            const compressedFile=dataURLtoFile(compressedImage,file.name)
            setCompressedFile(compressedFile)
            const reader = new FileReader();
              reader.onload = function (e) {
                const image = document.getElementById('inputChangeImg');
                image.src = compressedImage //compressedImage ;
              };
            // const fileName = file.name;
            // const fileExtension = fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
            // setImages(file)
            // setImgName({fileExt:fileExtension})
            // const reader = new FileReader();
            // reader.onload = function (e) {
            // const image = document.getElementById('inputChangeImg');
            // image.src = e.target.result;
            // };
            reader.readAsDataURL(input.files[0]);
        }
    }
    const handleModalClick=()=>{
        const formData = new FormData();
        formData.append('images', compressedFile);
        const img=image.split('.')[0]
        fetch('/uploadimage/'+img+'/images', {
            method: 'POST',
            body: formData,
            })
            .then(response => response.json())
            .then(data => {
            console.log(data); // Réponse JSON du serveur
            })
            .catch(error => {
            console.error(error);
            });
        UpdateProps(Url,fileName)
        setModalDisplaye({showModal:false,imgKey:''});
    }
// const imgProfilWidth=document.getElementById("imgProfil").style.maxWidth
const imgProfilStyle={
        maxWidth:"60px",
        height:"88%",
        minHeight:"88%",
        borderRadius:"50%",
        margin:"0px 3px"}
  return (
    <div className="divBody">
        <div id="header-inscript">
            <div style={{width:"90%",right:"7%",left:"3%",height:"84%",position:"absolute",display:"flex",flexDirection:"row",padding:"0%",top:"8%"}}>
                <div style={{display:"flex",flexDirection:"row",width:"50%",minWidth:"fit-content",maxWidth:"250px",height:"100%",padding:"0px",margin:"0px",alignItems:"center",justifyContent:"flex-start",backgroundColor:"white",borderRadius:"20% 4% 4% 20%"}}>
                    <img src={imgProfil} onClick={()=>setModalDisplaye({showModal:true,imgKey:'imgPublic'})} alt="profil" id="imgProfil" style={imgProfilStyle}/>
                    <ReactModal
              isOpen={modalDisplaye.showModal}
              style={{
                        overlay: {
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        },content: {
                      position: 'absolute',
                      top: '15vh',
                      right: '8vw',
                      bottom: '40vh',
                      border: '1px solid #ccc',
                      background: 'white',
                      width:'80vw',
                      maxWidth:'300px',
                      height:'100vw',
                      maxHeight:'500px',
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      borderRadius: '4px',
                      outline: 'none',
                      padding: '2vw',
                      paddingTop:"0px",
                    }}}
              >
                <div style={{padding:'10px 0px', display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <span style={{width:'90%',textAlign:'right',paddind:'0px',paddingBottom:'15px',margin:'5px',borderBottom:'.5px solid brown'}}><i className="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>setModalDisplaye({showModal:false})}></i></span>
                    <p style={{padding:'0px',color:'rgba(0,0,0,.5)',margin:'0px',marginBottom:'15px',textAlign:'center',width:'fit-content',fontSize:'10px'}}>Changer l'image {"props.params.lien"}</p>
                    <img src={src} id='inputChangeImg' style={{width:'55vw',height:'55vw',margin:'5px',padding:'0px'}} alt='imageAChanger'/>
                    <input  style={{marginBottom:'20px'}} type='file' name='images' accept='image/*' onChange={(e)=>handleInputChange(e)}/>
                    <button style={{width:'80%',border:'.5px solid brown',borderRadius:'5px',height:'30px',color:'white',fontSize:'18px',fontWeight:'bold',backgroundColor:'rgba(200,0,0,.6)',BorderRadius:'90px'}} onClick={handleModalClick}>Terminer</button>
                </div>
                    </ReactModal>
                    <ReactModal
                        isOpen={modalDisplay.showModal}
                        style={{
                                overlay: {
                                position: 'fixed',
                                top: 55,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                zIndex:999,
                                },content: {
                            position: 'absolute',
                            top: '-50px',
                            left: '2.5%',
                            right: '2.5%',
                            bottom: '0px',
                            border: '1px solid #ccc',
                            background: 'white',
                            width:'92%',
                            maxWidth:'100%',
                            // height:'100%',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '2%',
                            paddingTop:"0px",
                            zIndex:1000,
                            }}
                            }
                            // overlayClassName="overlayChangeUser"
                            className="contentClassName"

                        >
                        <div style={{padding:'10px 0px', display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <div style={{width:"92%",paddingBottom:'15px',margin:'5px',borderBottom:'.5px solid brown',display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                                <h3 style={{color:"brown",width:"90%",letterSpacing:"3px",margin:"0px",padding:".4em 0px",textDecoration:".2px underline brown"}}>Modification de profil</h3>
                                <span style={{width:'5%',textAlign:'right',paddind:'0px'}}><i class="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>setModalDisplay({showModal:false})}></i></span>
                            </div>
                            <EditMembre render={()=>setModalDisplay({showModal:false})} item={loggedInUser}/>
                        </div>
                    </ReactModal>
                    <span style={{display:"flex",flexDirection:"column"}}>
                        <h5 id="detail2" style={{padding:"0px",margin:"0px",marginTop:"5%"}}><Link to="/compte/">{firstName.split(" ")[0]}</Link><i class="far fa-edit" style={{margin:"15px",color:"rgba(0,0,200,.8)"}} onClick={()=>setModalDisplay({showModal:true})}></i></h5>
                        <Link to='/connexion' style={{display:"inline-block",width:"70%",padding:"5px 8px",margin:"0px",height:"40%",paddingBottom:"10%"}}>Déconnexion</Link>
                    </span>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"40%",height:"90%",padding:"0px",margin:"0px",alignItems:"flex-end",justifyContent:"center",position:"absolute",right:"4px"}}>
                    <img src={logo} alt="teamNiintche" style={{maxWidth:"100px",height:"80%",padding:"0px",margin:"0px"}}/>
                    <Link id="admin" to={link} style={{width:"fit-content",padding:"0px",margin:"0px",fontWeight:"bold",marginTop:"3px",textDecoration:"none"}}>⚪ADMINIS...</Link>
                </div>
            </div>
        </div>
        <Outlet/>
    </div>
  )
}

export function CompteBody(props) {
    const [notes,setNotes]=useState({notes:props.notes,notesConfid:props.notesConfid})
    let placeholder1="Graciez nous de la richesse de votre cursus et de votre palmarès ici, la @teamniintche vous remercie d'avance... 🥰"
    let placeholder2="Insformations et vos suggestions ici ..."
    const UpdateMembre=(prop)=>{
        let pseudo=props.pseudo
        fetch('/api/membres/galerie/'+pseudo+'/'+prop, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(notes)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Erreur lors de la requête PUT');
              }
            })
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
    }
    function UpdateNotesConfidAndSave(obj){
        if(obj.bool==='true'){
            // fetch function:envoi des modifs sur confidentiel à la BD
            UpdateMembre('confidentiel')
        }else{
            //Mise à jour du state(confidentiel)
            setNotes({...notes,notesConfid:obj.val})
        }
    }
    function UpdateNotesAndSave(obj){
        if(obj.bool==='true'){
            // fetch function:envoi des modifs sur apropos=public à la BD
            UpdateMembre('apropos')
        }else{
            //Mise à jour du state (apropos)
            setNotes({...notes,notes:obj.val})
        }
    }
    return (
    <main id="a-propos">
        <p id="p" style={{color:"rgba(200,0,0,.8)",fontWeight:"bold",fontSize:"20px"}}>Pour mieux se connaitre, parlez nous de vous👇</p>
        <EspaceNotes notes={notes.notes} ids={{id1:"valide",id2:"nonValide",id3:"enregistrer",id4:"notes",id5:"textarea-icons",id6:"public"}} render={(obj)=>UpdateNotesAndSave(obj)} placeholder={placeholder1}/>
        <fieldset id="fieldset2">
            <legend id="indiv-legend-general">A propos de vous pour mieux prévoir</legend>
            <p>Ces informations suivantes de vous seront confidentielles. Par consequent elles ne seront vues que par les responsables strictes de la <Link to="">@teamniintche</Link> uniquement pour pouvoir prendre en compte votre situation et votre opinion dans l'organisation et dans le partage du travail. La team vous prie de bien vouloir les aider à mieux gérer le personnel lors de ses activités y comprises vos suggestions aux responsables. Merci de votre comprehention.</p>
        </fieldset>
        <EspaceNotes notes={notes.notesConfid} ids={{id1:"valideConfid",id2:"nonValideConfid",id3:"enregistrerConfid",id4:"notesConfid",id5:"textarea-iconsConfid",id6:"confid"}} render={(obj)=>UpdateNotesConfidAndSave(obj)} placeholder={placeholder2}/>
    </main>
    )
    }

export function EspaceNotes(props) {
    const [registerObject,setRegisterObject]=useState({val:props.notes,bool:'false'})
    let id1=props.ids.id1
    let id2=props.ids.id2
    let id3=props.ids.id3
    let id4=props.ids.id4
    let id5=props.ids.id5
    let id6=props.ids.id6
    // let notes=props.notes
    function handleEnregistrerClick() {
        if(document.getElementById(id2).style.display==="inline"){
            // bool(identifiant de fonct responsable) est du fait que les 2 fonct utilisent la meme fonction terminale pour transferer les données
            setRegisterObject({...registerObject,bool:'true'})
            props.render({...registerObject,bool:'true'}) 
        }
        document.getElementById(id2).style.display="none";
        document.getElementById(id1).style.display="inline";
        }
    function handleTextareaChange(event){
        document.getElementById(id2).style.display="inline";
        document.getElementById(id1).style.display="none";
        // props.render(document.getElementById(id3).value)
        // alert(document.getElementById(id4).value)
        let val=document.getElementById(id4).value;
        setRegisterObject({...registerObject,val:val})
        // alert(registerObject.val)
        props.render({...registerObject,val:val})
        }
  return (
    <div id={id6} style={{margin:"0px",padding:"0px",width:"100%",height:"fit-content",border:"0px"}} >
        {props.children}
        <div id={id5} >
            <Link><i className="fas fa-save" id={id3} onClick={()=>{handleEnregistrerClick()}}></i></Link>
            <i className="fas fa-xmark" id={id2} style={{color:"rgba(200,0,0,.6)"}}></i>
            <i className="fas fa-check" id={id1} style={{color:"rgba(0,100,0,.8)"}}></i>
        </div>
        <textarea  value={registerObject.val} name="textarea-notes" id={id4} cols="" rows="15" placeholder={props.placeholder} onChange={()=>handleTextareaChange()}></textarea>
    </div>
  )
}

export const FieldsetCompte=()=>{//{ loggedInUser }
    const loggedInUser=useSelector(state=>state.userNewCh.loggedInUser)  //le HOOK GETTER dans le cas du @redux/toolkit
    const {pseudo,formation1,formation2,apropos,confidentiel,qualification,tngroupe}=loggedInUser
    const [equipe,setEquipe]=useState(tngroupe)
    const handleChange=(e)=>{
        setEquipe(e.target.value)
    }
    // constructor(props) {
    //     super(props);
    //     // this.handleScroll=this.handleScroll.bind(this);
    //     // this.setClass1=this.setClass1.bind(this);
    //     // this.setClass2=this.setClass2.bind(this);
    //     // this.setClass3=this.setClass3.bind(this);
    // }

//     componentDidMount() {
//         window.addEventListener('scroll', this.handleScroll);
//       }
    
//       componentWillUnmount() {
//         window.removeEventListener('scroll', this.handleScroll);
//       }
    
//   handleScroll=()=>{
//             const scrollTop = window.scrollY;
//             if (scrollTop===10) {
//                 alert('ya quoi')
//                 document.getElementById('pcg').style.position="fixed";
//                 document.getElementById('pcg').style.marginTop=scrollTop;
//             }else{
//             }}
// setClass1=()=>{
// document.getElementById('aPublic').setAttribute('class', 'aActive');
// document.getElementById('aConfid').removeAttribute('class');
// document.getElementById('aGalerie').removeAttribute('class');
// }
// setClass2=()=>{
//     document.getElementById('aPublic').removeAttribute('class');
//     document.getElementById('aConfid').setAttribute('class','aActive');
//     document.getElementById('aGalerie').removeAttribute('class');
// }
// setClass3=()=>{
    
// }
    function publicOnly(){
        document.getElementById('p').style.display="block";
        document.getElementById('public').style.display="block";
        document.getElementById('fieldset2').style.display="none";
        document.getElementById('confid').style.display="none";
        document.getElementById('galerie').style.display="none";

        }
    function confidOnly(){
        document.getElementById('p').style.display="none";
        document.getElementById('public').style.display="none";
        document.getElementById('fieldset2').style.display="block";
        document.getElementById('confid').style.display="block";
        document.getElementById('galerie').style.display="none";
        }
    function galerieOnly(){
        document.getElementById('p').style.display="none";
        document.getElementById('public').style.display="none";
        document.getElementById('fieldset2').style.display="none";
        document.getElementById('confid').style.display="none";
        document.getElementById('galerie').style.display="grid";
        }
  return (
    <div className="divtech">
        <section id="section">
            
            <fieldset id="fieldset-profil">
                <legend id="indiv-legend-p">Autres infos de profil</legend>
                <article>
                    <label for="format-1">Formation 1</label>
                    <input locked className="fieldset-profil-input" value={formation1} type="text" name="format-1"/>
                </article>
                <article>
                    <label for="format-2">Formation 2</label>
                    <input locked className="fieldset-profil-input" value={formation2} type="text" name="format-2"/>
                </article>
                <article>
                    <label for="profession">Profession</label>
                    <input locked className="fieldset-profil-input" value={qualification} type="text" name="profession"/>
                </article>
                <article>
                    <label for="equipe">Equipe de travail</label>
                    <input  className="fieldet-profil-equipe" value={equipe}type="list" list="Equipes" name="equipe" onChange={handleChange}/>
                    <DataListEquipes/>
                </article>
            </fieldset>
            <div id="sessionDroite" style={{margin:"0",padding:"0",height:"fit-content",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <ul id="pcg">
                    <li><Link id="aPublic" onClick={()=>publicOnly()}>Public</Link></li>
                    <li><Link id="aConfid" onClick={()=>confidOnly()}>Confidentiel</Link></li>
                    <li><Link id="aGalerie" onClick={()=>galerieOnly()}>Galérie</Link></li>
                </ul>
                <CompteBody pseudo={pseudo} notes={apropos} notesConfid={confidentiel}/>
                {/* <ConnectedGalerie/> */}
                <Galerie/>
            </div>
        </section>
    </div>
  )
}

export const ancien=<div className="divtech">
<section id="section">
        {/* <div id="profil">
            <div id="entete-profil">
                <img src="../images/fondfoto.jpg" alt="Photo membre" id="photo-membre"/>
                <div id="details-indiv">
                   <p id="detail1"><span id="span-alias">Alias</span><a href=""><i class="fas fa-edit"></i></a></p>
                   <p id="detail2">nom complet <i class="far fa-thumbs-up"></i></p>
                    <p id="detail3">Qualification</p>
                </div>
            </div> */}
            {/* <div id="indiv-autres"> */}
            <fieldset id="fieldset-profil">
                <legend id="indiv-legend-p">Autres infos de profil</legend>
                {/* <!-- <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur aliquam enim doloribus blanditiis, libero quam. Rem tempora laudantium dolore minus adipisci.</p> --> */}
                <article>
                    <label for="format-1">Formation 1</label>
                    <input type="text" name="format-1"/>
                </article>
                <article>
                    <label for="format-2">Formation 2</label>
                    <input type="text" name="format-2"/>
                </article>
                <article>
                    <label for="profession">Profession</label>
                    <input type="text" name="profession"/>
                </article>
                <article>
                    <label for="equipe">Equipe de travail</label>
                    <input type="list" list="Equipes" name="equipe"/>
                    <datalist id="Equipes">
                        <option value="Maçonnerie"></option>
                        <option value="Carrelage"></option>
                        <option value="Menuiserie metalique"></option>
                        <option value="Menuiserie bois"></option>
                        <option value="Electricité"></option>
                        <option value="Plomberie"></option>
                        <option value="Cuisine"></option>
                        <option value="Peinture"></option>
                        <option value="Autre"></option>
                    </datalist>
                </article>
            </fieldset>
    <ul id="pcg">
        <li><Link to="/compte/personnel/" active>Public</Link></li>
        <li><Link to="/compte/personnel/confidentiel">Confidentiel</Link></li>
        <li><Link to="/compte/personnel/galerie">Galérie</Link></li>
    </ul>
    <Outlet/>
    </section>
</div>

function Galerie() {//{loggedInUser}
    const loggedInUser=useSelector(state=>state.userNewCh.loggedInUser) //le HOOK GETTER dans le cas du @redux/toolkit
    const {imgPublic,imgPrive,imgPublic1,imgPublic2}=loggedInUser.galeriePrive
    const {id,pseudo}=loggedInUser
    const imageLogo='logo_niintche_blanc.ico'
    let image1=imgPublic!==''?imgPublic:imageLogo;
    let image2=imgPrive!==''?imgPrive:imageLogo;
    let image3=imgPublic1!==''?imgPublic1:imageLogo;
    let image4=imgPublic2!==''?imgPublic2:imageLogo;
    let img1=require('./images/'+image1)
    let img2=require('./images/'+image2)
    let img3=require('./images/'+image3)
    let img4=require('./images/'+image4)
  return (
    <div id="galerie" style={{margin:"0px",padding:"10px 0px",width:"90%",height:"fit-content",border:"0px",display:"grid",gridTemplateColumns:"50% 50%"}}>
        <Img Key='imgPublic' Id={id} params={{lien:imgPublic,pseudo:pseudo}}src={img1}/>
        <Img Key='imgPrive' Id={id} params={{lien:imgPrive,pseudo:pseudo}} src={img2}/>
        <Img Key='imgPublic1' Id={id} params={{lien:imgPublic1,pseudo:pseudo}} src={img3}/>
        <Img Key='imgPublic2' Id={id} params={{lien:imgPublic2,pseudo:pseudo}} src={img4}/>
    </div>
  )
}

export function Img(props) {
    // Pour afficher et/ou fermer la fenetre modale et identifiant de l'image selectionnée(=imgKey)
    const [modalDisplay,setModalDisplay]=useState({showModal:false,imgKey:''})
    // {image} pour dire lien de l'image; à utiliser pour reconduire le nom de l'ancienne image à la nouvelle image
    const [image,setImage]=useState({image:'',pseudo:props.params.pseudo}) 
    // Pour stocker le nom (lien=imgName) de l'image selectionée et l'extention de la nouvelle image(=fileExt)
    const [imgName,setImgName]=useState({imgName:'',fileExt:''})
    // {images} pour dire le fichier image(j'eprouve une peine de pouvoir l'exprimer dans un format objet avec prop: ça ne satifait pas mes besoins )
    // const [images,setImages]=useState(null)
    // Données à utiliser à l'enregistrement(la requete fetch aux trois parametres sur les membres à utiliser)
    // const [compressedImage, setCompressedImage] = useState(null); //commentée:derniere touche
    const [compressedFile, setCompressedFile] = useState(null);

        const pseudo=image.pseudo
        const sProp=modalDisplay.imgKey
        const fileName={nameToSave:imgName.imgName+'.'+imgName.fileExt}
        let Url='/api/membres/galerie/'+pseudo+'/'+sProp //'/api/membres/'+pseudo+'/'+prop+'/'+sProp
    // 
    let src=image.image!==''?require('./images/'+image.image):require('./images/logo_niintche.webp') // =à l'ouverture de l'appli || au click de l'icone
    // Switch ON du Modal (le switch OFF est mis INLINE)
    const handleModalShow=()=>{
        setImage({...image,image:props.params.lien})
        setModalDisplay({showModal:true,imgKey:props.Key})}
    // Au chargement d'une nouvelle image
    // const handleInputChange=(e)=>{
    //     // const image = document.getElementById('inputChangeImg');
    //     const input =e.target;
    //     if (input.files && input.files[0]) {
    //         let file=input.files[0]
    //         let nomImage='membre'+props.Id+props.Key
    //         const fileName = file.name;
    //         const fileExtension = fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
    //         // setImages(file)
    //         setImgName({imgName:nomImage,fileExt:fileExtension})

    //       const reader = new FileReader();
    //       reader.onload = function (e) {
    //         const image = document.getElementById('inputChangeImg');
    //         image.src = e.target.result;
    //       };
    //       reader.readAsDataURL(input.files[0]);
          
    //     }
    // }
    const handleInputChange = async (event) => {
        const input =event.target;
        if (input.files && input.files[0]) {
            let file=input.files[0]
            let nomImage='membre'+props.Id+props.Key
            setImgName({imgName:nomImage,fileExt:'jpg'})
            //qualité des images fonction de l'image
            let n=null,wH=null
            if(props.Key==='imgPublic'){n=1;wH=300;}else{n=0.5;wH=150}
        const base64Image = await convertToBase64(file);
        const compressedImage = await compressImage(base64Image,n,wH);
        const compressedFile=dataURLtoFile(compressedImage,file.name)
        setCompressedFile(compressedFile)
        const reader = new FileReader();
          reader.onload = function (e) {
            const image = document.getElementById('inputChangeImg');
            image.src = compressedImage //compressedImage ;
          };
          reader.readAsDataURL(input.files[0]);
        }
};
const handleModalClick=()=>{
    const formData = new FormData();
    formData.append('images', compressedFile); 
    fetch('/uploadimage/'+imgName.imgName+'/images', {
        method: 'POST',
        body: formData,
        })
        .then(response => response.json())
        .then(data => {console.log(data);}) // Réponse JSON du serveur
        .catch(error => {console.error(error);});
    UpdateProps(Url,fileName)
    setModalDisplay({showModal:false,imgKey:''});
}

    //Chargement & uploading d'images 1) et 2)
    // 1)Au chargement
//   function handleImagesChange(e){
//     const file= e.target.files[0]; // Récupérer le fichier sélectionné
//     setImages(file)
//     setImgName('ndourFichier')
//     console.log(file.name)
//     }
    // 2)Uploading de l'image
    // function onClick() {
    //     const formData = new FormData();
    //     console.log(images)
    //     formData.append('images', images); 
    //     fetch('/uploadimage/'+imgName, {
    //         method: 'POST',
    //         body: formData,
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //         console.log(data); // Réponse JSON du serveur
    //         })
    //         .catch(error => {
    //         console.error(error);
    //         });
    // }

  return (
    <div id="divGal" style={{margin:"0px",padding:".5%",position:"relative",border:"0px"}}>
        <Link onClick={handleModalShow} style={{backgroundColor:"rgba(255,255,255,.4)",margin:"20px",padding:"5px",boxShadow:"2px 2px 4px white,-2px -2px 4px white",position:"absolute"}}><i class="far fa-edit" style={{color:"rgba(200,0,0,.8)"}}></i></Link>
        <img src={props.src} alt="image_de_la_galerie" style={{margin:"0",padding:"1%",width:"94%",height:"96%",border:"none"}} accept="image/*" />
        <ReactModal
          isOpen={modalDisplay.showModal}
          style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    },content: {
                  position: 'absolute',
                  top: '15vh',
                //   right: '8vw',
                  bottom: '40vh',
                  border: '1px solid #ccc',
                  background: 'white',
                  width:'80vw',
                  maxWidth:'300px',
                  height:'100vw',
                  maxHeight:'fit-content',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '2vw',
                  paddingTop:"0px",
                }}}
                overlayClassName="addImgOverlayClass"
                className="addImgContentClass"

          >
            <div style={{padding:'10px 0px', display:'flex',flexDirection:'column',alignItems:'center'}}>
                <span style={{width:'90%',textAlign:'right',paddind:'0px',paddingBottom:'15px',margin:'5px',borderBottom:'.5px solid brown'}}><i class="fas fa-xmark" style={{color:"rgba(200,0,0,.6)"}} onClick={()=>setModalDisplay({showModal:false})}></i></span>
                <p style={{padding:'0px',color:'rgba(0,0,0,.5)',margin:'0px',marginBottom:'15px',textAlign:'center',width:'fit-content',fontSize:'10px'}}>Changer l'image {props.params.lien}</p>
                <img src={src} id='inputChangeImg' style={{width:'55vw',maxWidth:"250px",maxHeight:'250px',height:"55vw",margin:'5px',padding:'0px'}} alt='imageAChanger' accept="image/*"/>
                {/* <img src={src} id='inputChangeImg' style={{width:'55vw',maxWidth:"250px",maxHeight:'250px',height:"55vw",margin:'5px',padding:'0px'}} alt='imageAChanger' accept="image/*"/> */}
                <input  style={{marginBottom:'20px'}} type='file' name='images' accept='image/*' onChange={handleInputChange}/>
                {/* <input  style={{marginBottom:'20px'}} type='file' name='images' accept='image/*' onChange={(e)=>handleInputChange(e)}/> */}
                <button style={{width:'80%',border:'.5px solid brown',borderRadius:'5px',height:'30px',color:'white',fontSize:'18px',fontWeight:'bold',backgroundColor:'rgba(200,0,0,.6)',BorderRadius:'90px'}} onClick={handleModalClick}>Terminer</button>
            </div>
          </ReactModal>
    </div>
  )
}



// Extraction de la donnée "membre" dont on a besoin: equivalent de useSelector de @redux/toolkit

// const mapStateToProps = (state) => {
//     return {
//       loggedInUser: state.loggedInUser,
//     };
//   };
// const ConnectedGalerie=connect(mapStateToProps)(Galerie)
// export const ConnectedFieldsetCompte = connect(mapStateToProps)(FieldsetCompte);
// export default connect(mapStateToProps)(Session)

export default Cession